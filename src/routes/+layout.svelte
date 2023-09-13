<!-- +layout.svelte -->
<script>

	import '../app.css';
	import { loader } from '$lib/utils/loader';
	import { AppShell } from '@brainandbones/skeleton';
	import NavBar from '$lib/components/common/NavBar.svelte';

	import { pages } from '$lib/utils/store';

	import { supabaseClient } from '$lib/db';

	export let data;

	// ... other imports ...

	// Import the newly created Loader component
	//import Loader from '$lib/components/Loader.svelte';

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


  </script>





<div  use:loader = {loader}>
	<!-- Use the Loader component here -->

		<slot />

</div>
