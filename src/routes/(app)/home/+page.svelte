<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
	import TodoList from '../../../lib/components/TodoList.svelte'
	import Spaces from '../../../lib/components/Spaces.svelte'
	import Space from '../../../lib/components/Space.svelte'
    import type { PageData, Task } from '../../routes/$types';
	import {fly} from 'svelte/transition'
    export let data: PageData;
    let user = {}; // Define the 'user' variable to store data about the active user
    let userData = {};
	let spaces = writable([])
	let books = []
	let loading = true

	async function fetchBooks(){
		// Fetch the user_data from the database for the logged-in user's ID
		const { data : k, error: e} = await supabaseClient
            .from('user_data') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', data.user.id) // Use the user.id to fetch data for the active user
			.single()
        if (!e) {
            userData = k || {}; // Store the fetched user data into the 'user' variable
				// Fetch the user_data from the database for the logged-in user's ID
				const { data : r, error: j} = await supabaseClient
					.from('spaces') // Update the table name to 'profiles'
					.select('*') // Fetch all columns for the active user
				if (!e) {
					spaces.set(r)
					//spaces.set($spaces.filter(space => userData.books.includes(space.id)))

					loading = false
				} else {
					console.error('Error fetching user data:', e);
				}
        } else {
            console.error('Error fetching user data:', e);
        }
	}


    async function updateUser(){
        const { data: updatedData, error } = await supabaseClient
        .from('user_data')
        .update({
          books: userData.books
        })
        .eq('id', data.user.id);

      if (!error) {
        console.log('Space updated successfully:', updatedData);

        console.log(userData.books)
      } else {
        console.error('Error updating user', error);
      }
    }


    // Fetch the user data from 'profiles' onMount
    onMount(

		async () => {
        // Fetch the user_data from the database for the logged-in user's ID
        const { data : d, error} = await supabaseClient
            .from('profiles') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', data.user.id) // Use the user.id to fetch data for the active user
			.single()

			console.log(d)
        if (!error) {
            user = d || {}; // Store the fetched user data into the 'user' variable
            console.log(user); // Log the user data for testing
        } else {
            console.error('Error fetching user data:', error);
        }

		fetchBooks()

    });

</script>


<div id = 'app'>
	<section in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}>
		<h1> Home </h1>



{#await $spaces}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}


		<div id = 'top'>

			<!--
			<div id = 'mast'>
				<h2> Today is </h2>
				<h1 id = 'date'> August 23, 2023 </h1>
			</div>
			-->

		</div>
		<div id='spaces'>
			{#each $spaces as space}
			<Space
			{space}
			page={true}
			on:addBook={(e) => {
			}}
			on:removeBook={(e) => {
				let index = userData.books.indexOf(e.detail)
            if (index != -1) {
                userData.books.splice(index, 1)
            }
            updateUser()
			fetchBooks()
			}}/>
			{/each}
		</div>

	{/await}
	</section>
</div>





<style>

	h1{
		color: black;
	}

	#loading{
		background: red;
	}

	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid black;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 30px 30px;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: 30px;
        padding-bottom: 100px !important;
    }

	section{
		margin: 30px 30px;
	}

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

	section h1{
		font-size: 24px;
		font-weight: 600;
		text-align: left;
		margin: 0;
		margin-bottom: 30px;
	}

	:global(#todo){
		width: 300px;
		height: 85vh;
		margin-top: 20px;
		margin-left: 30px;
		overflow-y: scroll;
		overflow-x: hidden;
		border: 4px solid white;
		box-shadow: 0px 20px 80px rgba(0,0,0,0.2);
	}

	:global(#spaces){

	}

</style>