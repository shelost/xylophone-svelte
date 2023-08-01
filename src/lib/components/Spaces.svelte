
<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Space from './Space.svelte'

    import type { PageData, Task } from '../../routes/$types';
    export let data: PageData;
    $: ({ user } = data);


    export let page = false

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
      console.log($spaces)
    });
</script>


<style>

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 20px 200px;
    }

    #add_space{
      border: 1px solid black;
      width: 300px;
      border-radius: 15px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease;
      cursor: pointer;
    }

    #add_space:hover{
      background: rgba(0,0,0,0.05);
    }


</style>


<div id='spaces'>
    {#each $spaces as space}
      <Space {space} page = {page} />
    {/each}
    <div id = 'add_space'>
      <h2> + </h2>
      <h1> Add Project </h1>
    </div>
  </div>