<script lang="ts">

	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import X from '$lib/img/x.svg'
	import Xylophone from '$lib/img/xylophone.svg'

	import { onMount } from 'svelte'

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
	import { pages, user, scrollPosition } from '$lib/utils/store.js';  // Adjust the path as needed

	export let data;

	let newID = crypto.randomUUID();
	let pagesDiv;
	let isFetched = false;
	let path;

	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname;
	}

	onMount(() => {
		if (pagesDiv) {
            pagesDiv.scrollTop = $scrollPosition;
        }
	});

	function saveScrollPosition() {
        if (pagesDiv) {
            scrollPosition.set(pagesDiv.scrollTop);
        }
    }

	const handleLogout: SubmitFunction = async ({ result }) => {
		if (result.type === 'redirect') {
			await invalidate('supabase:auth');
		} else {
			await applyAction(result);
		}
	};

	async function fetchPages() {
		if (!isFetched) {
			const { data: d, error } = await supabaseClient.from('pages').select('*').eq('user_id', data.user.id);
			if (!error) {
				pages.set(d);
				isFetched = true;
			} else {
				console.error('Error fetching pages:', error);
			}
		}
	}

	async function addPage() {
		const { data: d, error } = await supabaseClient.from('pages').insert({
			id: newID,
			color: '#ffffff',
			user_id: data.user.id
		});
		if (!error) {
			window.location = '/x/' + newID;
		} else {
			console.error('Error creating page:', error);
		}
		newID = crypto.randomUUID();
		fetchPages();
	}

	fetchPages();

</script>



<div id = 'navbar'>

	<div id = 'top'>


		{#await $user}

		<h2> {JSON.stringify($user)} </h2>


		{:then $user}

		{#if $user[0]}
		<a href = '/home'>
			<div id = 'profile'>
				<img src = '{$user[0].pfp}' alt = 'Scrollable Logo' id = 'logo'>
				<h2> {$user[0].full_name} </h2>
			</div>
		</a>

		{/if}
		{/await}




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

		<a href = '/assets' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/assets'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Assets </h2>
			</div>
		</a>

		<a href = '/data' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/data'}>
				<div class = 'icon' style = 'background-image: url({IconFeed})'>
				</div>
				<h2> Database </h2>
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


	<div id='pages' bind:this={pagesDiv} on:click={saveScrollPosition}>

			<button id = 'add' on:click={addPage}> + Add Page </button>

			{#each $pages as page}

				<a href = '/x/{page.id}'>

					<div class = 'text-btn'  class:active={path === `/x/${page.id}`}>


						<div class = 'color' style='background-color: {page.color}; width: 14px; height: 14px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.05)'></div>
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


#profile{
	display: flex;
	align-items: center;
	background: white;
	height: 44px;
	padding: 10px 10px;
	margin: 10px 5px;
	//margin-top: 10px;
	gap: 10px;
	border-radius: 5px;

	img{
		border: 1px solid rgba(black, 0.2);
		border-radius: 5px;
		height: 22px;

	}

	h2{
		font-size: 14px;
		letter-spacing: -0.2px;
		font-weight: 500;
	}

	&:hover{
		background: rgba(black, 0.05);
	}
}


.text-btn{
		margin: 0 5px;
		padding: 6px 12px;
		border-radius: 3px;
		font-size: 13px;
		letter-spacing: -0.3px;
		font-weight: 500;
		color: rgba(black, 0.4);
		transition: 0.1s ease;
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
			background: rgba(black, 0.05);
			color: black;
		}

		&:hover{
			background: rgba(black, 0.05);
		}
	}



#navbar{
	position: fixed !important;
	top: 0px;
	left: 0px;
	width: 240px;
	height: 100vh;
	overflow: hidden;

	//background: #FF004D;

	background: none;

    display: flex;
	flex-direction: column;
	z-index: 3 !important;

    opacity: 1;





	#add{
		width: calc(100% - 30px);
		margin: 15px;
		box-shadow: none;
		background: rgba(black, 0.05);
		color: black;
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.2px;

		&:hover{
			background: rgba(black, 0.1);
		}
	}


	#top{
		width: 230px;
		background: #EE0044;
		background: rgba(white, 0.1);
		margin-left: 5px;
		padding-bottom: 15px;
	}

	#pages{
		width: 240px;
		flex: 1;
		//border-radius: 10px;

		overflow-y: scroll;
		//background: #DD0044;
		//background: rgba(black, 0.05);
		border-top: 1px solid rgba(black, 0.08);
		//margin: 15px;
		margin-bottom: 10px;
		margin-top: 10px;

		padding-bottom: 10px;
	}
}


</style>