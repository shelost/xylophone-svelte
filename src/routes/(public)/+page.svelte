<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { supabaseClient } from '$lib/db';
	import { fly } from 'svelte/transition'
	import Space from '$lib/components/Space.svelte'
	import bg from '$lib/img/background.svg'
	import icon from '$lib/img/favicon.png'

	import Navbar from '$lib/components/common/NavBar.svelte'
	import Gradient from '$lib/img/gradient.png'
	import Hero from '$lib/img/Hero.png'
	import Hero1 from '$lib/img/herox.svg'
	import Hero2 from '$lib/img/herox-1.svg'
	import Feature from '$lib/img/feature.png'
	import Collection from '$lib/img/collection.png'
	import Jagged from '$lib/img/jagged.svg'

	import Phone1 from '$lib/img/phone-1.svg'
	import Phone2 from '$lib/img/phone-2.svg'

	import Bubble1 from '$lib/img/bubble.svg'
	import Bubble2 from '$lib/img/bubble-1.svg'
	import Bubble3 from '$lib/img/bubble-2.svg'
	import Bubble4 from '$lib/img/bubble-3.svg'
	import Bubble5 from '$lib/img/bubble-4.svg'
	import Bubble6 from '$lib/img/bubble-5.svg'

	import Sherlock from '$lib/img/sherlock-x.png'
	import Pride from '$lib/img/pride-x.png'
	import Republic from '$lib/img/republic-x.png'
	import Montecristo from '$lib/img/montecristo-x.png'
	import Mobydick from '$lib/img/mobydick-x.png'


	// Create a Svelte store to hold the spaces data
	let spaces = writable([]);
	let notes = writable([]);


    // Fetch
	async function fetchNotes(){

		// Get notes
		const { data: n, error } = await supabaseClient
			.from('notes')
			.select('*')

		if (!error) {
			notes.set(n.reverse());

			// Get author
			for (let i=0; i<$notes.length; i++){
				let note = $notes[i]

				const {data : d, error: e} = await supabaseClient
						.from('profiles')
						.select('*')
						.eq('id', note.user_id)

				if (!error) {

				} else {
					console.error('Error fetching user_data:', error);
				}
			}

			// Get space
			for (let i=0; i<$notes.length; i++){
				let note = $notes[i]
				const {data : d, error: e} = await supabaseClient
						.from('spaces')
						.select('*')
						.eq('id', note.space_id)


				if (!e) {

					$notes[i].space = d[0].title;
					$notes[i].space_icon = d[0].icon;
				} else {
					console.error('Error fetching user_data:', e);
				}
			}

		} else {
			console.error('Error fetching user_data:', error);
		}
    }


	async function fetchSpaces(){
		const { data: fetchedSpaces, error } = await supabaseClient
											.from('spaces')
											.select('*')

		if (error) {
			console.error('Error fetching spaces:', error);
			return;
		}

		if (fetchedSpaces) {
			// Update the spaces store with the fetched data
			spaces.set(fetchedSpaces);
		}
	}

	onMount(()=>{
		fetchSpaces()

		fetchNotes()


		let ratio = 0

		let app = document.getElementById('app')

		let loop = () => {

			ratio = app.scrollTop / document.body.scrollHeight


			app.style.setProperty('--parallax-1', ratio * 0.6 * -160 + 'px')
			app.style.setProperty('--parallax-2', ratio * 3 * -160 + 'px')
			app.style.setProperty('--parallax-3', ratio * 1.6 * -160 + 150 + 'px')

			window.requestAnimationFrame(loop)
		}
		window.requestAnimationFrame(loop)
	})



</script>

<svelte:head>
	<title> Scrollable | Your Ultimate Reading App </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={icon} />
</svelte:head>


