<script lang="ts">
	import { AppBar, Divider, menu, LightSwitch } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';
	import { page } from '$app/stores';
	import QuickLinks from '../private/QuickLinks.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	import { invalidate } from '$app/navigation';


	const handleLogout: SubmitFunction = () => {
		//loading.set(true);
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			//loading.set(false);
		};
	};

</script>


<div id = 'navbar'>
	<!-- Branding -->

		<a href="/">
			<img id = 'logo' src = 'scrollable.svg' alt = 'logo'>
		</a>

	<!-- Middle Section -->

	<div class = 'text-btns'>

		{#if !$page.url.pathname.startsWith('/dashboard')}
			<a href="/">
				<h2 class = 'text-btn'>
					Home
				</h2>
			</a>
			<a href="/pricing">
				<h2 class = 'text-btn'>
					Pricing
				</h2>
			</a>

		{:else}
				<a href="/dashboard">
					<h2 class = 'text-btn'>
						Dashboard
					</h2>
				</a>
				<a href="/dashboard/settings">
					<h2 class = 'text-btn'>
						Settings
					</h2>
				</a>
				<a href="/dashboard/subscriptions">
					<h2 class = 'text-btn'>
						Subscriptions
					</h2>
				</a>

		{/if}
	</div>

	<!-- Button -->
		{#if $page.data.session?.user && $page.url.pathname.startsWith('/dashboard')}
			{#if $page.data.session}
				<form action="/logout" method="post" use:enhance={handleLogout}>
					<button>
						<h1> Log Out</h1>
					</button>
				</form>
			{/if}
		{:else}

			<a class="button" href="/dashboard">
				<button>
					<h1> Log In </h1>
				</button>
			</a>
		{/if}



</div>


<style>

	#navbar{
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
		background: none;
	}

	#logo{
		height: 28px;
	}

	button{
		background: black;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding: 5px 15px;
		border-radius: 5px;
		font-size: 14px;
		box-shadow: 0px 10px 20px rgba(0,0,0,0.2);
		transition: 0.2s ease;
	}

	button:hover{
		background: #202020;
	}

	button h1{
		font-size: 14px;
		margin: 0;
	}

	.text-btns{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	.text-btn{
		color: black;
		text-decoration: none;
	}

</style>