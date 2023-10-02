<script lang="ts">

	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import X from '$lib/img/x.svg'
	import Xylophone from '$lib/img/xylophone.svg'
	import { onMount } from 'svelte'
	import Sortable from 'sortablejs';
	import Arachne from '$lib/img/arachne.svg'
	import IconHome from '$lib/img/iconx.svg'
	import IconProfile from '$lib/img/iconx-3.svg'
	import IconData from '$lib/img/iconx-2.svg'
	import IconAssets from '$lib/img/iconx-1.svg'
	import icon from '$lib/img/favicon.svg'
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import Sidebar from '$lib/components/Sidebar.svelte'
	import {invalidate} from '$app/navigation'
	import { supabaseClient } from '$lib/db'
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { pages, user, scrollPosition, openFolders, folders } from '$lib/utils/store.js';  // Adjust the path as needed

	export let data;

	let newID = crypto.randomUUID();
	let pagesDiv;
	let isFetched = false;
	let path;

    let newFolderName = "";  // Temporary variable to hold the name of the new folder during creation


	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname;
	}

	// ... [rest of the imports and variables]

onMount(() => {

	if(pagesDiv) {
        pagesDiv.scrollTop = $scrollPosition;
    }



	let sortable = Sortable.create(document.querySelector('.pages'), {
		group: 'shared',
		animation: 150,
		onAdd: async function (evt) {

			console.log(evt.to)
			const folderId = evt.to.closest('.folder').dataset.id;

			const item = $pages[evt.oldIndex];

			await movePageToFolder(item.id, folderId);

			// Remove page from the main pages array
			$pages = $pages.filter(p => p.id !== item.id);
		},



		onRemove: async function (evt) {
			const item = $pages[evt.oldIndex];

			if (evt.from.classList.contains('folder-contents')) {
				await removePageFromFolder(item.id);
			}

			// Add the page back to the main pages array
			$pages = [...$pages, item];
		}
	});



	async function fetchFolders() {
		if (!isFetched) {
			const { data: d, error } = await supabaseClient.from('folders').select('*').eq('user_id', data.user.id)
			if (!error) {
				folders.set(d);
				setTimeout(() => {
					$folders.forEach(async (folder, index) => {

						let sortable = Sortable.create(document.getElementById('content-' + folder.id), {
							group: 'shared',
							animation: 150,
							onAdd: function (evt) {
								let pageID = evt.item.firstElementChild.id
								sortFolder(folder, pageID)
							}
						});



						folder.pages = folder.pages.filter(function(item, pos) {
							return folder.pages.indexOf(item) == pos;
						})


						folder.objects = []

						folder.pages.forEach(page => {

							let object = $pages.find(x => x.id == page)
							folder.objects.push(object)
						})
						folder.open = $openFolders.includes(folder.id);


					})
				}, 100);
			} else {
				console.error('Error fetching folders:', error);
			}
		}
	}


	//fetchFolders()
});

async function movePageToFolder(pageId, folderId) {
	const folder = $folders.find(f => f.id === folderId);

	// Add the page to the folder
	folder.pages.push(pageId);
	folder.objects.push($pages.find(p => p.id === pageId));

	// Update in DB
	await supabaseClient.from('folders').update({ pages: folder.pages }).eq('id', folderId);
	await supabaseClient.from('pages').update({ folder_id: folderId }).eq('id', pageId);
}