<div id = 'app' >

	<Navbar />

	<div id = 'splash' style='background-image: url({Jagged})' in:fly={{duration: 500, y: 50}}>

		<div id = 'mast'>

			<h1>
				Your Ultimate Reading App.
			</h1>

			<form id ='form' method='POST' action='https://script.google.com/macros/s/AKfycbwjjIXz1y8mAeGv0CTSawvyctFqITZ1nXTQjo318v8_Tp1Hjf4lq3RmqbOQmUAhKi7Q/exec'>
				<input id = 'email' name = 'Email' type = 'email' placeholder = 'your@email.com' required>
				<button id = 'submit' type = 'submit'> Reserve My Spot </button>
			</form>

		</div>

		<img id = 'hero' src = '{Hero}' alt = 'Hero Image'>
	</div>


	<div id = 'phones' class = 'section white'>

		<div class = 'section_expo'>
			<h1> A Better Way to Read. </h1>
			<h2> Reading should be delightful, wherever you go. </h2>
		</div>

		<div class = 'flex'>

			<img id = 'phone1' class = 'phone' src = '{Phone1}' alt = 'Phone Image'>

			<div id = 'bubbles'>
				<img id = 'bubble1' class = 'bubble' src = '{Bubble1}' alt = 'Bubble Image'>
				<img id = 'bubble2' class = 'bubble' src = '{Bubble2}' alt = 'Bubble Image'>
				<img id = 'bubble3' class = 'bubble' src = '{Bubble3}' alt = 'Bubble Image'>
				<img id = 'bubble4' class = 'bubble' src = '{Bubble4}' alt = 'Bubble Image'>
				<img id = 'bubble5' class = 'bubble' src = '{Bubble5}' alt = 'Bubble Image'>
				<img id = 'bubble6' class = 'bubble' src = '{Bubble6}' alt = 'Bubble Image'>

				<img id = 'phone2' class = 'phone' src = '{Phone2}' alt = 'Phone Image'>
			</div>
		</div>
	</div>





	<div class = 'section_expo single'>
	</div>


	<div id = 'sherlock' class = 'section scene' style='background-image: url({Sherlock})'>
		<div class = 'text'>
			<h1> You know my methods, Watson. </h1>
			<h2> The Adventures of Sherlock Holmes </h2>
		</div>
	</div>

	<div id = 'pride' class = 'section scene' style='background-image: url({Pride})'>
		<div class = 'text'>
			<h1> It is a truth universally acknowledged... </h1>
			<h2> Pride & Prejudice </h2>
		</div>
	</div>

	<div id = 'republic' class = 'section scene' style='background-image: url({Republic})'>
		<div class = 'text'>
			<h1> I am the wisest man alive, for I know one thing, and that is that I know nothing.  </h1>
			<h2> The Republic </h2>
		</div>
	</div>

	<div id = 'montecristo' class = 'section scene' style='background-image: url({Montecristo})'>
		<div class = 'text'>
			<h1> How did I escape? With difficulty. How did I plan this moment? With pleasure. </h1>
			<h2> The Count of Monte Cristo </h2>
		</div>
	</div>

	<div id = 'mobydick' class = 'section scene' style='background-image: url({Mobydick})'>
		<div class = 'text'>
			<h1> Call me Ishmael.  </h1>
			<h2> Moby Dick </h2>
		</div>
	</div>



	<h3 class = 'header'  in:fly="{{ y: 200, duration: 500, delay: 200 }}"> Recent Releases <h3>

	<div class = 'section'  in:fly="{{ y: 200, duration: 500, delay: 200 }}">
		<div id = 'spaces'>
			{#each $spaces as space}
				<Space {space} page={true} text={false}/>
			{/each}
		</div>
	</div>


	<div id = 'footer'>

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
			font-family: 'Newsreader', sans-serif;
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
		color: white;
		margin: 40px;
		text-align: center;
	}

	#phones{
		padding-bottom: 100px;
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
					font-family: 'Newsreader', sans-serif;
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

	#form{
		display: flex;
		align-items: center;
		background: white;
		transition: 0.2s ease;
		padding: 10px;
		border-radius: 10px;
		margin: 0;
	}

	#mast h1{
		font-weight: 600;
		letter-spacing: -0.5px;
		margin-bottom: 20px;
		font-size: 100px;
		color: white;
	}

	#submit{
		font-family: 'Newsreader', 'Libre Baskerville', sans-serif;
		font-size: 18px;
		font-weight: 600;
		padding: 12px 0;
	}


	#form button{
		background: black;
		padding: 10px 20px;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
	}

	#form button:hover{
		background: #202020;
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

	input{
		width: 300px;
		font-size: 14px;
		border-radius: 5px;
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

	#spaces{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 30px;
		padding: 30px;
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
		padding-bottom: 200px;
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

	/* Splash */
	#splash {
		margin: 0;
		width: 100vw;
		height: calc(100vh - 60px);
		background-size: cover;
		background-position: center center;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 60px;

		#hero{
			width: 68vw !important;
			height: 44vw !important;
			transform: translate(-230px, var(--parallax-1));
			margin-right: -28vw;
			margin-top: 60px;

			animation: slide 0.6s ease;
		}

		#mast{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 50px;
			width: 40vw;
			h1{
				font-size: 6vw !important;
				line-height: 100%;
				letter-spacing: -2px;
				margin-bottom: 50px;
				text-align: flex-start;
				font-family: 'Newsreader', sans-serif;
			}
		}

	}

	@keyframes slide{
		from{
			opacity: 0;
			transform: translate(-200px, 200px) scale(0.7);
		}
		to{
			opacity: 1;
			transform: translate(-200px, var(--parallax-1));
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
		padding-bottom: var(--size-7);
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

		#mast h1{
			font-size: 38px !important;
			font-weight: 500;
			text-align: center;
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
