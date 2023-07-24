<div id = 'app'>
    <slot />
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
	}


</style>