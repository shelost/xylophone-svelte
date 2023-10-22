<script lang="ts">

	import { writable } from 'svelte/store'
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	import Down from '$lib/img/down.svg'
	import X from '$lib/img/x.svg'
	import Xylophone from '$lib/img/xylophone.svg'
	import { onMount, onDestroy } from 'svelte'
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
	import { pages, user, scrollPosition, openFolders, folders, tools } from '$lib/utils/store';  // Adjust the path as needed

	export let data;

	let newID = crypto.randomUUID();
	let pagesDiv;
	let isFetched = false;
	let path;

    let newFolderName = "";  // Temporary variable to hold the name of the new folder during creation


	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname;
	}

	let spaces = [];
    let showSpacesDropdown = false; // To toggle the spaces dropdown

    // Fetch the spaces for the user
    async function fetchSpacesForUser(userId) {
        const { data: userSpaces } = await supabaseClient.from('user_spaces').select('space_id').eq('user_id', userId);
        if (userSpaces) {
            const spaceIds = userSpaces.map(rel => rel.space_id);
            const { data: fetchedSpaces } = await supabaseClient.from('spaces').select('*').in('id', spaceIds);
            spaces = fetchedSpaces || [];
        }
    }




	let hideDropdownTimeout;

function mouseOverProfileOrDropdown() {
	clearTimeout(hideDropdownTimeout);
}

function mouseOutFromProfileOrDropdown() {
	hideDropdownTimeout = setTimeout(() => {
		showSpacesDropdown = false;
	}, 100);  // a short delay to handle quick mouse movements
}


function handleClickOutside(event) {
        // Check if the clicked target is outside of #profile and the dropdown
        if (!event.target.closest('#profile') && !event.target.closest('.spaces-dropdown')) {
            showSpacesDropdown = false;
        }
    }

    function toggleSpacesDropdown(event) {
        showSpacesDropdown = !showSpacesDropdown;
        event.stopPropagation();  // Prevent the window click event from being triggered immediately
    }




