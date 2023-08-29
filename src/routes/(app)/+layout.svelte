<script lang="ts">
	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import IconHome from '$lib/img/iconx_home.svg'
	import IconCreate from '$lib/img/iconx_create.svg'
	import IconFeed from '$lib/img/iconx_settings.svg'
	import IconShop from '$lib/img/icon_shop.svg'
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { supabaseClient } from '$lib/db'
	export let data

	let path;


	let newID = crypto.randomUUID()

	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname
		console.log(path)
	}

	console.log($page.url.pathname)

	let pages = writable([])


	async function fetchPages(){

		const {data: d, error} = await supabaseClient.from('pages').select('*')

		if (!error){
			pages.set(d)
			console.log(d)
		}else{
			console.log('Error fetching pages:' + error)
		}
	}


	async function addPage(){

		const {data: d, error} = await supabaseClient.from('pages').insert({
			id: newID
		})
		newID = crypto.randomUUID()

		if (!error){

		}else{
			console.log('Error creating page:' + JSON.stringify(error))
		}
	}

	fetchPages()

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

		<!--
		<a href = '/shop' id = 'shop' >
			<div class = 'text-btn' class:active={path === '/shop'}>
				<div class = 'icon' style = 'background-image: url({IconShop})'>
				</div>
				<h2> Shop </h2>
			</div>
		</a>
		-->

		<a href = '/studio' id = 'create' >
			<div class = 'text-btn' class:active={path === '/create'}>
				<div class = 'icon' style = 'background-image: url({IconCreate})'>
				</div>
				<h2> Create </h2>
			</div>
		</a>

		<a href = '/profile' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/profile'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Profile </h2>
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



		<h1 class = 'title'> Pages </h1>

		<div id = 'pages'>

			{#each $pages as page}


			<a href = '/x/{page.id}'>

				<div class = 'text-btn'  class:active={path === `/x/${page.id}`}>
					<img class = 'icon' src = {IconShop}>
					<h2> {page.id} </h2>
				</div>
			</a>

			{/each}


			<button id = 'add' on:click={addPage}> Add Page </button>

			<a href = '/p/space/meditations'>
				<div class = 'text-btn'>
					<div class = 'icon'>
					</div>
					<h2> Meditations </h2>
				</div>
			</a>
		</div>


	</div>


	<div id = 'bottom'>
		<!--
		<a href = '/settings' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/settings'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Settings </h2>
			</div>
		</a>
		-->

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
		margin: 25px 15px;
		filter: invert(100%);
	}


	#settings{
		z-index: 5 !important;
	}

	#app{
		background: rgb(234, 234, 234) !important;
	}

	.title{
		font-weight: 600;
		margin: 15px;
	}

	.text-btn{
		margin: 5px;
		padding: 10px 15px;
		border-radius: 5px;
		font-size: 12px;
		letter-spacing: -0.3px;
		transition: 0.2s ease;
		display: flex;
		align-items: center;
		gap: 12px;

		&.active{
			background: rgba(white, 0.1);
		}
	}

	.text-btn:hover{
		background: rgba(white, 0.1);
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
	background: #1e1e1e;
      display: block;
      opacity: 1;
	  color: white;
	  overflow-y: scroll;
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