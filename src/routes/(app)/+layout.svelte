<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import Navbar from '$lib/components/common/NavBar.svelte'
	import Scrollable from '$lib/img/scrollable.svg'
	export let data
</script>

{#key data.pathname}

<div id = 'navbar'>

	<div id = 'top'>

		<a href = '/home'>
			<img src = '{Scrollable}' alt = 'Scrollable Logo' id = 'logo'>
		</a>

		<a href = '/home'>
			<div class = 'text-btn' id = 'home'>
				<div class = 'icon'>
				</div>
				<h2> Home </h2>
			</div>
		</a>

		<a href = '/shop' id = 'shop'>
			<div class = 'text-btn'>
				<div class = 'icon'>
				</div>
				<h2> Shop </h2>
			</div>
		</a>

		<a href = '/create' id = 'create'>
			<div class = 'text-btn'>
				<div class = 'icon'>
				</div>
				<h2> Create </h2>
			</div>
		</a>

		<h1 class = 'title'> Reading </h1>

		<div id = 'books'>

			<a href = '/p/space/meditations'>
				<div class = 'text-btn'>
					<div class = 'icon'>
					</div>
					<h2> Meditations </h2>
				</div>
			</a>
		</div>

	</div>
  </div>

	<div id = 'app'
	  in:fade={{ easing: cubicOut, duration: 300, delay: 400 }}
	  out:fade={{ easing: cubicIn, duration: 300 }}
	>
	  <slot />
	</div>
  {/key}

<style>

	#logo{
		width: 100px;
		margin: 20px 10px;
	}

	.title{
		font-weight: 600;
		margin: 15px;
	}

	.text-btn{
		background: white;
		margin: 5px;
		padding: 10px 15px;
		border-radius: 5px;
		font-size: 14px;
		letter-spacing: -0.3px;
		transition: 0.2s ease;
	}

	.text-btn:hover{
		background: rgba(255,255,255,0.7);
	}


#navbar{
	position: fixed !important;
	top: 0;
	left: 0;
	width: 240px;
	height: 100vh;
	z-index: 5 !important;
	background: #f0f0f0;
}


#app{
	position: fixed;
	top: 0;
	left: 240px;
	width: calc(100vw - 240px) !important;
	height: 100vh;
	overflow-y: scroll;
	background: white;
}


</style>