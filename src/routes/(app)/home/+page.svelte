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
	let pages = writable([])
	let books = []
	let loading = true


	function Class(id){
		return document.getElementsByClassName(id)
	}

	function Id(id){
		return document.getElementById(id)
	}

	let initialCanvasWidth = window.innerWidth - 300
	let initialCanvasHeight = window.innerHeight

	onMount(()=> {


		async function fetchPages(){
		// Fetch the user_data from the database for the logged-in user's ID
		const { data : k, error: e} = await supabaseClient
            .from('pages') // Update the table name to 'profiles'
            .select('*') // Fetch all columns for the active user
        if (!e) {
            pages.set(k)

			for (let i=0; i<$pages.length; i++){
				let page = $pages[i]

				setTimeout(()=> {

					let canvas = new fabric.Canvas(`canvas-${page.id}`, {
						width: 300,
						height: 200,
						renderOnAddRemove: false,
					});


					setTimeout(() => {

						canvas.loadFromJSON(page.content, () => {

						try {
							let newWidth = 400;

							if (window.innerWidth < 800){
								newWidth = window.innerWidth
								console.log(newWidth)
							}
							const scaleX = newWidth / initialCanvasWidth;

							// Scale each object
							canvas.forEachObject((object) => {
								object.left *= scaleX;
								object.scaleX *= scaleX;
								object.top *= scaleX;
								object.scaleY *= scaleX;
								object.setCoords();
							});

							// Update canvas dimensions
							canvas.setWidth(newWidth);
							canvas.setHeight(initialCanvasHeight * scaleX);
							canvas.renderAll();
							canvas.calcOffset()

						} catch (error) {
							console.error('Error in canvas callback:', error);
						}

						}, function (o, object){
							object.set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
							});
						});

					}, 1000);
				},3000)
			}
        } else {
            console.error('Error fetching pages:', e);
        }
	}

	fetchPages()

		function resize(){
			let newWidth = 300;

			if (window.innerWidth < 800){
				newWidth = window.innerWidth
				console.log(newWidth)
			}
			const scaleX = newWidth / initialCanvasWidth;

			// Scale each object
			canvas.forEachObject((object) => {
				object.left *= scaleX;
				object.scaleX *= scaleX;
				object.top *= scaleX;
				object.scaleY *= scaleX;
				object.setCoords();
			});

			// Update canvas dimensions
			canvas.setWidth(newWidth);
			canvas.setHeight(initialCanvasHeight * scaleX);
			canvas.renderAll();
			canvas.calcOffset()

			// Update initial dimensions
			initialCanvasWidth = newWidth;
			initialCanvasHeight = canvas.getHeight();
		}


		setTimeout(() => {

			$: for (let i=0; i<$pages.length; i++){
				let page = $pages[i]

				console.log('yo')

				let canvas = new fabric.Canvas(`canvas-${page.id}`, {
					width: 400,
					height: 300,
					renderOnAddRemove: false,
				});

				canvas.loadFromJSON(page.content, () => {


					console.log(page.content)

					try {
						//resize();

						canvas.renderAll();
						canvas.requestRenderAll()
						canvas.calcOffset();
						console.log('drawed');
					} catch (error) {
						console.error('Error in canvas callback:', error);
					}

					}, function (o, object){

				});
			}

		}, 500);

	}
	)


</script>



<div id = 'app'>

	<section>
	<h1 id = 'title'> Home </h1>

{#await $pages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages'>

		{#each $pages as page, i}

			<div class = 'page' id = '{page.id}' in:fly={{ y: 50, duration: 300, delay: 100*i }}
			out:fly={{ x: 200, duration: 300 }}>
				<canvas id = 'canvas-{page.id}' class = 'canvas'></canvas>
				<h1> {page.title} </h1>
			</div>

		{/each}

	</div>

{/await}

</section>

</div>



<style>

	@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');

	h1{
		color: black;
	}

	:global(canvas){
		border: 1px solid rgba(black, 0.2);
		width: 400px;
		height: 250px;
		background: white;
	}


	#pages{
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
	}

	#app{
		margin-left: 240px;
	}

	#loading{
		background: red;
	}

	#title{
		font-family: 'Inter', 'Newsreader', sans-serif;
		letter-spacing: -0.7px;
		font-size: 28px;
	}

	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid black;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

    #spaces{
        display: flex;
        flex-wrap: wrap;
        gap: 30px 30px;
        justify-content: flex-start;
        align-items: flex-start;
        padding-bottom: 100px !important;
    }

	section{
		margin: 30px 30px;
	}

	.profile{
		border: 1px solid black;
		text-align: left;
		padding: 15px;
	}

	.profile h1{
		font-size: 16px;
		font-weight: 700;
		margin: 0;
		text-align: left;
	}

	.profile h2{
		font-size: 14px;
		font-weight: 400;
		margin: 0;
		text-align: left;
	}

	section h1{
		font-size: 24px;
		font-weight: 600;
		text-align: left;
		margin: 0;
		margin-bottom: 30px;
	}

	:global(#todo){
		width: 300px;
		height: 85vh;
		margin-top: 20px;
		margin-left: 30px;
		overflow-y: scroll;
		overflow-x: hidden;
		border: 4px solid white;
		box-shadow: 0px 20px 80px rgba(0,0,0,0.2);
	}

	:global(#spaces){

	}

</style>