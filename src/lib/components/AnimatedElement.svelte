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
        document.getElementById('wrapper').classList.toggle('highlight')
        dispatch('highlight', text); // emit the delete event with the space id.
      }
    })

    $: for (let i=0; i<document.getElementsByClassName('wrapper').length; i++){

      let wrapper = document.getElementsByClassName('wrapper')[i]

      wrapper.onclick = () => {
        wrapper.classList.toggle('highlight')
      }

    }

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

    .wrapper {
        margin-top: 30px;
        padding: 30px;
        border-radius: 5px;
        transition: 0.2s ease;
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
            text-align: center;
        }
    }

</style>