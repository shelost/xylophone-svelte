<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Space from './Space.svelte'
    import type { PageData, Task } from '../../routes/$types';
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition'
    export let data: PageData;
    $: ({ user } = data);

    import Banner from '$lib/img/coming_soon.png'

    const dispatch = createEventDispatcher();

    export let page = false
    export let shop = false

    let showDeleteModal = false; // Control whether to show the delete modal
    let spaceToDelete = null;   // Track which space to delete
    let spaceToAdd = null


  async function deleteSpace() {

    const { data, error } = await supabaseClient.from('spaces').delete().eq('id', spaceToDelete).select()
    if (error) {
      console.error('Error deleting space:', error);
      return;
    }

    spaces.update(spaces => spaces.filter(space => space.id !== spaceToDelete));
    showDeleteModal = false;
  }



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
    });

    async function newSpace() {
      const { data: d, error } = await supabaseClient
        .from('spaces')
        .upsert([
          {
            id: crypto.randomUUID(),
            slug: crypto.randomUUID(),
            title: '',
            user_id: user.id,
          },
        ])
        .select()

      // Update the notes store with the newly added note
      if (!error) {

        spaces.update((prevSpaces) => [...prevSpaces, d[0]]);
        window.location.href = `./home/space/${d[0].id}`

      } else {
        console.error('Error inserting the new space:', error);
      }
    }

</script>


<style lang="scss">

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 25px 25px;
        justify-content: flex-start;
        align-items: flex-start !important;
        padding-top: 30px;
        padding-bottom: 100px !important;
    }

    #add_space{
      border: 2px solid rgba(black, 0.4);
      color: black;
      width: 200px;
      height: 200px;
      border-radius: 10px;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease;
      cursor: pointer;
    }

    #add_space:hover{
      background: rgba(0,0,0,0.05);
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border: 1px solid gray;
      border-radius: 5px;
      z-index: 10;
    }


    @media screen and (max-width: 800px){

      #spaces{
        padding: 0;
      }

      .space{
        width: calc(50vw - 50px);
      }

    }

</style>



{#if showDeleteModal}
  <div class="modal">
    <p>Are you sure you want to delete this Scrollable?</p>
    <p>This action cannot be undone.</p>
    <button on:click={deleteSpace}>Delete</button>
    <button on:click={() => showDeleteModal = false}>Never Mind</button>
  </div>
{/if}



<div id='spaces'>
    {#each $spaces as space, index}
    <div class = 'space' in:fly={{duration:500, y: 50, delay: index * 50}}>


    <Space
    {space}
    page={page}
    shop={shop}
    on:deleteSpace={(e) => {
        spaceToDelete = e.detail;
        showDeleteModal = true;
    }}
    on:addBook={(e) => {
      dispatch('addBook', e.detail)
    }}
    on:removeBook={(e) => {
      dispatch('removeBook', e.detail)
    }}
    />
  </div>

    {/each}

    {#if !page}
    <div on:click={newSpace} id = 'add_space'>
      <h2> + </h2>
      <h1> Add Scrollable </h1>
    </div>
    {/if}
  </div>