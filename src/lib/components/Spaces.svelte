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



    async function newSpace() {
      const { data: d, error } = await supabaseClient
        .from('spaces')
        .upsert([
          {
            id: crypto.randomUUID(),
            title: '',
            user_id: user.id,
          },
        ])
        .select()

      // Update the notes store with the newly added note
      if (!error) {

        spaces.update((prevSpaces) => [...prevSpaces, d[0]]);
        window.location.href = `./dashboard/space/${d[0].id}`

      } else {
        console.error('Error inserting the new space:', error);
      }
    }

</script>


<style>

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 130px 30px;
        justify-content: flex-start;
        align-items: center;
        padding-top: 30px;
        padding-bottom: 100px !important;
    }

    #add_space{
      border: 2px solid black;
      width: 300px;
      height: 500px;
      border-radius: 15px;
      text-align: center;

      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      transition: 0.2s ease;
      cursor: pointer;
      margin-top: 40px;
    }

    #add_space:hover{
      background: rgba(0,0,0,0.05);
    }


</style>


<div id='spaces'>
    {#each $spaces as space}
      <Space {space} page = {page} />
    {/each}
    <div on:click={newSpace} id = 'add_space'>
      <h2> + </h2>
      <h1> Add Scrollable </h1>
    </div>
  </div>