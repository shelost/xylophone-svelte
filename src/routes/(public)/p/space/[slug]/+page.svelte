<script>
  import SpacePage from '$lib/components/SpacePage.svelte'
  import { supabaseClient } from '$lib/db'
  export let data



  if (!data){

  }
</script>
<SpacePage {data} page = {true}/>