<script>
    export let activeObject = null;
    export let active = false
    //import { textTemplate, imageTemplate, videoTemplate } from './page.svelte'; // Assuming you've exported these functions in page.svelte

    let options = []

    import { writable } from 'svelte/store';
    import {isPanelVisible} from '../../store'


function textTemplate(activeObject) {
  const options = [
    { label: 'Font', id: 'fontFamily', type: 'text', value: activeObject.fontFamily },
    { label: 'Color', id: 'fontColor', type: 'color', value: activeObject.fill },
    { label: 'Letter Spacing', id: 'letterSpacing', type: 'number', value: activeObject.letterSpacing || 0 },
    { label: 'Line Height', id: 'lineHeight', type: 'number', value: activeObject.lineHeight || 1 }
  ];
  return options;
}

function imageTemplate(activeObject) {
  return [
    {
      label: 'Width',
      id: 'scaleX',
      type: 'number',
      value: activeObject.width * activeObject.scaleX,
    },
    {
      label: 'Height',
      id: 'scaleY',
      type: 'number',
      value: activeObject.height * activeObject.scaleY,
    },
    {
      label: 'Filter',
      id: 'filter',
      type: 'select',
      value: 'normal', // Initial value
      options: ['normal', 'invert', 'monochrome'],
    }
  ];
}

function videoTemplate(activeObject) {
  const options = [
    { label: 'Autoplay', id: 'autoplay', type: 'checkbox', value: activeObject.autoplay || false },
    { label: 'Controls', id: 'controls', type: 'checkbox', value: activeObject.controls || false },
    { label: 'Width', id: 'width', type: 'number', value: activeObject.width || 0 },
    { label: 'Height', id: 'height', type: 'number', value: activeObject.height || 0 }
  ];
  return options;
}

function populatePanel(activeObject) {
  let panel = document.getElementById('controls');
  panel.innerHTML = ''; // Clear existing options
  let options = [];

  switch (activeObject.type) {
    case 'i-text':
      options = textTemplate(activeObject);
      break;
    case 'image':
      options = imageTemplate(activeObject);
      break;
    case 'video':
      options = videoTemplate(activeObject);
      break;
    default:
      break;
  }

  // Render options
  options.forEach(option => {
    const label = document.createElement('label');
    label.innerHTML = `${option.label}: `;
    const input = document.createElement('input');
    input.id = option.id;
    input.type = option.type;
    input.value = option.value;

    label.appendChild(input);
    panel.appendChild(label);

    // Attach event listener
    input.addEventListener('change', function() {
      if (input.type === 'checkbox') {
        activeObject.set({ [option.id]: input.checked });
      } else {
        activeObject.set({ [option.id]: input.type === 'number' ? parseFloat(input.value) : input.value });
      }
      canvas.renderAll();
    });
  });
}







    $: if (activeObject) {
      switch (activeObject.type) {
        case 'i-text':
          options = textTemplate(activeObject);
          break;
        case 'image':
          options = imageTemplate(activeObject);
          break;
        case 'video':
          options = videoTemplate(activeObject);
          break;
        default:
          options = [];
          break;
      }
    }

    function handleChange(option, value) {
      activeObject.set({
        [option.id]: option.type === 'number' ? parseFloat(value) : value
      });
      // canvas.renderAll(); // You might need to call this somewhere to re-render the canvas.
    }
</script>




<div id="panel" class:active={active}>
      <h1> Controls </h1>
      {#each options as option (option.id)}
    <label>
        {option.label}:
        {#if option.type === 'checkbox'}
            <input type="checkbox" bind:checked={option.value} on:change={() => handleChange(option, option.value)} />
        {:else if option.type === 'color'}
            <input type="color" bind:value={option.value} on:change={() => handleChange(option, option.value)} />
        {:else}
            <input bind:value={option.value} on:change={() => handleChange(option, option.value)} />
        {/if}
    </label>
{/each}
</div>



<style lang="scss">


::-webkit-scrollbar{
  width: 2px;
  background: white;
}

::-webkit-scrollbar-thumb{
  background: #d0d0d0;
}


#panel{
    position: fixed;
    top: 0px;
    left: -400px;
    width: 240px;
    padding: 20px;
    height: 100vh;
    background: #FF004D;
    background: rgb(10, 5, 19);
    background: white !important;


    box-shadow: 20px 0px 70px rgba(black, 0.02);
    transition: 0.3s ease-in-out;
    overflow-y: scroll;


    //background: red;

    display: flex;
    flex-direction: column;
    gap: 24px;
    letter-spacing: -0.4px;

    z-index: 10 !important;



    :global(#controls-title){
      font-weight: 600;
      color: black;
    }

    :global(.control){
      display: flex;
      align-items: center;
      gap: 10px;

    }

      :global(.range){
        -webkit-appearance: none;
        width: 80%;
        height: 20px;
        background: #d3d3d3;
        outline: none;
        opacity: 1;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }

      :global(.range:hover) {
        //opacity: 1;
        opacity: 1;
      }

      :global(.range::-webkit-slider-thumb) {
        -webkit-appearance: none;
        appearance: none;
        width: 8px;
        height: 24px;
        border-radius: 3px;
        background: rgba(black, 0.3);
        cursor: pointer;
      }

      :global(.range::-moz-range-thumb) {
        width: 8px;
        height: 20px;
        background: rgba(black, 0.3);
         border-radius: 3px;
        cursor: pointer;
      }


    :global(.option){
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    :global(.icon){
      width: 16px;
      margin-right: 12px;
    }


    :global(input){
      padding: 1px 7px !important;
    }


    &.active{
      left: 0 !important;
    }

  }

</style>