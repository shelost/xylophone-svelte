<script>

	import {onMount} from 'svelte'

</script>

<svelte:head>
	<title> Amateur </title>
</svelte:head>


<div id = 'app'>
	<div id="splash" class="section center">

		<img id = 'logo' src = 'Amateur.png' alt = 'logo'>

		<div class="expo">
			<h1> Your <span> Final </span> Productivity App. </h1>
			<h2> Amateur works the way your mind does. </h2>


			<div id="socials">
				<a href="https://twitter.com/peyostudio">
					<img src="twitter.svg" class="icon" alt="icon" />
				</a>
				<a href="https://linkedin.com/in/peyostudio">
					<img src="linkedin.svg" class="icon" alt="icon" />
				</a>
				<a href="https://medium.com/@peyostudio">
					<img src="medium.svg" class="icon" alt="icon" />
				</a>
				<a href="https://instagram.com/peyostudio">
					<img src="instagram.svg" class="icon" alt="icon" />
				</a>
			</div>
		</div>

	</div>

	<div class = 'section'>

		<div class = 'section_expo'>
			<h1 class = 'section_title'> Organize your mind into Spaces </h1>
		</div>

		<div class = 'row'>

			<img class = 'space s1' src = 'space.svg' alt = 'space'>
			<img class = 'space s2' src = 'space-1.svg' alt = 'space'>
			<img class = 'space s3' src = 'space-2.svg' alt = 'space'>
		</div>
	</div>
</div>

<style>


	#app{
		position: fixed;
		top: 60px;
		left: 0;
		width: 100vw;
		height: calc(100vh - 60px);
		background: white;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 100px;
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
		background: white;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		font-size: 40px;
		font-weight: 400;
		text-transform: capitalize;
		color: black;
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
</style>
