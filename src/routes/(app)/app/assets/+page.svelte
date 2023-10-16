<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
    import type { PageData, Task } from '../../routes/$types';
	import {fly} from 'svelte/transition'
	import {fabric} from 'fabric'
	import Modal from '$lib/components/Modal.svelte';
	import {canvasElements, allPages, users, assets, showModal} from '$lib/utils/store'
    export let data: PageData;


    let user = {};
    let userData = {};
	let books = []
	let loading = true
	let toBeDeleted = null;


	async function downloadAsset(image) {
		try {
			const { data: fileData, error } = await supabaseClient.storage.from('images').download(data.user.id + '/' + image.name);

			if (error) {
				throw error;
			}

			const blobUrl = URL.createObjectURL(fileData);
			const anchorElement = document.createElement('a');
			anchorElement.href = blobUrl;
			anchorElement.download = image.name;
			anchorElement.click();
			anchorElement.remove();

			URL.revokeObjectURL(blobUrl);  // Optional: Free up memory

		} catch (err) {
			console.error("Error downloading the asset:", err)
		}
	}


    async function handleDeleteConfirmation() {
		// Close the modal first
		$showModal = false;

		// Check if there's an asset selected for deletion
		if (!toBeDeleted) {
			console.error("No asset selected for deletion.");
			return;
		}

		assets.update(allAssets => allAssets.filter(asset => asset.id !== toBeDeleted.id));

		try {
			// Delete asset from Supabase storage
			const { error } = await supabaseClient.storage.from('images').remove(data.user.id + '/' + toBeDeleted.name);

			if (error) {
				throw error;
			}

			// Remove asset from the $assets store
			assets.update(allAssets => allAssets.filter(asset => asset.id !== toBeDeleted.id));

			// Clear the toBeDeleted variable for safety
			toBeDeleted = null;

			COLS = [[],[],[]]

			for (let i=0; i<$assets.length; i++){

				let asset = $assets[i]

				COLS[i%3].push(asset)
			}


		} catch (err) {
			console.error("Error deleting the asset:", err);
		}
	}




	function Class(id){
		return document.getElementsByClassName(id)
	}

	function Id(id){
		return document.getElementById(id)
	}

	let initialCanvasWidth = window.innerWidth
	let initialCanvasHeight = window.innerHeight


	function resizeObjectsToCanvas(canvas, originalWidth, targetWidth) {
		const scaleX = targetWidth / originalWidth


		canvas.forEachObject((obj: any) => {
			const left = obj.left || 0;
			const top = obj.top || 0;


			console.log(scaleX)


			obj.scaleX *= scaleX
			obj.scaleY *= scaleX
			obj.left *= scaleX
			obj.top *= scaleX


			obj.setCoords(); // Refresh object coordinates after updates
		});
		canvas.renderAll();
	}



	async function loadCanvas(page, canvas) {
		if (!page.content) {
			return;
		}

		// Ensure that the user has an active session
		const session = data.session

		// Use the session's access token in headers for authorization
		const headers = {
			'Authorization': `Bearer ${session.access_token}`
		};

		const { data: fileData, error } = await supabaseClient.storage.from('fabric')
			.download(page.content, { headers });  // Provide headers as options

		if (error) {
			console.error('Error downloading the file:', error);
			return;
		}

		// Convert blob data to JSON string
		const blobToText = (blob) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsText(blob);
			});
		};

		try {
			const fileText = await blobToText(fileData);
			const fileJson = JSON.parse(fileText);


			// Log the parsed data for confirmation




			// Load the parsed data into the canvas
			canvas.loadFromJSON(fileJson, () => {
				resizeObjectsToCanvas(canvas, page.iwidth, 300);
				canvas.renderAll();
			}, (o, object, error) => {
			});



		} catch (parseError) {
			console.error('Error parsing the blob data:', parseError);
		}
	}




	let COLS = [[],[],[]]


	async function loadImagesFromSupabase() {

		assets.set([])
		const path = `${data.user.id}/`; // Construct the path to your subfolder

		const { data: files, error } = await supabaseClient.storage.from('images').list(path);

		console.log(files)

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

			COLS = [[],[],[], []]

			for (let i=0; i<$assets.length; i++){

				let asset = $assets[i]

				COLS[i%4].push(asset)
			}
		}
	}


	loadImagesFromSupabase()


	onMount(() => {
		for (let i=0; i<$users.length; i++){
			let page = $users[i];

			let canvas = new fabric.Canvas(Id(`canvas-${page.id}`), {
				width: 250,
				height: 250,
				renderOnAddRemove: false
			});

			if (page.content){
				loadCanvas(page, canvas);

			}
		}
	});



</script>



