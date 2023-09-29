<script lang="ts">
	import { AppBar, Divider, menu, LightSwitch } from '@brainandbones/skeleton';
	import { SITE_NAME } from '$lib/utils/siteConfig';
	import { page } from '$app/stores';
	import QuickLinks from '../private/QuickLinks.svelte';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import logo from '$lib/img/scrollable.svg';
	import X from '$lib/img/arachne.svg'
	import Arrow from '$lib/img/arrow.svg'


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

		<div id = 'mast'>
			<a href="/">
				<img id = 'logo' src = {X} alt = 'Scrollable Logo'>
			</a>
		</div>


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
			<!--
			<a class="button" href="/home">
				<h2>
					Sign Up
				</h2>

			</a>
			-->

			<a class="button" href="/home">
				<button>
					<h1> Launch </h1>

					<svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M33 12.5L53.6464 33.1464C53.8417 33.3417 53.8417 33.6583 53.6464 33.8536L33 54.5" stroke="white" stroke-width="8"/>
						<path d="M53 33H9" stroke="white" stroke-width="8"/>
					</svg>

				</button>
			</a>
		</div>


		{/if}



</div>


<style lang="scss">

	#mast{
		border-radius: 50px;
		padding: 5px;
	}

	#buttons{
		display: flex;
		align-items: center;
		gap: 10px;
		border-radius: 50px;
		//background: #FF004D;
		padding: 5px;

		h2{
			font-size: 14px;
			font-weight: 600;
			letter-spacing: -0.2px;
			color: white;
			padding: 10px 15px;
			transition: 0.2s ease;
			border-radius: 50px;

			&:hover{
				background: rgba(white, 0.2);
			}
		}
	}

	#navbar{
		height: 54px;
		top: 5px;
		left: 5px;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 5px;
		color: black;
		width: calc(100vw - 10px);
		background: #ff004d;
		border-radius: 8px;
		//background: white;
		z-index: 6 !important;
		box-shadow: 0px 0px 50px rgba(black, 0.1);
	}

	#logo{
		height: 42px;
		//background: white;
		padding: 10px 5px;
		border-radius: 8px;
		filter: brightness(1000%);
		//box-shadow: 0 20px 50px rgba(black, 0.2);
	}

	button{
		background: white;
		color: #FF004D;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 6px 12px;
		border-radius: 5px;
		font-size: 10px !important;
		font-weight: 700;
		letter-spacing: -0.2px;
		box-shadow: none;
		transition: 0.2s ease;
		box-shadow: 0 20px 50px rgba(black, 0.2);

		h1{
			font-size: 13px !important;
			letter-spacing: -0.2px;
			font-weight: 700;
		}

		&:hover{
			gap: 12px;
			background: white !important;
		}
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

	svg{
		height: 14px;
		width: 14px;
		path{
			stroke: #FF004D;
		}
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