<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
	import TodoList from '../../../lib/components/TodoList.svelte'
    import type { PageData, Task } from '../../routes/$types';
    export let data: PageData;
    let user = {}; // Define the 'user' variable to store data about the active user

    let userData = {};

    // Fetch the user data from 'profiles' onMount
    onMount(async () => {
        // Fetch the user_data from the database for the logged-in user's ID
        const { data : d, error} = await supabaseClient
            .from('profiles') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', data.user.id) // Use the user.id to fetch data for the active user
			.single()

        if (!error) {
            user = d || {}; // Store the fetched user data into the 'user' variable
            console.log(user); // Log the user data for testing
        } else {
            console.error('Error fetching user data:', error);
        }

    });

</script>


<div id = 'app'>

	<div class = 'profile'>
		<h1>{user.full_name} </h1>
		<h2> {user.username} </h2>
	</div>

	<TodoList {data} />




</div>



<style>

	.profile{
		border: 1px solid black;
		text-align: left;
		padding: 15px;
	}

	.profile h1{
		font-size: 16px;
		font-weight: 700;
		margin: 0;
		text-align: left;
	}

	.profile h2{
		font-size: 14px;
		font-weight: 400;
		margin: 0;
		text-align: left;
	}



	:global(#todo){
		width: 300px;
		height: 80vh;
		overflow-y: scroll;
		background: white;
		padding: 20px 10px;
		border-radius: 15px;
	}


</style>