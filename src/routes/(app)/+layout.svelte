<script lang="ts">
	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import X from '$lib/img/favicon.svg'
	import Xylophone from '$lib/img/xylophone.svg'
	import IconHome from '$lib/img/iconx_home.svg'
	import IconCreate from '$lib/img/iconx_create.svg'
	import IconFeed from '$lib/img/iconx_settings.svg'
	import IconShop from '$lib/img/icon_shop.svg'
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import Sidebar from '$lib/components/Sidebar.svelte'
	import { supabaseClient } from '$lib/db'

	import { applyAction, enhance, type SubmitFunction } from '$app/forms';



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



	export let data

	let path;

	let newID = crypto.randomUUID()

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

	<Sidebar {data}/>

	<div id = 'app'>
	  <slot />
	</div>

</section>

{/key}


<svelte:head>
	<title> Xylophone | Build Freely </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={X} />
</svelte:head>



<style lang="scss">


	::-webkit-scrollbar{
      width: 0;
      height: 0;
      background: white;
 	}

	::-webkit-scrollbar-thumb{
		background: rgba(black, 0.4);
	}

	#settings{
		z-index: 5 !important;
	}


	#app{
		position: fixed;
		top: 0;
		left: 240px;
		width: calc(100vw - 240px);
		height: 100vh;
		overflow-x: visible !important;
		overflow-y: scroll;
		//background: #f4f4f4;
		//background: #FF004D;
		z-index: 3;
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