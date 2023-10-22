<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { supabaseClient } from '$lib/db';
	import { fly } from 'svelte/transition'
	import { fabric } from 'fabric'
	import Space from '$lib/components/Space.svelte'
	import bg from '$lib/img/background.svg'
	import icon from '$lib/img/x.svg'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Paine from '$lib/img/paine.png'
	import Arachne from '$lib/img/favicon.svg'


	export let data




	onMount(()=>{

		let canvas = new fabric.Canvas('canvas', {
			width: window.innerWidth,
			height: window.innerHeight,
			renderOnAddRemove: false,
		})


		function applyParallaxEffect() {
    let scrollAmount = document.getElementById('app').scrollTop;

    canvas.forEachObject(object => {
        // Assuming default depth is 0 if not specified
        let depth = object.depth || 0;

        // Calculate the parallax shift using logarithmic adjustment
        let parallaxShift = 0.15 * depth * scrollAmount;

        // Depth 0 objects should move with the canvas, so we subtract the scroll amount
        let newTopPosition = object.originalTop + parallaxShift

        // Set the new top position for the object
        if (newTopPosition > 0){
            object.set('top', newTopPosition);
        }
    });

    canvas.renderAll(); // Refresh the canvas to reflect the changes
    canvas.calcOffset();
}

    // Listen for the scroll event on the #app element
   document.getElementById('app').addEventListener('scroll', applyParallaxEffect);


		const loadCanvasFromSupabase = async () => {
			if (!data.content) {
				return;
			}

			// Ensure that the user has an active session
			const session = data.session;

			if (!session) {
				return;
			}
			// Use the session's access token in headers for authorization
			const headers = {
				'Authorization': `Bearer ${session.access_token}`
			};

			const { data: fileData, error } = await supabaseClient.storage.from('fabric')
				.download(data.content, { headers });  // Provide headers as options

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

				// Load the parsed data into the canvas
				canvas.loadFromJSON(fileJson, () => {
					const canvasCenterX = canvas.width / 2;

					canvas.getObjects().forEach((object) => {
						if (object.xPercent !== undefined) {
							const newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;
							object.set('left', newLeftPos);
						}

						if (object.type == 'textbox'){
        					object.set('charSpacing', object.charSpacing || 0); // Use the object's charSpacing or default to 0
							console.log('yo')
						}

						object.set({
							borderColor: 'white',
							cornerColor: '#FF004D',
							cornerSize: 10,
							borderScaleFactor: 1.5,
							cornerStrokeColor: 'white',
							cornerStyle: 'circle',
							transparentCorners: false
						});
					});

					canvas.setHeight(data.height);
					canvas.setBackgroundColor(data.color);
					canvas.renderAll();
				});

			} catch (parseError) {
				console.error('Error parsing the blob data:', parseError);
			}
		};




		loadCanvasFromSupabase()


		window.addEventListener('resize', unifiedResize);
    let previousCanvasWidth = window.innerWidth;

    function unifiedResize() {

		const previousWidth = previousCanvasWidth;
		const newWidth = window.innerWidth
		const canvasCenterX = newWidth / 2;

		// Set canvas width to the new value
		canvas.setWidth(newWidth);


		// Update position of each object based on xPercent and new canvas width
		canvas.getObjects().forEach((object) => {

			let newLeftPos

			if (!object.pin){
				object.pin = 'center'
			}

			console.log(newWidth)

			switch (object.pin) {
				case 'scale':
					newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;
					break;
				case 'left':
					newLeftPos = object.left;
					break;
				case 'right':
					const distanceFromRight = previousWidth - (object.left + object.width * object.scaleX);
					newLeftPos = newWidth - distanceFromRight - object.width * object.scaleX;

					break;
				case 'center':
					const originalCenterDistance = object.left - previousWidth / 2;
					newLeftPos = canvasCenterX + originalCenterDistance;
					break;
				default:
					newLeftPos = object.left;
					break;
			}

			object.left = newLeftPos;
			object.setCoords();
		});

		previousCanvasWidth = newWidth;

		canvas.renderAll();
		canvas.calcOffset();
	}



	})







