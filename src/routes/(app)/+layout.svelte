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

	import { pages, allPages, user, users, isPanelVisible, assets, folders, openFolders, MAX, showModal, spaces } from '$lib/utils/store.js'; // Adjust the path as necessary

	import Panel from '$lib/components/Panel.svelte';





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

	let isFetched = false


	async function fetchFolders() {
		if (!isFetched) {
			const { data: d, error } = await supabaseClient.from('folders').select('*').eq('user_id', data.user.id)
			if (!error) {
				folders.set(d);
				setTimeout(() => {
					$folders.forEach(async (folder, index) => {



						folder.pages = folder.pages.filter(function(item, pos) {
							return folder.pages.indexOf(item) == pos;
						})


						folder.objects = []

						folder.pages.forEach(page => {

							let object = $pages.find(x => x.id == page)
							folder.objects.push(object)
						})

						$folders.forEach(folder => {
							folder.open = $openFolders.includes(folder.id);
						});
					})
				}, 100);
			} else {
				console.error('Error fetching folders:', error);
			}
		}
	}

	$: if ($page && $page.route && $page.route.id) {
		path = $page.url.pathname
	}

	//let pages = writable([])

	async function fetchPages(){

		const {data: d, error} = await supabaseClient.from('pages').select('*').eq('user_id', data.user.id).order('index', { ascending: true });

		if (!error){
			pages.set(d)
		}else{
			console.log('Error fetching pages:' + error)
		}
	}

	async function fetchUser(){

		const {data: d, error} = await supabaseClient.from('users').select('*').eq('id', data.user.id)

		if (!error){
			user.set(d)
		}else{
			console.log('Error fetching user:' + error)
		}
	}


	async function fetchUsers(){

	const {data: d, error} = await supabaseClient.from('users').select('*')

	if (!error){
		users.set(d)
	}else{
		console.log('Error fetching user:' + error)
	}
}




	async function fetchAllPages(){

		const {data: d, error} = await supabaseClient.from('pages').select('*')


		if (error) {
            console.error('Error fetching pages:', error);
            return;
        }else{
			allPages.set(d);
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


	async function loadImagesFromSupabase() {

	assets.set([])
	const path = `${data.user.id}/`; // Construct the path to your subfolder

	const { data: files, error } = await supabaseClient.storage.from('images').list(path);


	if (error) {
		console.error("Error fetching files:", error);
		return;
	}

	// Iterate through the files and download each one
	for (const file of files) {
		const { data: fileData, error } = await supabaseClient.storage.from(`images/${data.user.id}`).download(file.name);

		if (error) {
			console.error("Error downloading the file:", error);
			continue;
		}

		//console.log(fileData)

		const url = URL.createObjectURL(fileData);
		assets.update(urls => [...urls, {name: file.name, id: file.id, url: url}]);
	}
}

	async function fetchSpaces(){
		const {data: d, error} = await supabaseClient.from('user_spaces').select('*').eq('user_id', data.user.id)

		if (error) {
			console.error('Error fetching pages:', error);
			return;
		}else{
			spaces.set(d);
			console.log(d)
		}
	}

	loadImagesFromSupabase()
	fetchPages()
	fetchAllPages()
	fetchUser()
	fetchUsers()
	fetchFolders()
	fetchSpaces()



</script>



{#key data.pathname}

<section>

	{#if !$MAX && !$showModal}
		<Sidebar {data}/>
	{/if}

	<div id = 'app'>
	  <slot />
	</div>

	<Panel active = {$isPanelVisible}/>

</section>

{/key}


<style lang="scss">






	#app{
		position: fixed;
		top: 0;
		left: 0px;
		width: 100vw;
		height: 100vh;
		overflow-x: visible !important;
		overflow-y: hidden;
		background: white;
		//background: #f4f4f4;
		//background: #FF004D
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