<script lang="ts">
	import { AppBar, Divider, menu, LightSwitch } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';
	import { page } from '$app/stores';
	import QuickLinks from '../private/QuickLinks.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import logo from '$lib/img/scrollable.svg';
	import X from '$lib/img/arachne.svg'


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
			<img id = 'logo' src = {X} alt = 'Scrollable Logo'>
		</a>

	<!-- Middle Section -->

	<div class = 'text-btns'>

		{#if !$page.url.pathname.startsWith('/home')}

		<!--
			<a href="/">
				<h2 class = 'text-btn'>
					Home
				</h2>
			</a>
			<a href="/about">
				<h2 class = 'text-btn'>
					About
				</h2>
			</a>
			<a href="/contact">
				<h2 class = 'text-btn'>
					Contact
				</h2>
			</a>
			-->


		{:else}
				<a href="/home">
					<h2 class = 'text-btn'>
						Home
					</h2>
				</a>
				<a href="/settings">
					<h2 class = 'text-btn'>
						Settings
					</h2>
				</a>
				<a href="/subscriptions">
					<h2 class = 'text-btn'>
						Subscriptions
					</h2>
				</a>

		{/if}
	</div>

	<!-- Button -->
		{#if $page.data.session?.user && $page.url.pathname.startsWith('/home')}
			{#if $page.data.session}
				<form action="/logout" method="post" use:enhance={handleLogout}>
					<button>
						<h1> Log Out</h1>
					</button>
				</form>
			{/if}
		{:else}

		<div id = 'buttons'>
			<a class="button" href="/home">
				<h2>
					Sign Up
				</h2>

			</a>

			<a class="button" href="/home">
				<button>
					<h1> Log In </h1>
				</button>
			</a>
		</div>


		{/if}



</div>


<style lang="scss">

	#buttons{
		display: flex;
		align-items: center;
		gap: 20px;

		h2{
			font-size: 14px;
			font-weight: 600;
			letter-spacing: -0.2px;
			color: white;
		}
	}

	#navbar{
		height: 64px;
		top: 0px;
		left: 0px;
		/*position: fixed;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 20px;
		color: black;
		width: 100vw;
		backdrop-filter: blur(15px);
		z-index: 6 !important;
	}

	#logo{
		height: 26px;
		filter: brightness(1000%);
	}

	button{
		background: white;
		color: #FF004D;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding: 10px 20px;
		border-radius: 30px;
		font-size: 14px;
		font-weight: 600;
		box-shadow: none;
		transition: 0.2s ease;
	}

	button:hover{
		background: #ea0008;
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
		font-family: 'Inter', sans-serif;
		font-weight: 500;
		letter-spacing: -0.5px;
		font-size: 15px;
	}

	@media screen and (max-width: 800px){
		.text-btn{
			display: none;
		}
	}

</style>