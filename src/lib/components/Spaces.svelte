<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';

    import type { PageData, Task } from '../../routes/$types';
    export let data: PageData;
    $: ({ user } = data);

    // Create a Svelte store to hold the spaces data
    let spaces = writable([]);

    onMount(async () => {
      // Fetch spaces data from the Supabase "spaces" table when the component is mounted
      const { data: fetchedSpaces, error } = await supabaseClient
                                            .from('spaces')
                                            .select('*')
                                            .eq('user_id', user.id)
                                            .select()

      if (error) {
        console.error('Error fetching spaces:', error);
        return;
      }

      if (fetchedSpaces) {
        // Update the spaces store with the fetched data
        spaces.set(fetchedSpaces);
      }

      console.log(user.id)
      console.log($spaces)
    });
  </script>

<style>

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .space{
        height: 300px;
        width: 300px;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        color: black;
        transition: 0.2s ease;
    }

    .space:hover{
        transform: scale(1.03);
    }

    .space:hover .space_icon{
        transform: scale(1.01) translateY(-5px);
    }

    a:hover{
        text-decoration: none;
    }

    .space_icon{
        height: 100px;
        border-radius: 10px;
        box-shadow: 0px 15px 40px rgba(0,0,0,0.1);
        transition: 0.2s ease;
    }

    .space_title{
        font-size: 20px;
        font-weight: 600;
        margin: 0;
        margin-top: 20px;
    }

    .space_subtitle{
        font-size: 14px;
        font-weight: 300;
        margin: 0;
    }


</style>


{JSON.stringify(spaces)}


<div id = 'spaces'>


    {#each $spaces as space}

        <a href = 'dashboard/space/{space.id}'>
            <div class = 'space' style='background-color: {space.color}'>
                <img class = 'space_icon' src = {space.icon} alt = 'icon'>
                <div class = 'space_expo'>
                    <h1 class = 'space_title'> {space.title} </h1>
                    <h2 class = 'space_subtitle'> {space.subtitle} </h2>
                </div>
            </div>
        </a>

    {/each}
</div>
