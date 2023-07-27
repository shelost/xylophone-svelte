<!-- +layout.svelte -->
<script>
	import '@brainandbones/skeleton/themes/theme-crimson.css';
	import '@brainandbones/skeleton/styles/all.css';
	import '../app.postcss';
	import { loader } from '$lib/utils/loader';
	import { AppShell } from '@brainandbones/skeleton';
	import NavBar from '$lib/components/common/NavBar.svelte';

	// ... other imports ...

	// Import the newly created Loader component
	//import Loader from '$lib/components/Loader.svelte';
  </script>

  <div class="h-full overflow-hidden" use:loader = {loader}>
	<!-- Use the Loader component here -->

	<AppShell>
	  <!-- Header -->
	  <svelte:fragment slot="pageHeader"><NavBar /></svelte:fragment>
	  <!-- Page Content Slot -->
	  <div class="max-w-7xl mx-auto mx-auto p-4 md:p-12 space-y-8 md:space-y-12">
		<slot />
	  </div>
	</AppShell>
  </div>
