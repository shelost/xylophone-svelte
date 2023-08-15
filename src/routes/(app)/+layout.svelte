<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import IconHome from '$lib/img/icon_home.svg'
	import IconCreate from '$lib/img/icon_create.svg'
	import IconFeed from '$lib/img/icon_feed.svg'
	import IconShop from '$lib/img/icon_shop.svg'
	import { page } from '$app/stores';
	export let data

	let path;

	$:  path = $page.route.id.substring(6)

</script>



{#key data.pathname}

<section>

<div id = 'navbar'>

	<div id = 'top'>

		<a href = '/home'>
			<img src = '{Scrollable}' alt = 'Scrollable Logo' id = 'logo'>
		</a>

		<a href = '/home'>
			<div class = 'text-btn' id = 'home' class:active={path === '/home'}>
				<div class = 'icon' style = 'background-image: url({IconHome}'>
				</div>
				<h2> Home </h2>
			</div>
		</a>

		<a href = '/shop' id = 'shop' >
			<div class = 'text-btn' class:active={path === '/shop'}>
				<div class = 'icon' style = 'background-image: url({IconShop})'>
				</div>
				<h2> Shop </h2>
			</div>
		</a>

		<a href = '/create' id = 'create' >
			<div class = 'text-btn' class:active={path === '/create'}>
				<div class = 'icon' style = 'background-image: url({IconCreate})'>
				</div>
				<h2> Create </h2>
			</div>
		</a>

		<!--
		<a href = '/subscriptions' id = 'create' >
			<div class = 'text-btn' class:active={path === '/subscriptions'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Payment </h2>
			</div>
		</a>
		-->


		<!--
		<h1 class = 'title'> Reading </h1>

		<div id = 'books'>

			<a href = '/p/space/meditations'>
				<div class = 'text-btn'>
					<div class = 'icon'>
					</div>
					<h2> Meditations </h2>
				</div>
			</a>
		</div>
		-->

	</div>


	<div id = 'bottom'>
		<a href = '/settings' id = 'create' >
			<div class = 'text-btn' class:active={path === '/settings'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Settings </h2>
			</div>
		</a>

	</div>
  </div>

	<div id = 'app'
	  in:fade={{ easing: cubicOut, duration: 300, delay: 400 }}
	  out:fade={{ easing: cubicIn, duration: 300 }}
	>
	  <slot />
	</div>

</section>

{/key}



<style lang="scss">

	#logo{
		width: 100px;
		margin: 20px 10px;
	}

	.title{
		font-weight: 600;
		margin: 15px;
	}

	.text-btn{
		margin: 5px;
		padding: 10px 15px;
		border-radius: 5px;
		font-size: 14px;
		letter-spacing: -0.3px;
		transition: 0.2s ease;
		display: flex;
		align-items: center;
		gap: 12px;

		&.active{
			background: white;
		}
	}

	.text-btn:hover{
		background: rgba(255,255,255,0.7);
	}

	.icon{
		width: 24px;
		height: 24px;
		background-size: cover;
	}


#navbar{
	position: fixed !important;
	top: 0;
	left: 0;
	width: 240px;
	height: 100vh;
	z-index: 5 !important;
	background: #f0f0f0;
}


#app{
	position: fixed;
	top: 0;
	left: 240px;
	width: calc(100vw - 240px) !important;
	height: 100vh;
	overflow-y: scroll;
	background: white;
}


@media screen and (max-width: 800px){

	/*
	#navbar{
		position: fixed;
		bottom: 0px !important;
		top: none;
		left: 0;
		width: 100vw;
		height: 60px;
		display: flex;
		flex-direction: row !important;
		background: none;
	}
	*/

	#navbar{
		display: flex !important;
		flex-wrap: nowrap;
		flex-direction: row !important;
		justify-content: center;
		position: fixed !important;
		padding: 0 !important;
		top: calc(100vh - 80px);
		width: 100vw !important;
		height: 80px !important;
		background: #f0f0f0;
	}

	#top{
		display: flex;
		gap: 10px;
	}
	#bottom{
		display: flex;
		margin-left: 0px;
	}



	#logo{
		display: none;
	}

	.title{
		display: none;
	}

	#books{
		display: none;
	}

	.text-btn{
		display: flex;
		flex-direction: column;
	}

	#app{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw !important;
		height: calc(100vh - 80px);
	}
}


</style>