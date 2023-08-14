<script lang="ts">
    import { supabaseClient } from '$lib/db';
	import { scale } from "svelte/transition";
    import { createEventDispatcher, onMount } from 'svelte';
    import type { PageData, Task } from '../../routes/$types';
    //import { loadStripe } from '@stripe/stripe-js'
  import { Elements } from 'svelte-stripe'
  import { env } from '$env/dynamic/public'

    import Stripe from 'stripe';
    export let space;
    export let page = false;
    export let shop = false
    export let text = true
    let user = {}
    let userData = {}
    let added = false
    let stripe = null


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

    async function handlePayment() {

        console.log('yo')
        console.log('hello')
        const {token, error} = await stripe.createToken(card);

        if(error) {
            console.error(error);
            return;
        }

        // Now you'd send this token to your server to handle the actual charge.
        // For simplicity, we're just logging it. In a real-world scenario, you'd make an API call.
        console.log(token);
    }

    // Fetch the user data from 'profiles' onMount
    onMount(

    async () => {
        // Fetch the user_data from the database for the logged-in user's ID


      //  stripe = await loadStripe('pk_live_51N5gB1EMsqVSwv70Khc3qDJ1AGzEuEnpmWRtQ0CF10L3ia4Vjw9njVvvMrEViJvaR20IXUuRAS3qTE0yLPbxDRem00MBNvL33e')



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
                <div class='space' ></div>
            </div>
        </a>

            {#if text}
                <div class = 'expo'>
                    <h1> {space.title} </h1>
                    <h2> {space.subtitle} </h2>
                    <div id="card-element"></div>


                    {#if stripe}
                    <Elements {stripe}>
                    <!-- this is where your Stripe components go -->
                    </Elements>
                    {/if}



                    <button id = 'pay' on:click={handlePayment} on:click = {()=> {console.log('yo')}}> Pay ${space.price}</button>


                    <!--
                    {#if added}
                    <button id = 'remove' class = 'corner' on:click={removeBook}> Remove </button>
                {:else}
                    <button id = 'add' class = 'corner' on:click={addBook}> + Add  </button>
                {/if}
                -->

                </div>
            {/if}



        </section>


    {:else}

    <section>

        <a class = 'space_a' href='p/space/{space.slug}'>
            <div class = 'container'>
                <div class = 'background' style='background-image: url({space.icon})'></div>
                <div class='space' ></div>
            </div>
        </a>

            {#if text}
                <div class = 'expo'>
                    <h1> {space.title} </h1>
                    <h2> {space.subtitle} </h2>
                </div>
            {/if}
        </section>


    {/if}

{:else}
    <section>
    <a class = 'space_a' href='home/space/{space.slug}'>
        <div class = 'container'>
            <div class = 'background' style='background-image: url({space.icon})'></div>
            <div class='space' >
            </div>
        </div>
    </a>

        {#if text}
            <div class = 'expo'>
                <h1> {space.title} </h1>
                <h2> {space.subtitle} </h2>
            </div>
        {/if}

    <button on:click={triggerDelete}> Delete </button>
    </section>
{/if}


<style lang="scss">



section{
    display: flex;
    flex-direction: column !important;
    align-items: flex-start;
    justify-content: flex-start !important;
    color: black;
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
    height: fit-content;
    width: 160px;

    h1{
        font-size: 16px;
        line-height: 120%;
        font-weight: 600;
        margin-bottom: 5px;
    }

    h2{
        font-size: 14px;
        letter-spacing: -0.2px;
        font-weight: 400;
        color: rgba(0,0,0,0.3);
    }

    h3{
        color: #FF003D;
        font-size: 14px;
        font-weight: 500;
        margin: 5px 0;
    }

    #pay{
        width: 100%;
        &:hover{
            opacity: 0.7;
        }
    }
}


    .background{
        display: block;
        width: 160px;
        height: 160px;
        background-size: cover;
        background-repeat: no-repeat !important;
        background-position: center center;
        transition: 0.2s ease;
        border: 2px solid rgba(255,255,255, 0.05);
        border-radius: 15px;
    }


    .container{
        width: 160px;
        height: 160px;

        position: relative;
        transition: 0.2s ease;
    }

    .corner{
        border-radius: 50px;
        box-shadow: none;
        &#add{
            background: #0074ff;
            &:hover{
                background: #0040ff;
            }
        }
        &#remove{
            background: red;
            &:hover{
                background: #d40000;
            }
        }
    }

    .space{
        position: absolute;
        top: 0;
        left: 0;
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

        section{
            flex-direction: row;
            gap: 20px;
            align-items: flex-start;
        }

        .expo{
            margin-top: 5px;
        }

        .background{
            width: 40vw;
            height: 40vw;
        }


        .space{
            width: 40vw;
            height: 40vw;
        }


        .container{
            width: 40vw;
            height: 40vw;
        }

    }
 </style>