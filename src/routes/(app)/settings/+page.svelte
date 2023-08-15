<script lang="ts">
    import type { PageData } from './$types';
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';

    export let data: PageData;
    let { profile } = data;

    // Function to update user profile data in the database
    async function updateProfile() {
        try {
            const { error } = await supabaseClient
                .from('profiles')
                .update({
                    full_name: profile.full_name,
                    username: profile.username
                })
                .eq('id', profile.id);

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
        // Fetch user profile data or perform any other necessary operations
    });
</script>

<section>

    <h1 id = 'page_title'> Settings </h1>


    <form on:submit|preventDefault="{updateProfile}" class="flex flex-col gap-2">
        <!-- Full Name field -->
        <div class="field">
            <label for="full_name" class="label">Full Name</label>
            <p class="control">
                <input
                    id="full_name"
                    name="full_name"
                    class="input"
                    type="text"
                    bind:value="{profile.full_name}"
                    required
                />
            </p>
        </div>

        <!-- Username field -->
        <div class="field">
            <label for="username" class="label">Username</label>
            <p class="control">
                <input
                    id="username"
                    name="username"
                    class="input"
                    type="text"
                    bind:value="{profile.username}"
                    required
                />
            </p>
        </div>

        <!-- Save button -->
        <div class="mx-auto">
            <button type="submit" class="btn btn-filled-primary">Save</button>
        </div>
    </form>
</section>


<style lang="scss">

    section{
        padding: 50px;
    }


	section h1{
        font-family: 'Newsreader', sans-serif;
		color: black;
        font-size: 24px !important;
		font-weight: 600 !important;
		text-align: left;
		margin: 0;
		margin-bottom: 30px;
	}



    .field{
        margin: 10px 0;
    }

    input{
        background: rgba(black, 0.05) !important;
    }

    button{
        background: black;
    }


</style>
