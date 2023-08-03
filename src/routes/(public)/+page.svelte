<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { supabaseClient } from '$lib/db';
	import Space from '$lib/components/Space.svelte'
	import bg from '$lib/img/background.svg'
	import icon from '$lib/img/favicon.png'

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

				console.log(note)

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
		console.log($spaces)
	}

	onMount(()=>{
		fetchSpaces()

		fetchNotes()
	})

</script>



<svelte:head>
	<title> Scrollable </title>
	<link rel="icon" href={icon} />
</svelte:head>


<div id = 'app'>


	<div id = 'splash' style ='background-image: url({bg});'>

		<div class = 'split white'>
		  <h1> Why read like this... </h1>
		  <img src = 'phone.svg' alt = 'phone'>
		</div>

		<div class = 'split'>
		  <h1> ... when you can read like this? </h1>
		  <img src = 'phone-1.svg' alt = 'phone'>
		</div>

	</div>


	<div class = 'section_expo'>
		<h1> Read the Classics </h1>
		<h2> Now in Scrollable form. </h2>
	</div>


	<div class = 'section'>
		<div id = 'spaces'>
			{#each $spaces as space}
				<Space {space} page={true} />
			{/each}
		</div>
	</div>

</div>

<style>

@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');


	h1{
		font-family: 'Newsreader', 'Libre Baskerville', sans-serif;
		font-size: 50px;
		font-weight: 600;
		text-align: center;
		letter-spacing: -2px;
		margin-bottom: 20px;
	}

	h2{
		font-family: 'Libre Baskerville', sans-serif;
		font-size: 18px;
		font-weight: 300;
		text-align: center;
		letter-spacing: -1px;
	}

	.section_expo{
		text-align: center;
		padding: 80px 0 50px 0;
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
		gap: 130px 30px;
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
		height: 100vh;

		background-size: cover;
		background-position: center center;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.split{
		width: 50vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	#splash h1{
		font-size: 32px;
		letter-spacing: -0.8px;
		margin: 0;
		padding: 15px;
		margin-top: 70px;
	}

	#splash img{
		height: 70vh;
		width: 40vh;
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
