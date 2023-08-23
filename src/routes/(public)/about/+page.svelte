<script>
    import Navbar from '$lib/components/common/NavBar.svelte'
    import AnimatedElement from '$lib/components/AnimatedElement.svelte'

    let OPTIONS = {
        justify: 'center',
        font_size: 16,
        spacing: 20,
        speed: 1,
        simplify: 0
    }

    let scrolling = false

    let texts = [
        `Humans been reading for a long time.`,
        `Like, a really long time.`,
        `Like, a rreally long time.`,
        `Like, a rreallry long time.`,
        `Like, a really long time.`,
        `Like, a rearlly rlong time.`,
        `Liker, a really long time.`,
        `Liker, a really long time.`,
        `Lrike, a really long time.`,
        `But our tools have remained the same: a page & a wall of text.`,
    ]

</script>


<div id = 'app'>


<Navbar />


<div id = 'center'>

    <div id = 'mast'>
        <h2> Why We Built </h2>
        <h1> Scrollable </h1>

        <div id = 'fab'>

            {#if scrolling}

            <svg id = 'ps' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="21" y="12" width="19" height="75" rx="9.5" fill="white"/>
              <rect x="61" y="12" width="19" height="75" rx="9.5" fill="white"/>
            </svg>

            {:else}

            <svg id = 'pl' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M79.7778 45.9586L25.1537 11.7179C22.0306 9.76019 18 12.0372 18 15.7593V84.2407C18 87.9628 22.0306 90.2398 25.1537 88.2821L79.7778 54.0414C82.7407 52.1841 82.7407 47.8159 79.7778 45.9586Z" fill="white"/>
            </svg>

            {/if}

          </div>
    </div>

    <div id = 'elems'>
        {#each texts as text}
            <AnimatedElement options ={OPTIONS} text = {text} color = 'white'></AnimatedElement>
        {/each}

    </div>

</div>

</div>


<style lang="scss">

    #app{
        background: #171717;
        height: 100vh;
        overflow-y: scroll;
    }

    #center{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        padding-bottom: 100px;
        color: white;
    }

    #mast{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-weight: 200;
        padding: 100px 0;
        h1{
            font-size: 50px;
            font-weight: 700;
        }
    }

    #fab{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FF003D;
        width: 54px;
        height: 54px;
        border-radius: 500px;
        z-index: 5;
        box-shadow: 0x 20px 60px rgba(0,0,0,0.6);
        transition: 0.2s ease;
        margin-top: 20px;
        cursor: pointer;

        svg{
            width: 30px;
            height: 30px;
        }

        &:hover{
        background: #e3002a;
        }
    }


</style>