<script lang="ts">
    import type { PageData } from './$types';
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';

    export let data: PageData;
    let { profile } = data;
    let editMode = false;
    let imageFile: File;

    let loading = false; // Loading indicator for the Save button
    let usernameError: string | null = null;

    async function checkUsername() {
        if (profile.username) {
            const { data, error } = await supabaseClient
                .from('users')
                .select('username')
                .eq('username', profile.username)
                .neq('id', profile.id); // Don't select the current user's username

            if (error) {
                usernameError = "Error checking username.";
            } else if (data && data.length > 0) {
                usernameError = "This username is already taken.";
            } else {
                usernameError = null;
            }
        }
    }

    function handleProfilePictureChange(event) {
        imageFile = event.target.files[0];
    }


   // Assuming supabaseClient is initialized somewhere above
async function fileExistsInSupabase(filePath) {
    const { error } = await supabaseClient.storage.from('images').download(filePath);
    return !error;
}

async function getImageUrlFromSupabase(filePath) {

    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
}

async function uploadToSupabase(file) {
    const filePath = `profiles/${profile.id}/${file.name}`;

    if (await fileExistsInSupabase(filePath)) {
        console.log('File already exists in Supabase. Skipping upload.');
        return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
    }

    const { error } = await supabaseClient.storage.from('images').upload(filePath, file);
    if (error) {
        console.error('Error uploading file:', error);
        return null;
    }
    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
}

async function updateProfile() {
    try {
        let filePath = null;
        if (imageFile) {
            filePath = await uploadToSupabase(imageFile);
            if (!filePath) {
                console.error('Error processing image file.');
                return;
            }
        }

        console.log(filePath)
        console.log(profile)

        const { error: profileUpdateError } = await supabaseClient
            .from('users')
            .update({ pfp: filePath || profile.pfp, full_name: profile.full_name, username: profile.username })
            .eq('id', profile.id);

        if (profileUpdateError) {
            console.error('Error updating profile:', profileUpdateError);
        } else {
            console.log('Profile updated successfully!');
        }

    } catch (error) {
        console.error('Error updating profile:', error.message);
    }
}


    onMount(() => {
        // Fetch user profile data or other operations...
    });
</script>

<section>

    {#if editMode}
        <form on:submit|preventDefault="{updateProfile}" class="flex flex-col gap-2">
            <!-- Profile Picture Upload -->
            <div class="field">
                <label for="profile_picture" class="label">Profile Picture</label>
                <input
                    type="file"
                    id="profile_picture"
                    accept="image/*"
                    on:change="{updateProfile}"
                    on:change="{handleProfilePictureChange}"
                />
                {#if profile.pfp}
                    <img src={profile.pfp} alt="Preview" class="image-preview" />
                {/if}
            </div>


            <!-- Full name field -->
            <div class="field">

                <label for="full_name" class="label"> Full Name </label>
                <input
                    id="full_name"
                    name="full_name"
                    class="input"
                    type="text"
                    bind:value="{profile.full_name}"
                    required
                />
            </div>


            <!-- Username field -->
            <div class="field">

                <label for="username" class="label">Username</label>
                <input
                    id="username"
                    name="username"
                    class="input"
                    type="text"
                    bind:value="{profile.username}"
                    on:input="{checkUsername}"
                    required
                />
                {#if usernameError}
                    <p class="error-text">{usernameError}</p> <!-- Display any username errors -->
                {/if}
            </div>



            <!-- Save button -->
            <div class="mx-auto">
                <button type="submit" class="btn btn-filled-primary" on:click={() => {editMode = false; updateProfile()}}  disabled={loading || usernameError}>Save</button>
            </div>
        </form>
    {:else}
        <div id = 'mast'>

            <img class="image-preview" src={profile.pfp} alt="Profile Picture"/>
            <h2>{profile.full_name}</h2>
            <p>@{profile.username}</p>
            <button on:click={() => editMode = true}>Edit Profile</button>
        </div>
    {/if}
</section>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');

section {
    padding: 30px;
    margin-left: 240px;
}

#mast{

    h2{
        font-size: 20px;
        font-weight: 700;
        margin-top: 10px;
    }

    p{
        font-size: 14px;
        letter-spacing: -0.2px;
        color: rgba(black, 0.4);
        margin-bottom: 10px;
    }
}

#title {
    font-family: 'Newsreader', sans-serif;
    letter-spacing: -0.7px;
    font-size: 32px;
    font-weight: 600;
}

form {
    margin-top: 40px;
}

.field {
    margin: 10px 0;
}

input {
    background: rgba(black, 0.05) !important;
}

button {
    background: black;
}

.image-preview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
}

.error-text {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
}

// Optional: Style for the disabled Save button
button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

</style>
