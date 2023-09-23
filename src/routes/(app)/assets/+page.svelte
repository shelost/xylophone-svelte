<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
	import TodoList from '../../../lib/components/TodoList.svelte'
	import Spaces from '../../../lib/components/Spaces.svelte'
	import Space from '../../../lib/components/Space.svelte'
    import type { PageData, Task } from '../../routes/$types';
	import {fly} from 'svelte/transition'
	import {fabric} from 'fabric'
    export let data: PageData;
    let user = {}; // Define the 'user' variable to store data about the active user
    let userData = {};
	let books = []
	let loading = true

	import {canvasElements, allPages, users, assets} from '../../../store'



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

			COLS = [[],[],[]]

			for (let i=0; i<$assets.length; i++){

				let asset = $assets[i]

				COLS[i%3].push(asset)
			}
		}
	}


loadImagesFromSupabase()


	onMount(() => {
		for (let i=0; i<$users.length; i++){
			let page = $users[i];

			let canvas = new fabric.Canvas(Id(`canvas-${page.id}`), {
				width: 350,
				height: 250,
				renderOnAddRemove: false
			});

			if (page.content){
				loadCanvas(page, canvas);

			}
		}
	});



</script>



<div id = 'app'>

	<section>
	<h1 id = 'title'> Assets </h1>

{#await $allPages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages' in:fly={{ y: 50, duration: 300, delay: 1000}} out:fly={{ x: 200, duration: 300 }}>

		{#each COLS as col}

			<div class = 'col'>

				{#each col as image, i}
					<div class='page' id='{image.id}' >
						<img src = '{image.url}' alt = 'image'>
						<h1> {image.name} </h1>
					</div>
				{/each}

			</div>

		{/each}

	</div>

{/await}

</section>

</div>



<style lang="scss">

	@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');

	h1{
		color: black;
	}

	#app{
		margin-left: 240px;
		height: 100vh;
		overflow-y: scroll;
	}

	:global(canvas){
		//border: 1px solid rgba(black, 0.1);
		width: 350px;
		height: 250px;
		border-radius: 5px;

		// box-shadow: 0px 0px 50px rgba(black, 0.04);
	}

	#title{
		font-size: 24px;
		font-weight: 700;
	}


	#pages{
		display: flex;
		//flex-wrap: wrap;
		gap: 20px;
		margin-top: 40px;

		.col{
			//width: 100%;
			//flex: 1;
			flex-grow: 1;
			//overflow-x: visible;

			//width: calc((100vw - 240px) / 6);
		}

		.page{

			max-width: 100%;
			background: white;
			padding: 5px;
			border-radius: 5px;

			padding-bottom: 10px;
			transition: 0.2s ease;

			margin: 20px 0;

            flex-grow: 0;
            height: fit-content;

			flex-shrink: 0;

			cursor: pointer;


            img{
                width: 350px;
				box-shadow: 0px 10px 40px rgba(black, 0.05);
				border: 1px solid rgba(black, 0.1);
				border-radius: 10px;
            }

			canvas{
				border-radius: 5px;
				cursor: pointer;
			}

			h1{
				width: calc((100vw - 400px) / 3);
				margin-top: 5px;
				margin-left: 5px;
				font-size: 12px;
				font-weight: 500;
				letter-spacing: -0.3px;
				overflow-wrap: break-word;
				word-wrap: break-word;
				color: rgba(black, 0.5);
			}

			&:hover{

				transform: translateY(-5px);
			}
		}
	}




	section{
		margin: 30px 30px;
	}




</style>