<script lang="ts">
	import { fade } from 'svelte/transition'
	import { cubicIn, cubicOut } from 'svelte/easing'

	export let data
  </script>


  {#key data.pathname}
	<div id = 'app'
	  in:fade={{ easing: cubicOut, duration: 300, delay: 400 }}
	  out:fade={{ easing: cubicIn, duration: 300 }}
	>
	  <slot />
	</div>
  {/key}

<style>

    #app{
		position: fixed;
		top: 60px;
		left: 0;
		width: 100vw;
		height: calc(100vh -100px);
		overflow-y: scroll;
        z-index: 4;
	}


</style>