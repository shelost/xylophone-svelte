<!-- +layout.svelte -->
<script>

	import '../app.css';
	import { loader } from '$lib/utils/loader';
	import { AppShell } from '@brainandbones/skeleton';
	import NavBar from '$lib/components/common/NavBar.svelte';
	import icon from '$lib/img/favicon.svg'
	import { onMount } from 'svelte'

	//import { pages } from '$lib/utils/store';

	//import { supabaseClient } from '$lib/db';

	export let data;


	onMount(() => {
		if (window.location.hostname === "arachne.so" && window.location.pathname.startsWith("/app")) {
            window.location.replace(`https://studio.arachne.so${window.location.pathname.replace("/app", "")}`);
        } else if (window.location.hostname === "studio.arachne.so" && !window.location.pathname.startsWith("/app")) {
            window.location.replace(`https://arachne.so/app${window.location.pathname}`);
        }
	})

	// ... other imports ...

	// Import the newly created Loader component
	//import Loader from '$lib/components/Loader.svelte';

	/*
	async function fetchPages(){
			const { data: d, error } = await supabaseClient.from('pages').select('*').eq('user_id', data.session.user.id);

			if (!error) {
				pages.set(d);
				console.log(d)
			} else {
				console.log('Error fetching pages:' + JSON.stringify(error));
			}
	}

	fetchPages()
	*/


  </script>



<div  use:loader = {loader}>

	<slot />

</div>



<svelte:head>
	<title> Arachne | Build Your Perfect Web </title>
	<meta name="description" content="Arachne is a different kind of dev." />
	<link rel ='icon' href='{icon}'>
</svelte:head>



<style>
	::-webkit-scrollbar{
      width: 5px;
      height: 0;
      background: white;
 	}

	::-webkit-scrollbar-thumb{
		background: rgba(black, 1);
	}
</style>