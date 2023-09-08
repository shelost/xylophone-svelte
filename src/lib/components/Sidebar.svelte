<script lang="ts">

	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import X from '$lib/img/x.svg'
	import Xylophone from '$lib/img/xylophone.svg'

	import Arachne from '$lib/img/arachne.svg'


	import IconHome from '$lib/img/iconx_home.svg'
	import IconCreate from '$lib/img/iconx_create.svg'
	import IconFeed from '$lib/img/iconx_settings.svg'
	import IconShop from '$lib/img/icon_shop.svg'
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import Sidebar from '$lib/components/Sidebar.svelte'
	import {invalidate} from '$app/navigation'
	import { supabaseClient } from '$lib/db'

	import { applyAction, enhance, type SubmitFunction } from '$app/forms';


	let newID = crypto.randomUUID()



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


	let path;

	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname
	}

    let pages = writable([])

	async function fetchPages(){

		const {data: d, error} = await supabaseClient.from('pages').select('*')

		if (!error){
			pages.set(d)
			console.log(d)
		}else{
			console.log('Error fetching pages:' + JSON.stringify(error))
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


	/*
	async function saveCanvasToSupabase() {
		// Serialize the current canvas state
		const canvasState = JSON.stringify(canvas);

		// Save to Supabase
		const { data, error } = await supabaseClient
			.from('pages')
			.insert([
				{ title: title }
			]);

		if (error) {
			console.error('Error saving canvas: ', error);
		} else {
			console.log('Canvas saved successfully: ', data);
		}
	}
	*/

</script>



<div id = 'navbar'>

	<div id = 'top'>

		<a href = '/home'>
			<img src = '{Arachne}' alt = 'Scrollable Logo' id = 'logo'>
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

		<!--
		<a href = '/studio' id = 'create' >
			<div class = 'text-btn' class:active={path === '/create'}>
				<div class = 'icon' style = 'background-image: url({IconCreate})'>
				</div>
				<h2> Create </h2>
			</div>
		</a>
		-->

		<a href = '/profile' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/profile'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Profile </h2>
			</div>
		</a>



		<!--

		<form action="/logout" method="post" use:enhance={handleLogout}>
			<button>
				<h1> Log Out</h1>
			</button>
		</form>

		-->



	</div>


		<div id = 'pages'>

			<button id = 'add' on:click={addPage}> + Add Page </button>

			{#each $pages as page}

				<a href = '/x/{page.id}'>

					<div class = 'text-btn'  class:active={path === `/x/${page.id}`}>

						<h2> {page.title} </h2>

					</div>
				</a>

			{/each}

		</div>

	</div>



<style lang="scss">


::-webkit-scrollbar{
	width: 0;
}

.text-btn{
		margin: 0 5px;
		padding: 8px 12px;
		border-radius: 5px;
		font-size: 12px;
		letter-spacing: -0.3px;
		font-weight: 400;
		color: rgba(white, 0.7);
		color: black;
		transition: 0.2s ease;
		display: flex;
		align-items: center;
		width: 95%;
		gap: 8px;

		.icon{
			width: 18px;
			height: 18px;
			background-size: cover;
			filter: invert(100%);
		}

		&.active{
			background: rgba(white, 0.1);
			color: white;
		}

		&:hover{
			background: rgba(white, 0.1);
		}
	}



#navbar{
	position: fixed !important;
	top: 0px;
	left: 0px;
	width: 240px;
	height: 100vh;
	overflow: hidden;

	background: #FF004D;

	background: none;

    display: flex;
	flex-direction: column;
	z-index: 3 !important;


    opacity: 1;


    #logo{
		height: 28px;
		margin: 25px 15px;
	}


	#add{
		width: calc(100% - 30px);
		margin: 15px;
		box-shadow: none;
		background: rgba(black, 0.05);
		color: black;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: -0.2px;

		&:hover{
			background: rgba(black, 0.1);
		}
	}


	#top{
		border-radius: 5px;
	}

	#top{
		width: 230px;
		border-radius: 10px;
		background: #EE0044;
		background: rgba(white, 0.1);
		margin-left: 10px;
		margin-top: 10px;
		padding-bottom: 15px;
	}

	#pages{
		width: 220px;
		flex: 1;
		border-radius: 10px;

		overflow-y: scroll;
		background: #DD0044;
		background: rgba(black, 0.05);
		margin: 15px;
		margin-bottom: 10px;

		padding-bottom: 10px;
	}
}


</style>