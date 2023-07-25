<div id = 'app'>
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