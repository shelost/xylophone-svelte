<script lang="ts">
    import type { PageData } from './$types';
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';

    export let data: PageData;
    let { profile } = data;
    let editMode = false;
    let imageFile: File;

    async function updateProfile() {
        try {
            const { error } = await supabaseClient
                .from('users')
                .update({
                    full_name: profile.full_name,
                    username: profile.username
                })
                .eq('id', profile.id);

            if (imageFile) {
                const filePath = `profiles/${profile.id}/${imageFile.name}`;
                let { error: uploadError } = await supabaseClient.storage
                    .from('images')
                    .upload(filePath, imageFile);

                if (!uploadError) {
                    const { error: updateImageError } = await supabaseClient
                        .from('users')
                        .update({ pfp: filePath })
                        .eq('id', profile.id);

                    if (updateImageError) {
                        console.error('Error updating image path in profile:', updateImageError);
                    }
                } else {
                    console.error('Error uploading image:', uploadError);
                }
            }

            if (!error) {
                console.log('Profile updated successfully!');
            } else {
                console.error('Error updating profile:', error);
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
    <h1 id='title'>Profile</h1>

    {#if editMode}
        <form on:submit|preventDefault="{updateProfile}" class="flex flex-col gap-2">
            <!-- Profile Picture Upload -->
            <div class="field">
                <label for="profile_picture" class="label">Profile Picture</label>
                <input
                    type="file"
                    id="profile_picture"
                    accept="image/*"
                    bind:files="{imageFile}"
                />
            </div>

            <!-- Full Name field -->
            <div class="field">
                <label for="full_name" class="label">Full Name</label>
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
                    required
                />
            </div>

            <!-- Save button -->
            <div class="mx-auto">
                <button type="submit" class="btn btn-filled-primary" on:click={() => editMode = false}>Save</button>
            </div>
        </form>
    {:else}
        <img class="image-preview" src={profile.pfp} alt="Profile Picture"/>
        <p>{profile.full_name}</p>
        <p>@{profile.username}</p>
        <button on:click={() => editMode = true}>Edit Profile</button>
    {/if}
</section>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');

section {
    padding: 30px;
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
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
}

</style>
