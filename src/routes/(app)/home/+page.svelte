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

	import {canvasElements, allPages} from '$lib/utils/store.js'


	let newCanvas;

	function addCanvas(canvas) {
    canvasElements.update(allCanvases => {
        allCanvases.push(canvas);

        return allCanvases;
    });
}



	function Class(id){
		return document.getElementsByClassName(id)
	}

	function Id(id){
		return document.getElementById(id)
	}

	let initialCanvasWidth = window.innerWidth
	let initialCanvasHeight = window.innerHeight



	$: if ($allPages.length && $canvasElements.length === $allPages.length) {
		$allPages.forEach((page, i) => {
			initializeCanvas(page, i);
		});
	}


	let initializedCanvasCount = 0;  // New variable to keep track of initialized canvases

    onMount(async () => {
        const { data: pagesData, error } = await supabaseClient.from('pages').select('*');
        if (error) {
            console.error('Error fetching pages:', error);
            return;
        }

        allPages.set(pagesData);

        // Use an interval to initialize canvases sequentially
        const intervalId = setInterval(() => {
            if (initializedCanvasCount < pagesData.length) {
                initializeCanvas(pagesData[initializedCanvasCount], initializedCanvasCount);
                initializedCanvasCount++;
            } else {
                clearInterval(intervalId);  // Clear the interval when done
            }
        }, 2000);  // 2 seconds interval
    });



function initializeCanvas(page, index) {
    let canvases;
    canvasElements.subscribe(value => {
        canvases = value;
    });


    if (canvases[index]) {
        let canvas = new fabric.Canvas(canvases[index], {
            width: 300,
            height: 200,

        });

		let rect = new fabric.Rect({top:0,left:0,width:20,height:20,fill:'black'})

		canvas.add(rect)

		canvas.renderAll()


        canvas.setBackgroundColor(page.color, () => {canvas.renderAll(); canvas.calcOffset()});





        if (page.content) {

			canvas.add(new fabric.Rect({x:0,y:0,width:20,height:20,fill:'black'}))

            canvas.loadFromJSON(JSON.parse(page.content), () => {
				//canvas.setBackgroundColor('black')
				canvas.renderAll();
            	canvas.calcOffset();

                try {
                    //resize(canvas);
                    canvas.renderAll();
                    canvas.calcOffset();
                } catch (error) {
                    console.error('Error rendering canvas:', error);
                }
            });
        }
    }
}



function resize(canvas) {
    const newWidth = window.innerWidth < 800 ? window.innerWidth : 250;
    const scaleX = newWidth / initialCanvasWidth;
    canvas.forEachObject((object) => {
        object.left *= scaleX;
        object.scaleX *= scaleX;
        object.top *= scaleX;
        object.scaleY *= scaleX;
        object.setCoords();
    });

    canvas.setWidth(newWidth);
    canvas.setHeight(initialCanvasHeight * scaleX);
    canvas.renderAll();
    canvas.calcOffset();
}


function handleCanvasCreation(node) {
    addCanvas(node);
    return {
        destroy() {
            // Cleanup if necessary
        }
    };
}


</script>



<div id = 'app'>

	<section>
	<h1 id = 'title'> Home </h1>

{#await $allPages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages'>

		{#each $allPages as page, i}
			<a href='/p/{page.id}'>
				<div class='page' id='{page.id}' in:fly={{ y: 50, duration: 300, delay: 100*i }} out:fly={{ x: 200, duration: 300 }}>
					<canvas use:handleCanvasCreation id='canvas-{page.id}' class='canvas'></canvas>
					<h1> {page.title} </h1>
				</div>
			</a>
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
		background: white;
		border-radius: 5px;

		box-shadow: 0px 0px 50px rgba(black, 0.04);
	}


	#pages{
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		margin-top: 40px;

		.page{



			canvas{
				border-radius: 5px;
			}

			h1{
				margin-top: 10px;
				font-size: 13px;
				font-weight: 400;
				letter-spacing: -0.3px;
			}
		}
	}




	section{
		margin: 30px 30px;
	}




</style>