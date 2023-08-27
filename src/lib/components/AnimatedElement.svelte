<script lang="js">
    import { fade } from 'svelte/transition';
    import { inview } from 'svelte-inview';
    import { createEventDispatcher, onMount } from 'svelte';

    let dispatch = createEventDispatcher()

    let isInView;

    export let text;
    export let color;
    export let options;
    export let image;

    onMount(() => {


    $: for (let i=0; i<document.getElementsByClassName('wrapper').length; i++){

      let wrapper = document.getElementsByClassName('wrapper')[i]

      wrapper.onclick = () => {
        wrapper.classList.toggle('highlight')
        dispatch('highlight', text);
      }
    }

    })


  </script>

  <div
    class="wrapper"
    use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fade class="box">
        {#if image}
        <img src = '{image}' alt = 'Animated Image'>
        {/if}
        <p style='color: {color}; font-size: {options.font_size}px; text-align: {options.justify}'>
          {text}
        </p>
      </div>
    {/if}
  </div>

  <style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');


    .wrapper {
        margin-top: 30px;
        padding: 20px;
        border-radius: 15px;
        transition: 0.1s ease;
        cursor: pointer;
        &.highlight{
        }
    }

    :global(.highlight){
      background: rgb(255, 255, 221) !important;
    }

    .box{
        transition: 0.1s ease;
    }

    .elem{
        margin: auto;
        margin-bottom: 150px;
        text-align: center;
        font-weight: 200;

    }

    p{
        font-size: 14px;
        line-height: 250%;
        margin: auto;
        letter-spacing: 0.15px;
        font-weight: 400 !important;
        opacity: 0.7;
        text-align: center;
    }

    @media screen and (max-width: 800px){

        .elem{
            width: 80vw;
        }

        p{
            font-size: 13px !important;
            width: 80vw;
            margin-left: -3.5vw !important;
        }
    }

</style>