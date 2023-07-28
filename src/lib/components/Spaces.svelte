
<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Space from './Space.svelte'

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
      console.log($spaces)
    });
</script>


<style>

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }


</style>


<div id='spaces'>
    {#each $spaces as space}
      <Space {space} />
    {/each}
  </div>