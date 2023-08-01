<!-- +layout.svelte -->
<script>

	import '../app.css';
	import { loader } from '$lib/utils/loader';
	import { AppShell } from '@brainandbones/skeleton';
	import NavBar from '$lib/components/common/NavBar.svelte';

	// ... other imports ...

	// Import the newly created Loader component
	//import Loader from '$lib/components/Loader.svelte';
  </script>


<svelte:head>

  <link rel='icon' type='image/png' href='scrollable.png' />
</svelte:head>


<div class="h-full overflow-hidden" use:loader = {loader}>
	<!-- Use the Loader component here -->
	<AppShell>
		<!-- Header -->
		<svelte:fragment slot="pageHeader"><NavBar/></svelte:fragment>
		<!-- Page Content Slot -->
		<slot />
	</AppShell>
</div>
