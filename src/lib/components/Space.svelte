<script lang="ts">
    import { supabaseClient } from '$lib/db';
	import { scale } from "svelte/transition";
    import { createEventDispatcher, onMount } from 'svelte';
    import type { PageData, Task } from '../../routes/$types';
    export let space;
    export let page = false;
    export let shop = false
    export let data : PageData
    let user = {}
    let userData = {}
    let added = false

    const dispatch = createEventDispatcher();

    function triggerDelete() {
        dispatch('deleteSpace', space.id); // emit the delete event with the space id.

    }

    function addBook() {
        if (!userData.books.includes(space.id)) {
                userData.books.push(space.id)
            }
        dispatch('addBook', space.id); // emit the delete event with the space id.
        updateUser()
        fetchUser()
        console.log(added)
        added = true
    }

    function removeBook() {
        let index = userData.books.indexOf(space.id)
            if (index != -1) {
                userData.books.splice(index, 1)
            }
        dispatch('removeBook', space.id); // emit the delete event with the space id.
        updateUser()
        fetchUser()
        console.log(added)
        added = false
    }

    async function fetchUser(){
        const { data : k, error: e} = await supabaseClient
            .from('user_data') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', space.user_id) // Use the user.id to fetch data for the active user
			.single()
        if (!e) {
            userData = k || {}; // Store the fetched user data into the 'user' variable
            console.log(userData.books)
        } else {
            console.error('Error fetching user data:', e);
        }
    }

    async function updateUser(){

        console.log(data)
        const { data: updatedData, error } = await supabaseClient
        .from('user_data')
        .update({
          books: userData.books
        })
        .eq('id', space.user_id);

      if (!error) {
        console.log(userData.books)
        console.log('Space updated successfully:', updatedData);
      } else {
        console.error('Error updating user', error);
      }
    }


    // Fetch the user data from 'profiles' onMount
    onMount(async () => {
        // Fetch the user_data from the database for the logged-in user's ID

        console.log(data)
        const { data : d, error} = await supabaseClient
            .from('profiles') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', space.user_id) // Use the user.id to fetch data for the active user
			.single()
        if (!error) {
            user = d || {}; // Store the fetched user data into the 'user' variable

        } else {
            console.error('Error fetching user data:', error);
        }

        const { data : k, error: e} = await supabaseClient
            .from('user_data') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
            .eq('id', space.user_id) // Use the user.id to fetch data for the active user
			.single()
        if (!e) {
            userData = k || {}; // Store the fetched user data into the 'user' variable
        } else {
            console.error('Error fetching user data:', e);
        }

        $: if (userData.books.includes(space.id)){
            added = true
        }else{
            added = false
        }

    });

</script>



{#if page}

{#if shop}

<section>
<a class = 'space_a' href='p/space/{space.slug}'>
    <div class = 'container'>
        <div class = 'background' style='background-image: url({space.icon})'></div>
        <div class='space' >
        </div>

        <div class = 'expo'>
            <h1> {space.title} </h1>
            <h2> {space.subtitle} </h2>
        </div>
    </div>
</a>

{#if added}
<button id = 'remove' on:click={removeBook}> Remove </button>
{:else}
<button id = 'add' on:click={addBook}> Add </button>
{/if}
</section>


{:else}

<a class = 'space_a' href='p/space/{space.slug}'>
    <div class = 'container'>
        <div class = 'background' style='background-image: url({space.icon})'></div>
        <div class='space' >
        </div>

        <div class = 'expo'>
            <h1> {space.title} </h1>
            <h2> {space.subtitle} </h2>
        </div>
    </div>
</a>

{/if}

{:else}
<section>
<a class = 'space_a' href='home/space/{space.slug}'>
    <div class = 'container'>
        <div class = 'background' style='background-image: url({space.icon})'></div>
        <div class='space' >

        </div>
        <div class = 'expo'>
            <h1> {space.title} </h1>
            <h2> {space.subtitle} </h2>
        </div>
    </div>
</a>
<button on:click={triggerDelete}> Delete </button>
</section>
{/if}


<style>


#remove{
    background: red;
}

section{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

button{
    background: black;
    color: white;
    margin-top: 10px;
}


.expo{
    text-align: left;
    margin: 15px 0;
    color: black;
}
    .expo h1{
        font-size: 16px;
        line-height: 120%;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .expo h2{
        font-size: 14px;
        letter-spacing: -0.2px;
        font-weight: 400;
        color: rgba(0,0,0,0.3);
    }

    .background{
        display: block;
        width: 160px;
        height: 160px;
        background-size: cover;
        background-position: center center;
        transition: 0.2s ease;
        box-shadow: 0px 20px 50px rgba(0,0,0, 0.1);
        border-radius: 15px;
        border: 2px solid rgba(255,255,255, 0.05);
    }

    .container{
        width: 160px;
        height: 160px;
        background: white;
        border-radius: 20px;
        position: relative;
        transition: 0.2s ease;
        margin-bottom: 100px;
    }

    .space{
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 10px;
        width: 200px;
        height: 200px;

        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: 0.2s ease;
        text-align: center;
        opacity: 0;

    }

    .space_expo h1{
        font-size: 22px;
        line-height: 120px;
        width: 120px;
        height: 120px;
        text-align: center;
        border-radius: 70px;

        background: rgba(255,255,255,0.2);
        border: 2px solid rgba(255,255,255,0.3);
    }


    a:hover{
        text-decoration: none;
    }

    .space_icon{
        height: 100px;
        border-radius: 10px;
        box-shadow: 0px 15px 40px rgba(0,0,0,0.1);
        background: none;
        transition: 0.2s ease;
    }

    .space_title{
        font-family: 'Manrope', 'Inter', sans-serif;
        font-size: 18px;
        line-height: 110%;
        width: 95%;
        font-weight: 800;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 10px;
        text-align: center;
    }

    .space_subtitle{
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.05px;
        margin: auto;
        color: rgba(255,255,255, 0.8);
    }


    @media screen and (max-width: 800px){

        .background{
            width: 80vw;
            height: 140vw;
        }


        .space{
            width: 80vw;
            height: 140vw;
        }


        .container{
            width: 80vw;
            height: 140vw;
        }

    }
 </style>