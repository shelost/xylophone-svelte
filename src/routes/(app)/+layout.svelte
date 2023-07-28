<script lang="ts">
	import { fly } from 'svelte/transition'
</script>


<div id = 'app' in:fly={{ x: -200, duration: 300, delay: 300 }}
out:fly={{ x: 200, duration: 300 }}>

    <slot />
</div>

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