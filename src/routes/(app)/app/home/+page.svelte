<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { readable, writable } from 'svelte/store';
    import type { PageData, Task } from '../../routes/$types';
	import {fly} from 'svelte/transition'
	import {fabric} from 'fabric'
	import icon from '$lib/img/favicon.svg'
	import ThreeDotMenu from '$lib/components/ThreeDotMenu.svelte';
  	import Modal from '$lib/components/Modal.svelte';
	import Banner from '$lib/img/banner.svg'
    export let data: PageData;
    let user = {}; // Define the 'user' variable to store data about the active user
    let userData = {};
	let books = []
	let loading = true

	import {canvasElements, allPages, users} from '$lib/utils/store.js'


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

			obj.scaleX *= scaleX
			obj.scaleY *= scaleX
			obj.left *= scaleX
			obj.top *= scaleX

			if (obj.xPercent !== undefined) {
                const newLeftPos = canvas.width/2 + obj.xPercent * canvas.width - (obj.width * obj.scaleX) / 2;
                obj.set('left', newLeftPos);
            }

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

				object.set({
					selectable: false
				})
			});



		} catch (parseError) {
			console.error('Error parsing the blob data:', parseError);
		}
	}



	let userInfo = {}


	function setPages(){


		for (let i=0; i<$allPages.length; i++){
			let page = $allPages[i];

			let canvas = new fabric.Canvas(Id(`canvas-${page.id}`), {
				width: 260,
				height: 220,
				renderOnAddRemove: false
			});


			page.user = userInfo[page.user_id]

			if (page.content){
				loadCanvas(page, canvas);
			}

			setTimeout(() => {
                if (page.content){
                    loadCanvas(page, canvas);
                }
            }, 1000);
		}
	}


	onMount(() => {

		Id('app').style.background = 'white'

		for (let i=0; i<$users.length; i++){
			userInfo[$users[i].id] = $users[i]
		}

		setPages()

		setTimeout(setPages, 1000);
	});



</script>


<div id = 'app' in:fly={{ y: 50, duration: 300}} out:fly={{ y:-50, duration: 300 }}>

	<section>


	<div id = 'banner' style = 'background-image: url({Banner})'>
		<div id = 'expo'>
			<h1> Introducing Arachne </h1>
			<p> An all-new way to create web experiences. </p>
			<a href = '/about'>
				<button>
					Read Our Manifesto
				</button>
			</a>
		</div>
	</div>

{#await $allPages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages'>

		{#each $allPages as page, i}

			{#if page.content}

				<div class='page' id='{page.id}' in:fly={{ y: 50, duration: 300, delay: 200+50*i}}>
					<a href='/app/page/{page.id}'>
						<div class = 'container' style='background: {page.color}'>
							<canvas id='canvas-{page.id}' class='canvas'></canvas>
							<div class = 'gradient'></div>
						</div>
					</a>

					<div class = 'expo'>
						<div class = 'title'>
							<h1> {page.title} </h1>
							<h2> Page </h2>
						</div>


						<ThreeDotMenu options={[
							{
							  label: 'Delete',
							  action: () => deleteModalActive = true
							},
							{
							  label: 'Preview',
							  action: () => window.open(`/p/${page.id}`, '_blank')
							}
						  ]} />
					</div>


					{#if page.user}
					<div class = 'user'>
						<img src = {page.user.pfp} >
						<p> {page.user.full_name} </p>
					</div>
					{/if}
				</div>

			{/if}
		{/each}


	</div>

{/await}

</section>

</div>


<svelte:head>
	<title> Arachne | Build Your Perfect Web </title>
	<meta name="description" content="Arachne is a different kind of dev." />
	<link rel ='icon' href='{icon}'>
</svelte:head>


<style lang="scss">

	@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');



	::-webkit-scrollbar{
		width: 5px;
		background: rgna(#ff004d, 0.5);
	}

	::-webkit-scrollbar-track{
		background: rgna(#ff004d, 0.5);
	}


	::-webkit-scrollbar-thumb{
		background: #ff004d;
	}



	#banner{
		height: 450px;
		width: 99%;

		margin: 5px;
		margin-top: 20px;
		background-image: linear-gradient(to bottom left, #4f001f, black);

		background: #e9e9e9;
		border-radius: 10px;

		display: flex;
		align-items: center;
		background-size: cover;
		background-position: center center;

		box-shadow: 0 10px 30px rgba(black, 0.1);

		#expo{
			width: 700px;
			line-height: 1.1;
			padding: 20px;
			padding-left: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			margin: auto;
			h1{
				font-size: 36px;
				font-weight: 700;
				color: black;
				margin-bottom: 15px;
				letter-spacing: -0.8px;

			}
			p{
				font-size: 24px;
				font-weight: 600;
				color: rgba(black, 0.3);
				letter-spacing: -0.3px;
			}
			button{
				background: #ff004d;
				color: white;
				box-shadow: none;
				font-size: 14px !important;
				font-weight: 600;
				padding: 15px 20px;
				margin-top: 30px;
				transition: 0.2s ease;

				box-shadow: 0px 20px 50px rgba(#FF004D, 0.5);

				&:hover{
					transform: scale(1.03);
				}
			}
		}
	}

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
		height: 300px;
		border-radius: 5px;

		// box-shadow: 0px 0px 50px rgba(black, 0.04);
	}

	#title{
		font-size: 24px;
		font-weight: 700;
	}


	#pages{
		display: flex;
		flex-wrap: wrap;
		gap: 25px;
		margin-top: 40px;


		.page{

			background: white;
			padding: 5px;

			//box-shadow: 0px 0px 50px rgba(black, 0.08);
			padding-bottom: 10px;
			transition: 0.2s ease;


			cursor: pointer;

			.user{
				display: flex;
				align-items: center;
				padding: 6px 12px 6px 8px;
				gap: 8px;
				margin: 2px;
				margin-top: 12px;
				background: rgba(black, 0.05);
				width: fit-content;
				border-radius: 10px;


				img{
					height: 15px;
					border-radius: 20px;
				}
				p{
					font-size: 12px;
					font-weight: 500;
					letter-spacing: -0.3px;
					color: rgba(black, 0.8);
				}
			}

			.container{
				border-radius: 8px;
				background-image: linear-gradient(to bottom right, rgba(white, 0.9), rgba(white, 0.5)) !important;
				box-shadow: -10px 15px 20px rgba(black, 0.05);
				transition: 0.2s ease;
				position: relative;

				border: 1px solid white;
				overflow: hidden;


				.gradient{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 50%;
					z-index: 3;
					//background-image: linear-gradient(190deg, rgba(white, 0.5), rgba(white, 0), rgba(white, 0));
				}

				&:hover{

					canvas{
						transform: scale(1.1);
					}

				}


			}

			canvas{
				transition: 0.2s ease;

				cursor: pointer !important;
				&:hover{
					//transform: scale(1.05) !important;
				}
			}

			.expo{
				display: flex;
				justify-content: space-between;
				width: 100%;

				.title{
					h1{
						margin-top: 10px;
						margin-left: 2px;
						font-size: 14px;
						font-weight: 600;
						letter-spacing: -0.2px;
						font-family: Onest, Inter, sans-serif;
					}

					h2{
						margin-top: 2px;
						margin-left: 2.2px;
						font-size: 12px;
						font-weight: 500;
						letter-spacing: -0.2px;
						font-family: Onest, Inter, sans-serif;
						color: rgba(black, 0.4);
					}
				}
			}



		}
	}




	section{
		margin: 15px 10px;
		font-family: Onest, Inter, sans-serif;
	}




</style>