onMount(() => {

	if(pagesDiv) {
        pagesDiv.scrollTop = $scrollPosition;
    }


	// Add event listener to the window
	window.addEventListener('click', handleClickOutside);

return () => {
	// Cleanup event listener on component destroy
	window.removeEventListener('click', handleClickOutside);
};



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



<div id = 'navbar' out:fly={{duration: 0}}>



	<div id = 'top' on:mouseover={mouseOverProfileOrDropdown} on:mouseout={mouseOutFromProfileOrDropdown}>


		{#await $user}

			<h2> {JSON.stringify($user)} </h2>

		{:then $user}

		{#if $user[0]}


			<div id='profile' on:click={toggleSpacesDropdown} on:mouseover={mouseOverProfileOrDropdown}>

				<img src='{$user[0].pfp}' alt='Scrollable Logo' id='logo'>
				<h2>{$user[0].full_name}</h2>

			</div>

				<!-- Spaces Dropdown -->
				{#if showSpacesDropdown}
				<div id="spaces-dropdown" in:fly ={{duration: 200, y: -5}} out:fly ={{duration: 200, y: -5}}  on:mouseover={mouseOverProfileOrDropdown} on:mouseout={mouseOutFromProfileOrDropdown}>
						{#each spaces as space}
							<a href={`/space/${space.id}`}>{space.name}</a>
						{/each}
						<button>+ Add Space</button>
					</div>
				{/if}

		{/if}
		{/await}
		<a href = '/app/home'>
			<div class = 'text-btn' id = 'home' class:active={path === '/app/home'}>
				<div class = 'icon' style = 'background-image: url({IconHome}'>
				</div>
				<h2> Home </h2>
			</div>
		</a>
		<a href = '/app/profile' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/app/profile'}>
				<div class = 'icon' style = 'background-image: url({IconProfile})'>
				</div>
				<h2> Profile </h2>
			</div>
		</a>

		<a href = '/app/assets' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/app/assets'}>
				<div class = 'icon' style = 'background-image: url({IconAssets})'>
				</div>
				<h2> Assets </h2>
			</div>
		</a>

		<a href = '/tools' id = 'settings' >
			<div class = 'text-btn' class:active={path === '/tools'}>
				<div class = 'icon' style = 'background-image: url({IconAssets})'>
				</div>
				<h2> Assets </h2>
			</div>
		</a>

	</div>

<div id='pages' bind:this={pagesDiv} on:click={saveScrollPosition}>
    <button id='add' on:click={addPage}>
		<h2>
			Add Page
		</h2>
		<svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 31L46.788 66.2779C47.1796 66.6751 47.8204 66.6751 48.212 66.2779L83 31" stroke="white" stroke-width="10"/>
		</svg>
	</button>
	<div class = 'pages'>
		{#each $pages as page}
			<a href='/app/page/{page.id}' >
				<div class='text-btn page' id = '{page.id}' class:active={path === `/app/page/${page.id}`}>
					<div class='color' style='background-color: {page.color}'></div>
					<h2> {page.title} </h2>
				</div>
			</a>
		{/each}
	</div>

</div>


<div id = 'flare-1'></div>

</div>



<style lang="scss">


@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');



::-webkit-scrollbar{
	width: 0;
}


#profile{
	display: flex;
	align-items: center;
	background: white;
	height: 36px;
	padding: 5px 8px;
	margin: 10px 0px 10px 5px;
	//margin-top: 10px;
	gap: 10px;
	border-radius: 5px;
	transition: 0.2s ease;

	width: 200px;
	background: rgba(white, 1);

	img{
		border-radius: 15px;
		height: 20px;

	}

	h2{
		font-size: 13px;
		letter-spacing: -0.1px;
		font-weight: 600;
		color: black;
		font-family: Onest, Inter, sans-serif;
	}

	&:hover{
		background: rgba(white, 0.9);
	}
}

#spaces-dropdown{
	position: absolute;
	top: 44px;
	left: 10px;
	z-index: 3;
	background: white;
	width: 200px;
}


.color{
	width: 12px;
	height: 12px;
	border-radius: 10px;
	border: 1px solid rgba(0,0,0,0.05);
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
		padding: 6px 10px;
		border-radius: 5px;
		font-size: 13px;
		font-weight: 500;
		color: rgba(white, 0.7);
		transition: 0.4s ease;
		display: flex;
		align-items: center;
		gap: 8px;
		width: 200px;
		margin-left: 5px;

		h2{
			font-family: Onest, Inter, sans-serif;
			letter-spacing: 0px;
			font-weight: 500;
			font-size: 11.5px;
			margin-top: 1px;
		}

		.icon{
			width: 15px;
			height: 15px;
			background-size: cover;
			filter: brightness(200%);
		}


		&:hover{
			//background: rgba(black, 0.05);
			background: white;
			//box-shadow: -3px 5px 15px rgba(black, 0.05);

			background: rgba(white, 0.3);
		}

		&.active{
			background: #fdfdfd;

			box-shadow: -5px 5px 15px rgba(black, 0.1), 5px -5px 10px rgba(white, 0.3);

			color: black;


			h2{
				font-weight: 600;
			}

			.icon{
				filter: brightness(0%);
			}
		}

	}



#navbar{
	position: fixed !important;
	top: 0px;
	left: 0px;
	height: 100vh;
	overflow: hidden;
	background: none;
    display: flex;
	flex-direction: column;
	z-index: 3 !important;
    opacity: 1;
	background: #efefef;
	//background: #ff004d;
	background-image: linear-gradient(180deg, #ff004d, #ff0080);
	top: 10px;
	left: 10px;
	height: calc(100vh - 20px);
	width: 220px;
	border-radius: 8px;
	box-shadow: 0px 20px 50px rgba(#ff004d, 0.5);


	#flare-1{
		position: absolute;
		top: 0;
		right: 2px;
		height: 60%;
		width: 1px;

		filter: blur(1px);
		background-image: linear-gradient(0deg, rgba(white, 0.4), rgba(white, 1), rgba(white, 0.4));
	}



	#add{
		width: calc(100% - 0px);
		margin: 10px;
		margin-left: 0px;
		margin-top: 15px;
		font-family: Onest, Inter, sans-serif;

		box-shadow: none;
		background: rgba(white, 0.2);
		//background: #FF004D;

		border-radius: 5px;
		padding: 7px 0px;
		color: white;

		letter-spacing: -0.1px;
		transition: 0.2s ease;

		h2{
			font-size: 11px;
            letter-spacing: 0px;
			font-weight: 500;
		}

		svg{
			height: 11px;
			width: 11px;
		}

		&:hover{
			background: rgba(white, 0.3);
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
		width: 210px;
		margin-left: 5px;
		padding-bottom: 15px;
	}

	#pages{
		width: 200px;
		margin-left: 10px;
		flex: 1;
		overflow-y: scroll;
		border-top: 2px solid rgba(black, 0.1);
		//margin-bottom: 10px;
		margin-bottom: 0 !important;
		padding-bottom: 10px;
		overflow-x: hidden;

		.text-btn{
			margin-left: 0;
		}
	}
}


</style>