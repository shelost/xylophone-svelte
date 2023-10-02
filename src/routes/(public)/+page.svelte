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

	<Navbar />


	<canvas id = 'canvas'></canvas>

	<div id = 'splash' in:fly={{duration: 500, y: 50}}>

		<div id = 'mast'>

			<div class = 'flex'>
				<img id = 'hero2' class = 'hero' src = '{Paine}' alt = 'Thomas Paine'>
				<img id = 'hero1' class = 'hero' src = '{Paine}' alt = 'Thomas Paine'>
				<img id = 'hero3' class = 'hero' src = '{Paine}' alt = 'Thomas Paine'>
			</div>


			<h1>
				Unlimited Webmaking.
			</h1>

			<p>
				No more borders or boxes — create pages the way <i> you </i> want them to!
			</p>

			<form id ='form' method='POST' action='https://script.google.com/macros/s/AKfycbwjjIXz1y8mAeGv0CTSawvyctFqITZ1nXTQjo318v8_Tp1Hjf4lq3RmqbOQmUAhKi7Q/exec'>
				<input id = 'email' name = 'Email' type = 'email' placeholder = 'your@email.com' required>
				<button id = 'submit' type = 'submit'> Reserve My Spot </button>
			</form>

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

	#banner{
		height: 40vw;
		width: 100vw;
		display: flex;
		align-items: center;
		position: relative;

		background-size: cover;
		background-position: center center;
	}

	.section_expo{
		text-align: center;
		padding: 80px 0 50px 0;
		h1{
			font-family: 'Inter', sans-serif;
			color: black !important;
			font-size: 44px;
			font-weight: 700;
			text-align: left;;
			letter-spacing: -2px;
			margin-bottom: 20px;
			margin-left: 40px;
			text-align: center;
		}
		h2{
			font-family: 'Inter', sans-serif;
			color: rgba(black, 0.5) !important;
			font-size: 18px;
			font-weight: 300;
			text-align: left;
			letter-spacing: -0.5px;
			margin-left: 40px;
			color: rgba(255,255,255,0.3);
			text-align: center;
		}

		&.single{
			padding: 200px 0 100px 0;
		}
	}

	.header{
		font-size: 24px;
		font-weight: 500;
		margin: 40px;
		text-align: center;
	}

	#phones{
		.flex{
			display: flex;
			justify-content: center;
			.phone{
				height: 100vh;
				flex-shrink: 0 !important;
			}

			#bubbles{
				position: relative;
				flex-shrink: 0 !important;
			}

			.bubble{
				position: absolute;
				height: 6vh;
				z-index: 3 !important;
				box-shadow: 0px 40px 50px rgba(#00106D, 0.1);
				border-radius: 100px;
				transform: translateY(--parallax-2);
			}

			#bubble1{
				top: 10vh;
				left: 2vh;
				transform: translateY(--parallax-1) !important;
			}

			#bubble2{
				top: 20vh;
				left: 40vh;
			}

			#bubble3{
				top: 56vh;
				left: 42vh;
				transform: scale(2);
			}

			#bubble4{
				top: 40vh;
				left: 0vh;
			}

			#bubble5{
				top: 60vh;
				left: 5vh;
			}

			#bubble6{
				top: 36vh;
				left: 38vh;
			}
		}
	}

	#banner h1{
		font-size: 60px;
		font-family: 'Newsreader', 'Libre Baskerville', sans-serif;
		font-weight: 600;
		letter-spacing: -2px;
		margin-top: 30px;
		width: 70%;
		line-height: 100%;
		text-align: left;
	}

	#mast{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: cover;

		h1{
			font-size: 100px;
		}

		p{
			font-size: 12px;
		}
	}

	.center{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
		margin-left: 50px;
	}

	.section{
		height: 100vh;
		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;

		&.white{
			background-color: white;
		}

		&.black{
			background-color: #202020;
		}

		&.scene{
			height: 96vh;
			width: 90vw;
			margin: auto;
			margin-bottom: 80px;
			padding: 0 50px;
			background-size: cover !important;
			background-attachment: fixed !important;
			background-position: center center !important;
			border-radius: 20px;

			.text{
				width: 80vw;
				margin: auto;
				padding-top: 100px;
				text-align: center;
				h1{
					font-family: 'Inter', sans-serif;
					font-size: 48px;
					letter-spacing: -1.2px;
					line-height: 120%;
					font-weight: 700;
					margin-bottom: 20px;
				}
			}
		}
	}

	#down{
		background: #ffce00;
		position: absolute;
		bottom: 30px;
		width: 250px;
		left: calc(50vw - 125px);
		z-index: 3;
		border-radius: 50px;
		animation: pill 0.6s ease-in-out infinite alternate-reverse;
		box-shadow: 0px 20px 50px rgba(0,0,0,0.1);
		transition: 0.2s ease;
		cursor: pointer;
	}

	#down:hover{
		background: #ffb700;
	}

	@keyframes pill{
		from{
			bottom: 30px;
		}
		to{
			bottom: 20px;
		}
	}

	#down h2{
		font-family: 'Inter', sans-serif !important;
		font-weight: 600;
		font-size: 16px;
		padding: 12px 20px;
		letter-spacing: -0.3px;
	}

	#footer{
		height: 240px;
		color: white;
		letter-spacing: -0.1px;
		font-weight: 300;
		font-size: 14px;
	}

	#form{
		display: flex;
		align-items: center;
		background: white;
		transition: 0.2s ease;
		padding: 5px;
		padding-left: 15px;
		border-radius: 100px;
		margin: 0;

		input{
			width: 300px;
			font-size: 15px;
			border-radius: 5px;
			outline: none;
			border: none;


			&:focus{
				outline: none;
				border: none;
			}
		}

		button{
			background: #FF004D;
			background: white;
			padding: 15px 25px;
			font-family: 'Inter', sans-serif;
			font-size: 16px;
			border-radius: 100px;
			letter-spacing: -0.3px;
			color: #FF004D;

			box-shadow: 0;

			&:hover{
				background: #fff3f6;
			}
		}
	}

	#submit{
		font-family: 'Inter', 'Libre Baskerville', sans-serif;
		font-size: 18px;
		font-weight: 600;
		padding: 12px 0;
	}

	.form_title{
		font-weight: 700;
		margin-bottom: 30px;
	}

	label{
		font-size: 14px;
		opacity: 0.4;
		margin-bottom: 5px;
	}




	.title{
		font-weight: 900;
		padding: 20px;
		font-size: 22px;
	}

	.note{
		padding: 25px;
		border-radius: 10px;
		margin: 30px;

		background: white;
		box-shadow: 0 20px 50px rgba(0,0,0,0.1);
		transition: 0.2s ease;

		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 20px;
	}

	.note:hover{
		transform: translateY(-5px);
	}

	.note_icon{
		width: 40px;
		height: 50px;
		border-radius: 5px;
		background-size: cover;
		background-position: center center;
	}

	.byline{
		display: flex;
		align-items: center;
		gap: 3px;

		color: rgba(0,0,0,0.4);
	}

	.byline p{
		font-size: 14px;
		font-weight: 300;
	}

	.byline .bold{
		font-weight: 700;
	}


	.note_title{
		font-weight: 600;
		font-size: 20px;
		margin-bottom: 5px;
	}

	#app{
		position: fixed;
		top: 0px;
		left: 0;
		width: 100vw;
		height: calc(100vh);
		background: white;
		overflow-y: scroll;
		overflow-x: hidden;
		//padding-bottom: 200px;
	}

	html{
		background: white;
		color: black;
	}


	/* Spaces */

	.section_expo{
		margin-bottom: 0px;
	}


	.section_title{
		font-size: 50px;
		font-weight: 800;
		letter-spacing: -1px;
	}

	.row{
		display: flex;
		justify-content: center;
		gap: 30px;
	}

	.space{
		width: 30vw;
		transition: 0.2s ease;
	}

	.s1{
		margin-top: 150px;
	}

	.s3{
		margin-top: 100px;
	}

	.space:hover{
		transform: scale(1.05);
	}

	#app{
		background: #ff004d;
		color: white;
	}

	/* Splash */

	@keyframes slide{
		from{
			opacity: 0;
			transform: translate(0, 200px) scale(0.7);
		}
		to{
			opacity: 1;
			transform: translate(0, var(--parallax-1));
		}
	}

	.split{
		width: 50vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}


	#splash img{
		height: 80vh;
		width: 45vh;
	}

	.white h1{
		color: white;

	}



	@keyframes float{
		from{
			transform: translateY(50px);
			opacity: 0;
		}
		to{
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes float_scale{
		from{
			transform: translateY(100px) scale(0.5);
			opacity: 0;
		}
		to{
			transform: translateY(0) scale(1);
			opacity: 1;
		}
	}


	#logo{
		height: 180px;
		border-radius: 10px;
		animation: float_scale 0.6s ease forwards;
	}

	.expo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-top: 50px;
		margin-bottom: 30px;
	}

	.expo h1 span{
		background: linear-gradient(to top left, #FD1490,#FC014D, #FF4733);
		-webkit-background-clip: text;
  		-webkit-text-fill-color: transparent;

		transform: scale(2);

	}

	.expo h1 {
		font-size: 80px;

		font-weight: 800;
		letter-spacing: -3px;
		color: black;
		margin-bottom: 10px;

		opacity: 0;
		animation: float 0.6s ease 0.1s forwards;
	}

	.section_expo h1{
		line-height: 110%;
	}

	.expo h2 {
		font-size: 22px;
		font-weight: 300;
		letter-spacing: -0.1px;
		color: black;
		margin-top: 40px;
		margin-bottom: 10px;

		opacity: 0;
		animation: float 0.6s ease 0.2s forwards;
	}

	.expo p{
		font-size: 18px;
		font-weight: 500;
		letter-spacing: -0.3px;
		color: rgba(black, 0.3);
	}

	#socials {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin-top: 30px;

		opacity: 0;
		animation: float 0.6s ease 0.25s forwards;
	}

	.icon {
		height: 32px;
	}




	/* Blog */

	.posts {
		display: grid;
		gap: var(--size-7);
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90vw;
	}

	#splash{
		display: none;
	}

	.post {
		width: 900px;
		max-inline-size: 90%;
		color: black;

		border-radius: 20px;
		background: white;

		padding: 20px;
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
	}

	.title {
		font-size: 22px;
		padding-left: 30px;
		font-weight: 500;
		letter-spacing: -0.3px;
		color: black;
		margin-top: 70px;
	}

	.date {
		font-size: 16px;
		color: var(--text-2);
	}

	.description {
		font-size: 16px;
		font-weight: 300;
		margin-top: var(--size-3);
	}

	@media screen and (max-width: 800px){

		#banner{
			height: 80vh !important;
			background-image: linear-gradient(to bottom left, #A1EEFF, #A1FFE9) !important;
		}


	:global(section){
		width: 38vw;
	}


		#banner h1{
			width: 100vw;
			font-size: 50px;
			line-height: 100%;
		}

		.center{
			align-items: center;
			margin: 0;
		}

		#splash{
			margin: 0;
			padding: 0 !important;
			display: flex;
			flex-direction: column-reverse !important;
			align-items: center !important;
			justify-content: center !important;
		}

		.section{
			.section_expo{
				width: 80vw;
				margin: auto;
				h1{
					font-size: 36px;
					margin: 0;
					margin-bottom: 24px;
					letter-spacing: -1.2px;
				}
				h2{
					font-size: 16px;
					margin: 0;
				}
			}
			&.scene{
				margin-bottom: 20px;
				background-attachment: local !important;
				.text{
					width: 100%;
					padding-top: 60px;
					line-height: 110%;
					h1{
						font-size: 32px;
					}
				}
			}
		}

		#form{
			width: 88vw;
			margin: auto;
		}


		#form{
			padding: 10px;
			display: flex;
			flex-direction: column;
		}

		#form button{
			margin-top: 10px;
			width: 100%;
		}

		#splash{
			gap: -50px !important;
		}

		.split{
			margin: 0 -10px;
		}

		.split img{
			width: 40vw !important;
			height: 70vw !important;
			margin: 0;
		}

		.split{
			transform: translateY(40px);
		}

		.split.white{
			transform: translateY(-60px);
		}

		.split h1{
			line-height: 110%;
			font-size: 24px !important;
		}

		.expo h1{
			margin-bottom: 0px !important;
			padding-bottom: 0px !important;
		}

		.expo h2{
			margin-top: 0px !important;
		}



	}


</style>
