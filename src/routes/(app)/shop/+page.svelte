<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
	import TodoList from '../../../lib/components/TodoList.svelte'
	import Spaces from '../../../lib/components/Spaces.svelte'
    import Banner from '$lib/img/coming_soon.png'
    import type { PageData, Task } from '../../../routes/$types';
	import {fly} from 'svelte/transition'
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

        } else {
            console.error('Error fetching user data:', error);
        }

        const { data : k, error: e} = await supabaseClient
            .from('user_data') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', data.user.id) // Use the user.id to fetch data for the active user
			.single()
        if (!error) {
            userData = k || {}; // Store the fetched user data into the 'user' variable
        } else {
            console.error('Error fetching user data:', e);
        }
    });

    async function updateUser(){
        const { data: updatedData, error } = await supabaseClient
        .from('user_data')
        .update({
          books: userData.books
        })
        .eq('id', data.user.id);

      if (!error) {
        console.log('Space updated successfully:', updatedData);
      } else {
        console.error('Error updating user', error);
      }
    }

</script>


<div id = 'app'>


    {#await user}

    <h1> Loading.. </h1>

    {:then}

	<section in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}>

		<h1 class = 'page_title'> Shop </h1>

        <div id = 'banner' style='background-image: url({Banner})'></div>

		<Spaces {data} page = {true} shop = {true}
        on:addBook={(e) => {
            if (!userData.books.includes(e.detail)) {
                userData.books.push(e.detail)
            }
            updateUser()
        }}
        on:removeBook={(e) => {
            let index = userData.books.indexOf(e.detail)
            if (index != -1) {
                userData.books.splice(index, 1)
            }
            updateUser()
        }}
        />

	</section>

    {/await}

</div>



<style>

    #banner{
        height: 300px;
        width: calc(100vw - 300px);
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
    }

	#page_title{
        font-family: 'Newsreader', sans-serif;
		color: black;
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

    @media screen and (max-width: 800px){
        #banner{
            height: 30vw;
            width: 85vw !important;
            background-size: cover;
        }
    }

</style>