async function removePageFromFolder(pageId) {
	$folders.forEach(folder => {
		const pageIndex = folder.pages.indexOf(pageId);
		if (pageIndex !== -1) {
			folder.pages.splice(pageIndex, 1);
			folder.objects = folder.objects.filter(o => o.id !== pageId);
		}
	});

	// Update in DB
	await supabaseClient.from('pages').update({ folder_id: null }).eq('id', pageId);
}



	async function updateIndices(e){

		[].forEach.call(e.from.getElementsByClassName('page'), function (el,index) {
			let id = el.id
			updateIndex(id, index)
		});

		fetchPages()
	}

	async function updateIndex(id, index){
		const { data: d, error } = await supabaseClient
			.from('pages')
				.update({
				index: index
			})
			.eq('id', id);

			if (!error){

			}else{
			console.error('Error updating index:', error);
			}
	}

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
			const { data: d, error } = await supabaseClient.from('pages').select('*').eq('user_id', data.user.id).order('index', { ascending: true });
			if (!error) {
				pages.set(d);
				isFetched = true;
			} else {
				console.error('Error fetching pages:', error);
			}
		}
	}


	async function sortFolder(folder, pageID){
		const { data: d, error } = await supabaseClient.from('folders').update({pages: [...folder.pages, pageID]}).eq('id', folder.id);

		if (!error){
			console.log(`success`)

			const { data: k, error: e } = await supabaseClient.from('pages').update({folder_id: folder.id}).eq('id', pageID);

			if (!e){
				console.log(`success`)
			}else{
				console.error('Error updating page folder:', k);
			}

		}else{
			console.error('Error updating folder pages:', error);
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



   	async function addFolder() {

		let newID =  crypto.randomUUID()

        const folder = {
            id: newID,
            name: newFolderName || "Unnamed Folder",
            pages: [],
			objects: []
        };

        $folders = [...$folders, folder];
        newFolderName = "";  // Reset folder name for the next addition
		const {data, error} = await supabaseClient.from('folders').insert(folder)

		if (!error){

		}else{
			console.error('Error creating folder:', error);
		}

    }


    function toggleFolder(folderId) {
		let targetFolder = $folders.find(folder => folder.id === folderId);
		targetFolder.open = !targetFolder.open;

		if(targetFolder.open) {
			openFolders.update(opened => [...opened, folderId]);
		} else {
			openFolders.update(opened => opened.filter(id => id !== folderId));
		}

		folders.set($folders);  // Trigger update
	}


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
		<a href = '/app/home'>
			<div class = 'text-btn' id = 'home' class:active={path === '/home'}>
				<div class = 'icon' style = 'background-image: url({IconHome}'>
				</div>
				<h2> Home </h2>
			</div>
		</a>
		<a href = '/app/profile' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/profile'}>
				<div class = 'icon' style = 'background-image: url({IconProfile})'>
				</div>
				<h2> Profile </h2>
			</div>
		</a>

		<a href = '/app/assets' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/assets'}>
				<div class = 'icon' style = 'background-image: url({IconAssets})'>
				</div>
				<h2> Assets </h2>
			</div>
		</a>

		<a href = '/app/data' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/data'}>
				<div class = 'icon' style = 'background-image: url({IconData})'>
				</div>
				<h2> Database </h2>
			</div>
		</a>
	</div>

<div id='pages' bind:this={pagesDiv} on:click={saveScrollPosition}>
    <button id='add' on:click={addPage}> + Add Page </button>
	<!--
    <button id='group' on:click={addFolder}> + Add Group </button>
	-->

	<!--

	 {#each $folders as folder}
		<div class="folder" id = '{folder.id}' data-id={folder.id}>
			<div class="folder-header" class:active = {folder.open} on:click={() => toggleFolder(folder.id)}>

				<div class = 'flex'>

					<img src = {icon} alt = 'folder'>


					<h2> {folder.name} </h2>

				</div>


					<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 25L18.781 10.7438C19.1741 10.3371 19.8259 10.3371 20.219 10.7438L34 25" stroke="black" stroke-width="5" stroke-linecap="round"/>
					</svg>

			</div>

			<div class="folder-contents" class:active = {folder.open} id = 'content-{folder.id}' data-sveltekit-reload>
				{#each folder.objects as page}
					{#if page}
						<a href='/x/{page.id}' >
							<div class='text-btn page' id = '{page.id}' class:active={path === `/x/${page.id}`}>
								<div class='color' style='background-color: {page.color}'></div>
								<h2> {page.title} </h2>
							</div>
						</a>
					{/if}
				{/each}
			</div>

		</div>
	{/each}

-->

	<div class = 'pages'>
		{#each $pages as page}
			<a href='/app/x/{page.id}' >
				<div class='text-btn page' id = '{page.id}' class:active={path === `/x/${page.id}`}>
					<div class='color' style='background-color: {page.color}'></div>
					<h2> {page.title} </h2>
				</div>
			</a>
		{/each}
	</div>

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
	height: 36px;
	padding: 5px 10px;
	margin: 15px 5px 10px 5px;
	//margin-top: 10px;
	gap: 10px;
	border-radius: 5px;
	transition: 0.2s ease;

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


.color{
	width: 14px;
	height: 14px;
	border-radius: 10px;
	border: 1px solid rgba(0,0,0,0.1);
}


.folder {
  .folder-header {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.2px;
    padding: 5px 10px;
    margin: 0 5px;
	transition: 0.2s ease;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;


	.flex{
		gap: 8px;
	}

	img{
		height: 16px;
	}


	svg{
		height: 12px;
		width: 12px;
		transform: rotate(-180deg);
		transition: 0.3s ease;
		opacity: 0.3;
		path{
			width: 50px;
		}
	}

	&.active{
		svg{
			transform: rotate(0deg);
		}
	}

    &:hover {
      background: rgba(black, 0.05);
    }
  }

  .folder-contents {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out; /* Transition effect */

	&::after{
		content: '';
  		display: inline-block;
		height: 1px;
		width: 210px;
		margin-left: 15px;
		background: rgba(black, 0.1);
		transform: translateY(-5px);
	}

    &.active {
      max-height: 500px; /* This value should be more than enough for the content. Adjust if needed. */
    }
  }

}



.text-btn{
		margin: 0 5px;
		padding: 7px 12px;
		border-radius: 8px;
		font-size: 13px;
		letter-spacing: -0.3px;
		font-weight: 500;
		color: rgba(black, 0.4);
		transition: 0.2s ease;
		display: flex;
		align-items: center;
		width: 95%;
		gap: 8px;

		.icon{
			width: 18px;
			height: 18px;
			background-size: cover;
			filter: invert(20%);
		}

		&.active{
			background: white;
			color: black;
			//box-shadow: -3px 5px 15px rgba(black, 0.05);

			background: rgba(black, 0.05);
		}

		&:hover{
			//background: rgba(black, 0.05);
			background: white;
			//box-shadow: -3px 5px 15px rgba(black, 0.05);

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
	background: none;
    display: flex;
	flex-direction: column;
	z-index: 3 !important;
    opacity: 1;


	#add{
		width: calc(100% - 24px);
		margin: 15px;
		margin-bottom: 0px;
		box-shadow: none;
		background: rgba(black, 0.05);
		background: #ff004d;
		border-radius: 8px;
		padding: 8px 0;
		color: white;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: -0.2px;


		transition: 0.2s ease;

		&:hover{
			background: rgba(black, 0.1);
			background: #de0025;
		}
	}

	#group{
		width: calc(100% - 24px);
		margin: 15px;
		margin-top: 10px;
		box-shadow: none;
		background: rgba(black, 0.05);
		background: #ff004d;
		border-radius: 8px;
		padding: 8px 0;
		color: #ff004d;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: -0.2px;
		background: #ffeaf1;

		transition: 0.2s ease;

		&:hover{
			background: #ffdce8;
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