<div id = 'app' class:center={$showModal}  in:fly={{ y: 50, duration: 300}} out:fly={{ y:-50, duration: 300 }}>

	<section>
{#await $allPages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages' in:fly={{ y: 50, duration: 300, delay: 1000}} out:fly={{ y: -50, duration: 300 }}>

		{#each COLS as col}

			<div class = 'col'>
				{#each col as image, i}
					<div class='page' id='{image.id}'>

						<div class = 'container'>
							<div class='overlay'>
								<button class = 'download' on:click={() => downloadAsset(image)}>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M6.31934 11.1112L12.0816 16.4092L17.8439 11.1112" stroke="#131F60" stroke-width="2" stroke-linecap="square"/>
										<path d="M12 4.5L12 15.5" stroke="#131F60" stroke-width="2" stroke-linecap="square"/>
										<path d="M4.88086 19.5H18.9985" stroke="#131F60" stroke-width="2" stroke-linecap="square"/>
									</svg>
								</button>
								<button class = 'remove' on:click={() => { $showModal = true; toBeDeleted = image; }}>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M5.5 7.53406H18.5" stroke="#131F60" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										<path d="M17.5774 7.53406V17.8193C17.5774 18.8525 16.7464 19.6893 15.7203 19.6893H8.29171C7.26564 19.6893 6.43457 18.8525 6.43457 17.8193V7.53406" stroke="#131F60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M14.788 4.5H9.21655" stroke="#131F60" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										<path d="M10.1438 11.2803V15.9554" stroke="#131F60" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										<path d="M13.8604 11.2803V15.9554" stroke="#131F60" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
									</svg>
								</button>
							</div>
							<div class = 'gradient-top'></div>
							<div class = 'gradient-bottom'></div>
							<img src='{image.url}' alt='image'>
						</div>
						<h1>{image.name}</h1>
					</div>
				{/each}
			</div>

		{/each}

	</div>

{/await}

</section>


</div>


{#if $showModal}

<Modal
    active={$showModal}
	header="Are You Sure?"
    message="This action is irreversible and will permanently delete this asset from your library."
    confirmText="Delete"
    closeText="Keep"
    onConfirm={handleDeleteConfirmation}
    onClose={() => { $showModal = false; }}
/>

{/if}




<style lang="scss">

	@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');


	h1{
		color: black;
	}

	#app{
		margin-left: 240px;
		height: 100vh;
		overflow-y: scroll;
		transition: 0.2s ease;
		&.center{
			margin-left: 100px;
		}
	}

	:global(canvas){
		//border: 1px solid rgba(black, 0.1);
		width: 250px;
		height: 250px;
		border-radius: 5px;

	}

	#title{
		font-size: 24px;
		font-weight: 700;
	}

	#pages{
		display: flex;
		justify-content: flex-start;
		//flex-wrap: wrap;
		gap: 20px;
		margin-top: 40px;
		width: calc(100vw - 300px);

		.col{
			flex: 1;
			width: 250px;
			//width: 100%;
			//flex: 1;
			//flex-grow: 1;
			//overflow-x: visible;
			//width: calc((100vw - 240px) / 6);
		}

		.page{
			width: 100%;
			padding: 5px;
			border-radius: 5px;
			padding-bottom: 10px;
			transition: 0.2s ease;
			margin: 20px 0;
            flex-grow: 0;
            height: fit-content;
			flex-shrink: 0;
			position: relative;
			cursor: pointer;

			.container{
				width: 100%;
				height: 100%;
				//padding: 5px;
				border-radius: 8px;
				position: relative;
				overflow: hidden;
				box-shadow: 10px 15px 50px rgba(black, 0.1);
			}

			.gradient-top{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 30%;
				pointer-events: none;
				z-index: 3;
				//background-image: linear-gradient(185deg, rgba(white, 0.4), rgba(white, 0), rgba(white, 0));
			}

			.gradient-bottom{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 3;
				pointer-events: none;
				//background-image: linear-gradient(5deg, rgba(black, 0.05), rgba(white, 0), rgba(white, 0));
			}





			.overlay{
				position: absolute;
				display: flex;
				//flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 12px;
				bottom: 12px;
				right: 15px;
				//width: 100%;
				height: 50px;
				//background: rgba(black, 0.5);
				opacity: 0;
				visibility: hidden;
				transition: 0.2s ease;

				button{
					width: fit-content;
					font-size: 12px;
					font-weight: 600;
					letter-spacing: -0.2px;
					border-radius: 30px;
					padding: 10px;
					border: 1.5px solid white;

					svg{
						width: 18px;
						height: 18px;
					}

					&.download{
						background: #0074ff;
						color: black;
						svg{
							path{
								stroke-width: 2;
								stroke: white;
							}
						}
						&:hover{
							background: #0052ff;
						}
					}

					&.remove{
						svg{
							path{
								stroke-width: 2;
								stroke: white;
							}
						}
						&:hover{
							background: #e20035;
						}
					}
				}
			}

            img{
				//box-shadow: 0px 10px 40px rgba(black, 0.05);
				border-radius: 5px;
            }

			h1{
				width: calc((100vw - 420px) / 4);
				margin-top: 15px;
				margin-left: 0px;
				font-size: 16px;
				font-weight: 600;
				letter-spacing: -0.2px;
				overflow-wrap: break-word;
				word-wrap: break-word;
				color: rgba(black, 0.8);
				font-family: Onest, Inter, sans-serif;
				display: none;
			}

			&:hover{

				transform: translateY(-5px);

				.overlay{
					opacity: 1;
					visibility: visible;
				}

			}


		}
	}




	section{
		margin: 0px 30px;
		transform: translateY(-30px);
	}




</style>