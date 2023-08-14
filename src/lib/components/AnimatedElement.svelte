<script lang="js">
    import { fade } from 'svelte/transition';
    import { inview } from 'svelte-inview';
    import { createEventDispatcher, onMount } from 'svelte';

    let dispatch = createEventDispatcher()

    let isInView;

    export let text;
    export let color;
    export let options;

    onMount(() => {

      document.getElementById('wrapper').onclick = highlight


      function highlight() {
        console.log('yo')
        document.getElementById('wrapper').classList.toggle('highlight')
        dispatch('highlight', text); // emit the delete event with the space id.
      }
    })


  </script>

  <div
    id = 'wrapper'
    class="wrapper"
    use:inview={{ unobserveOnEnter: true, rootMargin: '-20%' }}
    on:change={({ detail }) => {
      isInView = detail.inView;
    }}
  >
    {#if isInView}
      <div in:fade class="box">
        <p style='color: {color}; font-size: {options.font_size}px; text-align: {options.justify}'>
          {text}
        </p>
      </div>
    {/if}
  </div>

  <style lang="scss">
    #wrapper {
        margin-top: 30px;
        &.highlight{
          background: yellow;
        }
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
            text-align: center;
        }
    }

</style>