</script>


<div id = 'app' >


	<!--
	<canvas id = 'canvas'></canvas>
	-->

	<div id = 'splash' >

		<div id = 'mast'>

			<img src = {Arachne} alt = 'logo' in:fly={{duration: 500, y: 50, delay: 0 }}>

			<h1 in:fly={{duration: 500, y: 50, delay: 100 }}>
				Your All·in·One Creative Software
			</h1>


			<form in:fly={{duration: 500, y: 50, delay: 200 }} id ='form' method='POST' action='https://script.google.com/macros/s/AKfycbwjjIXz1y8mAeGv0CTSawvyctFqITZ1nXTQjo318v8_Tp1Hjf4lq3RmqbOQmUAhKi7Q/exec'>
				<input id = 'email' name = 'Email' type = 'email' placeholder = 'your@email.com' required>
				<button id = 'submit' type = 'submit'> Reserve My Spot </button>
			</form>


			<p in:fly={{duration: 500, y: 50, delay: 300 }}> Coming 2024 </p>


		</div>
	</div>


	<div id = 'footer'>

		<h2> This is the footer. </h2>

		<div id = 'socials'>

			<a href = ''>
				<img src = ''>
			</a>

			<a href = ''>
				<img src = ''>
			</a>

			<a href = ''>
				<img src = ''>
			</a>

			<a href = ''>
				<img src = ''>
			</a>

		</div>
	</div>

</div>

<style lang="scss">

	@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');

	#app{
		--parallax-1: 0;
		--parallax-2: 0;
		--parallax-3: 0;
		color: black !important;
		position: relative;
	}

	#canvas{
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		margin-top: -60px;

	}

	#app{
		background: #ff004d;
		min-height: 100vh;
		width: 100vw;
	}

	#splash{
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}


	#mast{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: cover;

		width: 800px;
		max-width: 100vw;
		margin: auto;

		img{
			height: 240px;
			box-shadow: -20px 30px 60px rgba(black, 0.15), 15px -15px 30px rgba(white, 0.08);
			border-radius: 15px;
		}

		h1{
			font-size: 80px;
			font-weight: 900;
			color: white;
			letter-spacing: -1.2px;
			line-height: 100%;
			margin-top: 40px;
			text-align: center;
			text-shadow: -20px 20px 40px rgba(black, 0.3), 5px -5px 15px rgba(white, 0.3);
		}

		h2{
			font-size: 18px;
			font-weight: 300;
			text-align: center;
			letter-spacing: 0.1px;
			line-height: 110%;
			color: rgba(white, 0.5);
			margin-top: 30px;
		}

		p{
			color: #ffdf5d;
			font-size: 16px;
			font-weight: 400;
			letter-spacing: -0.1px;
			margin-top: 40px;
		}
	}



	#form{
		display: flex;
		margin-top: 50px;
		border-radius: 100px;
		box-shadow: -20px 20px 40px rgba(black, 0.2), 5px -5px 15px rgba(white, 0.2), inset 10px 10px 20px rgba(black, 1);
		input{
			background: rgba(white, 1) !important;
			border-radius: 10px;
			font-size: 14px;
			font-weight: 500;
			padding: 0 20px;
			width: 250px;
			margin-right: -50px;
		}
		button{
			background: #ffce00;
			border-radius: 10px;
			color: black;
			font-size: 14px !important;
			font-weight: 600;
			letter-spacing: -0.2px;
			padding: 14px 20px;
		}
	}


	@media screen and (max-width: 800px){

		#mast{
			width: 95vw;
			h1{
				font-size: 48px;
				letter-spacing: -0.5px;
			}
		}
	}



</style>
