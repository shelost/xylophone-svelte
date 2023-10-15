<div id = 'app'>



  <div id = 'container' in:fly={{ y: 100, duration: 300 }} style='border: 1px solid {data.color}'>


  <div id = 'bar'>

    <div id = 'mast'>

    <input id = 'title' bind:value = {title} placeholder = 'Untitled Page' style='outline: none !important;'>

    </div>


    <div id = 'buttons'>
      <div class = 'add' id="pointer"  class:active = { MODE == null } >
        <img src = {Pointer} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addText"  class:active = { MODE == 'text' } >
        <img src = {Text} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addImage" class:active = { MODE == 'image' }>
        <img src = {Image} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addPolygon" class:active = { MODE == 'polygon' }>
        <img src = {Triangle} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addButton" class:active = { MODE == 'button' }>
        <img src = {Button} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addRect" class:active = { MODE == 'rect' }>
        <img src = {Rect} class = 'icon'  alt = 'icon'>
      </div>
      <div class = 'add' id="addCircle" class:active = { MODE == 'circle' }>
        <img src = {Ellipse} class = 'icon'  alt = 'icon'>
      </div>

      <div class = 'add' id="addDraw" class:active = { MODE == 'draw' }>
        <img src = {Draw} class = 'icon'  alt = 'icon'>
      </div>


      <label class="switch">
        <input type="checkbox" id = 'ruler' bind:checked={ruler} >
        <span class="slider round"></span>
      </label>

      <div>
        <input type="color" id="color" name="head" bind:value={color} />
      </div>


    </div>



    <div id = 'corner'>

      <h2 id = 'status'>
        {#if saved}
          Saved
        {:else}
          Saving...
        {/if}
      </h2>

      <div id = 'input'>
        <input id = 'height' bind:value = {height} type = 'number' style='outline: none !important;'>
        <button id = 'setHeight'> <h1> Update </h1> </button>
      </div>


      <div class='toggle'>

        {#if $MAX}
          <img src = {Min} alt = 'max'>
        {:else}
          <img src = {Max} alt = 'max'>
        {/if}
        <input type="checkbox" id = 'max' bind:checked={$MAX} >
      </div>

    </div>


    <!--
    <button id = 'clear'> <h1> Clear </h1> </button>
    -->

  </div>




  <div id = 'subcontainer' style='background: {data.color};  background-image: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.6))'>

    <div id = 'canvas-container'>
      <div id = 'loader' class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      <canvas id = 'canvas'></canvas>
      <div id = 'flare-1'></div>
      <div id = 'flare-2'></div>
      <div id = 'gradient-top'></div>
      <div id = 'gradient-bottom'></div>
    </div>

    <div id="handle"></div>
  </div>


</div>


<!--
  <Panel activeObject = {activeObject} active={$isPanelVisible}/>
-->


</div>



<svelte:head>
	<title> {data.title} </title>
	<meta name="description" content="Arachne is a different kind of dev." />
	<link rel ='icon' href='{icon}'>
</svelte:head>


<style lang='scss'>



.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ff004d;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}






::-webkit-scrollbar{
  width: 8px;
  background: rgba(white, 0.5);
}

::-webkit-scrollbar-thumb{
  background: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
  //border: 1px solid white;
  border-radius: 50px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border: 1px solid rgba(white, 0.5);
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 1px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ff004d;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ff004d;
}

input:checked + .slider:before {
  transform: translateX(8px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
 // margin-top: 15px;
  margin-right: 3px;
}

.slider.round:before {
  border-radius: 50%;
  margin-top: 15px;
}




  #app{
      width: calc(100vw - 240px);
      margin-top: 0px;
      height: calc(100vh);
      margin-left: 240px;
      overflow: visible !important;
      display: flex;
      justify-content: center;
  }

  #url{
    box-shadow: none;
    padding: 8px 15px;
    border-radius: 40px;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: -0.2px;
    background: #FF006B;
  }

  #handle {
    cursor: ew-resize;  // cursor indicates horizontal resizing
    position: absolute;
    right: 10px;
    top: calc(50vh - 50px);
    width: 8px;
    height: 50px;
    background: white; // semi-transparent background for the handle
    border-radius: 50px;
    box-shadow: 0px 20px 40px rgba(black, 1);
    transition: 0.2s ease;

    &:hover{
      transform: scale(1.2);
    }
}

  #canvas-container{
    //height: fit-content;

    display: inline-block;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    overflow-x: hidden !important;
    overflow-y: scroll !important;
    width: calc(100vw - 260px);
    height: calc(100vh - 25px);

    background: none;





    #canvas{
      flex-shrink: 0;
      width: calc(100vw - 255px);
      margin: 0;
    }


    #loader {
      position: absolute;
      left: calc(50% - 20px);
      top: calc(50% - 30px);
      z-index: 1;
      width: 50px;
      height: 50px;
  }


  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  }


  #color{
    width: 16px;
    height: 16px;
    transition: 0.2s ease;
    margin-top: 5px;
    border: none;
    outline: none;
    //box-shadow: 0x 5px 20px rgba(black, 0.2);
    &:hover{
      opacity: 0.9;
    }
  }

  #color::-webkit-color-swatch{
    padding: 0;
    border: 1px solid rgba(white, 0.3), 2px solid rgba(black, 0.2)  !important;
    border-radius: 40px !important;
  }

  #color::-webkit-color-swatch-wrapper{
    padding: 0;
    border: 1px solid rgba(white, 0.3), 2px solid rgba(black, 0.2)  !important;
    border-radius: 40px !important;
  }


  #floatingOptions{
      position: absolute;
      opacity: 0;
  }


:global(#delete){
    background: red;
  }




  :global(#control){
    display: flex;
    flex-direction: column;
    gap: 10px;
  }


  :global(.control-btn){
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.3px;
    border-radius: 10px;
    background: rgba(black, 0.1);
    color: black;
    box-shadow: none;
    &:hover{
      background: rgba(black, 0.15);
    }
  }

  :global(.red){
    color: white;
    background: #ff004d !important;
    &:hover{
      background: #e20035 !important;
    }
  }



  :global(.option){
      font-size: 12px;
      display: flex;
      flex-direction: column;
    }



  .active{
      opacity: 1;
  }

  #container {
      width: calc(100vw - 270px);
      height: calc(100vh - 30px);
      margin-top: 15px;
      background-image: linear-gradient(to bottom right, rgba(white,0.8), rgba(white, 0.4)) !important;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow-x: hidden !important;
      overflow-y: hidden;
      border-radius: 10px;
      box-shadow: 0px 20px 70px rgba(#00106D, 0.1);
    }

  .max{
    position: fixed !important;
    width: 100vw !important;
    height: 100vh !important;
    top: 0 !important;
    left: 0 !important;
    border: 5px solid green !important;
  }

  #bar{

    /*
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;

    height: 54px;
   // border-bottom: 1px solid rgba(black, 0.02);
    color: black;

    width: 100%;

    z-index: 3;
    //border: 1px solid black;

    //position: absolute;
    */


    #mast{
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 3;

      width: 140px;



      transform: translateY(50px);
      opacity: 0;
      transition: 0.6s ease;
      animation: 0.3s slide 0.1s ease forwards;

      #title {
        box-shadow: 0 20px 50px rgba(black, 0.15);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.4px;
        padding: 0px 12px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 1) !important;  /* corrected the rgba format */
        width: auto;   /* flexible width */
        max-width: 140px;  /* maximum width */
        border: none; /* remove default border */
        overflow: hidden; /* hide overflowed text */
        white-space: nowrap; /* ensure single line of text */
      }
    }


    #buttons{
      position: absolute;

      top: calc(50% - 160px);
      left: 15px;

      height: 320px;
      z-index: 3;


      padding: 0 0px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      background: rgba(white, 1) !important;
     // padding: 2px 8px 2px 5px;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(black, 0.15);

      transform: translateY(50px);
      transition: 0.7s ease;
      opacity: 0;
      animation: 0.3s slide 0.2s ease forwards;

      .add{
        //background: rgba(black, 0.1);
        color: black;
        box-shadow: none;

        width: 28px;
        height: 28px;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.2s ease;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        &.active{
          background: rgba(black, 0.1);
        }
        &:hover{
          background: rgba(black, 0.1);
        }

        .icon{
          width: 12px;
          height: 12px;

        }
  }
    }

    @keyframes slide{
      from{
        transform: translateY(50px);
        opacity: 0;
      }
      to{
        transform: translateY(0);
        opacity: 1;
      }
    }

    #corner{

      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 3;


      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
      width: 140px;
      margin-right: 5px;

      transform: translateY(50px);
      opacity: 0;
      animation: 0.3s slide 0.3s ease forwards;

      .toggle{
        width: 24px !important;
        height: 24px;
        background: rgba(black, 0.1);
        border-radius: 5px;
        position: relative;
        flex-shrink: 0;
        transition: 0.2s ease;
        cursor: pointer;


        input{
          opacity: 0;
        }

        img{
          position: absolute;
          top: 4px;
          left: 4px;
          width: 16px;
          height: 16px;
         // pointer-events: none;
          cursor: pointer;
        }

        &:hover{
          background: rgba(black, 0.2);
        }
      }

        #status{
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.2px;
          padding: 5px 12px;
          color: white;
          width: 70px;

          text-align: center;

          border-radius: 20px;

          display: none;

          color: #ff004d;
          background: rgba(white, 0.8) !important;
        }
    }

    #input{
      display: flex;
      align-items: center;
      margin-right: -75px;

      //display: none;
      input{
        width: 140px;
        height: 30px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: -0.3px;
        background: rgba(white, 0.9) !important;
        border-radius: 8px;
        box-shadow: 0 20px 50px rgba(black, 0.15);
      }
      button{
        height: 32px;
        font-size: 12px;
        font-weight: 500;
        border-radius: 8px;
        transform: translateX(-70px);
        //border: 1px solid rgba(white, 0.5);
        box-shadow: none;
      }
    }
}



  input.middle:focus {
    outline-width: 0 !important;
}

input:focus,
#title:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none !important;
}




*:focus {
    outline: none !important;
}

input::-moz-focus-inner {  /* for Firefox */
    border: 0 !important;
    outline: none !important;
}

input:-webkit-autofill,  /* for WebKit browsers */
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    transition: background-color 5000s ease-in-out 0s;
}

  :global(.input){
      font-size: 10px !important;
      padding: 3px 8px !important;
      border-radius: 5px !important;
      border: none;
      background: rgba(black, 0.05) !important;
      transition: 0.2s ease;
      color: black;
  }

  :global(.flex){
      align-items: center;
  }

  :global(.input:hover){
    background: rgba(black, 0.1)
  }

  input:focus{
    border: none !important;
    outline: none !important;
  }

  :global(label){
      font-size: 10px;
      font-weight: 500;
      color: rgba(black, 0.4);
      letter-spacing: -0.5px;
      line-height: 100%;
      margin-right: 10px;
     display: none;
  }

  :global(input:checked) {
    border: none;
  }

  .active{
      left: 0px !important;
    }


:global(.option) {
    position: relative;
}

:global(.sliding-selector) {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    cursor: pointer;
}

:global(.option-item) {
    margin: 2px 5px;
    padding: 5px 10px;
    border: 1px solid lightgray;
    border-radius: 3px;

    cursor: pointer;
}

:global(.options){
  display: flex;
  flex-wrap: wrap;
 // border: 1px solid rgba(black, 0.2);
 background: rgba(black, 0.05);
 border-radius: 8px;
 padding: 5px;
}

:global(.options span){
  white-space: nowrap;
  padding: 5px 10px;
  z-index: 2;

  //background: rgba(white, 0.5);
  //margin: 5px;

  font-size: 11px;
  font-weight: 500;
}

:global(.slider-background) {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    height: 30px;
    background-color: white;
    box-shadow: 0px 10px 10px rgba(black, 0.05);
    //z-index: -1;
    transition: all 0.2s ease;
    border-radius: 5px;
}



#subcontainer{
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden !important;

  #gradient-top{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    pointer-events: none;
    background-image: linear-gradient(185deg, rgba(white, 0.2), rgba(white, 0), rgba(white, 0));
    transition: 0.4s ease;
	}

  #gradient-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    pointer-events: none;
    background-image: linear-gradient(10deg, rgba(white, 0.2), rgba(white, 0), rgba(white, 0));
    transition: 0.4s ease;
	}

  #flare-1{
    position: absolute;
    top: 0;
    right: 0;
    height: 4px;
    width: 60%;

    filter: blur(3px);
    background-image: linear-gradient(90deg, rgba(white, 0.4), rgba(white, 1), rgba(white, 1), rgba(white, 0.4));
  }

  #flare-2{
    position: absolute;
    top: 0;
    left: 0;
    height: 80%;
    width: 3px;

    filter: blur(3px);
    background-image: linear-gradient(0deg, rgba(white, 0.4), rgba(white, 1), rgba(white, 0.4));
  }
}


:global(#container.max){
    width: 99vw !important;
    height: 100vh !important;
    margin-top: 0 !important;
    margin-left: -240px;
    //z-index: 10 !important;
    border-radius: 0 !important;
    border: none !important;
    transform: scale(1.01);
    overflow-x: hidden !important;
  }

  :global(#canvas-container.max){
    width: 100vw !important;
    height: 100vh !important;
    margin-top: 0 !important;
    //z-index: 10 !important;
    border-radius: 0 !important;
    //border: none !important;
    //border: 5px solid red !important;
    display: flex !important;
    justify-content: center !important;
    overflow-x: hidden !important;
  }

  :global(#subcontainer.max){
    width: 100vw !important;
    height: 100vh !important;
    margin-top: 0 !important;
    //z-index: 10 !important;
    border-radius: 0 !important;
    border: none !important;
    overflow-x: hidden !important;

  }




  /*
  @media screen and (max-width: 800px){

    #app{
      width: 100vw !important;
    }

    #canvas-container{
      width: 100vw !important;
    }

    #container{
      width: 100vw !important;
    }

    #canvas{
      width: 100vw !important;
    }

  }
  */


</style>



<script>


import {onMount} from 'svelte'
import {fabric} from 'fabric'
import {supabaseClient} from '$lib/db'
import {writable, get} from 'svelte/store'
import icon from '$lib/img/favicon.svg'

import Sidebar from '$lib/components/Sidebar.svelte'

import Text from '$lib/img/i-text.svg'
import Button from '$lib/img/i-button.svg'
import Image from '$lib/img/i-img.svg'
import Triangle from '$lib/img/i-polygon.svg'
import Rect from '$lib/img/i-rect.svg'
import Ellipse from '$lib/img/i-ellipse.svg'
import Draw from '$lib/img/i-draw.svg'
import Pointer from '$lib/img/i-pointer.svg'
import Copy from '$lib/img/copy.svg'

import Max from '$lib/img/screen.svg'
import Min from '$lib/img/screen-1.svg'


import { fly } from 'svelte/transition'

import Grid from '$lib/components/Grid.svelte'
import { object_without_properties } from 'svelte/internal';

import { pages, isPanelVisible, assets, MAX} from '$lib/utils/store.js'; // Adjust the path as necessary

//import { pages, isPanelVisible, assets } from '../../../../store'; // Adjust the path as necessary


import { page } from '$app/stores';
import Panel from '$lib/components/Panel.svelte';

//export { textTemplate, imageTemplate, videoTemplate };


import IconW from '$lib/img/icon-w.svg'
import IconH from '$lib/img/icon-h.svg'
import IconX from '$lib/img/icon-x.svg'
import IconY from '$lib/img/icon-y.svg'
import IconC from '$lib/img/icon-c.svg'
import IconA from '$lib/img/icon-a.svg'
import IconD from '$lib/img/icon-d.svg'
import IconLS from '$lib/img/icon-ls.svg'
import IconLH from '$lib/img/icon-lh.svg'
import IconP from '$lib/img/icon-p.svg'
import IconS from '$lib/img/icon-s.svg'
import IconT from '$lib/img/icon-t.svg'
import IconB from '$lib/img/icon-b.svg'
	import { settings } from 'firebase/analytics';





export let data

let title= data.title
let color = data.color
let height = data.height
let ruler = false
let saved = true
let activeObject;
let alignmentGuides = [];
let MODE = null





let inputWidth = 'auto';

  // Function to adjust the width of the input based on its content
function adjustWidth() {
    console.log('to')
    const testSpan = document.createElement('span');
    document.body.appendChild(testSpan);
    testSpan.style.fontSize = '13px';
    testSpan.style.fontWeight = '500';
    testSpan.style.letterSpacing = '-0.3px';
    testSpan.style.whiteSpace = 'nowrap';
    testSpan.innerText = title || 'Untitled Page';

    // Calculate new width
    let newWidth = testSpan.getBoundingClientRect().width + 20;  // adding 20 for padding
    if (newWidth > 140) {
      newWidth = 140;
    }
    inputWidth = `${newWidth}px`;

    document.body.removeChild(testSpan);
  }

  // Watch for changes in title
  $: {
    adjustWidth();
  }






onMount(()=> {

  function resizeTitle(){
    let value = Id('title').value

    const testSpan = document.createElement('span');
    document.createElement('span');
    document.body.appendChild(testSpan);
    testSpan.style.fontSize = '13px';
    testSpan.style.fontWeight = '500';
    testSpan.style.letterSpacing = '-0.3px';
    testSpan.style.whiteSpace = 'nowrap';
    testSpan.style.color = 'rgba(0,0,0,0)'
    testSpan.innerText = Id('title').value || 'Untitled Page';


    let width = testSpan.getBoundingClientRect().width + 30;

    if (!value){
      width = testSpan.getBoundingClientRect().width + 30;
    }

    Id('title').style.width = width + 'px'

  }

  Id('title').addEventListener('input', resizeTitle);

  resizeTitle()



  // Initialize fabric.js canvas

  let previousCanvasWidth = document.getElementById("container").offsetWidth;


  let id = $page.params.slug
  //let data = get(pages).find(page => page.id === id);

  title = data.title
  color = data.color


  function Id(e){
    return document.getElementById(e)
  }



  const panelWidth = 260

  const PANEL = Id('panel')
  const SCROLL = Id('scroll')

  let initialCanvasWidth = window.innerWidth - panelWidth;  // Initial canvas width, 250 is the panel width
  let initialCanvasHeight = window.innerHeight;  // Initial canvas height


  let canvas = new fabric.Canvas('canvas', {
      width: initialCanvasWidth,
      height: initialCanvasHeight,
      renderOnAddRemove: false,
  });



  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Gabarito&display=swap';
  link.rel = 'stylesheet';

  document.head.appendChild(link);




  unifiedResize()




  var cloneImg = document.createElement('img');
  cloneImg.src = Copy


  fabric.Object.prototype.controls.clone = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 10,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 24,
  });


  fabric.Object.prototype.controls.edit = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 40,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: enterEditMode,
    render: renderIcon(cloneImg),
    cornerSize: 24
  });



  let activeBoundary = null
  let currentDrawings = []
  let croppingRect;



  function enterEditMode(eventData, transform) {
      const object = transform.target;
      MODE = 'draw';
      currentGroup = object;  // Update currentGroup reference
      canvas.setActiveObject(currentGroup);
      canvas.selection = false;  // Turn off object selection
      canvas.isDrawingMode = true;  // Activate drawing mode
      canvas.freeDrawingBrush.color = 'black'
      canvas.renderAll();
  }



function applyCrop(target) {
    const cropped = new fabric.Image(target._element, {
        left: target.left,
        top: target.top,
    });

    const rectLeft = croppingRect.left - croppingRect.width / 2;
    const rectTop = croppingRect.top - croppingRect.height / 2;

    cropped.clipPath = new fabric.Rect({
        left: -target.width / 2 + rectLeft - target.left,
        top: -target.height / 2 + rectTop - target.top,
        width: croppingRect.width,
        height: croppingRect.height,
        absolutePositioned: true,
    });

    canvas.remove(target);
    canvas.add(cropped);
}

function exitEditMode(applyChanges = true) {
    if (applyChanges) {
        const activeObject = canvas.getActiveObject();
        if (activeObject && croppingRect) {
            applyCrop(activeObject);
        }
    }

    if (croppingRect) {
        canvas.remove(croppingRect);
        croppingRect = null;
    }
}

function handleExit() {
    const applyChanges = confirm('Do you want to apply the crop?');
    exitEditMode(applyChanges);
}



  /*

  fabric.Object.prototype.controls.text = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -20,
    offsetX: 10,
    cursorStyle: 'pointer',
    //mouseUpHandler: cloneObject,
    render: renderText('bro'),
    cornerSize: 18
  });

*/

  fabric.Textbox.prototype.controls.clone = fabric.Object.prototype.controls.clone;



  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size/2, -size/2, size, size);
      ctx.restore();
    }
  }



  function renderText(textContent) {
    return function renderText(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.font = size + 'px Arial';  // Set the font size and family; adjust as needed
        ctx.fillStyle = 'black'
        ctx.fillText(textContent, -size/2, size/2);  // Using fillText to draw the text on canvas
        ctx.restore();
    }
}





  function cloneObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    target.clone(function(cloned) {
      cloned.left += 20;
      cloned.top += 20;
      cloned.depth = target.depth
      cloned.link = target.link
      canvas.add(cloned);
    });
  }





///////////////////////////////////////////////////
//////////////// OBJECT PROPERTIES ////////////////
///////////////////////////////////////////////////



// This function checks the proximity of two values
function isClose(val1, val2, threshold) {
    return Math.abs(val1 - val2) < threshold;
}

// Draw alignment guide
function drawGuide(x1, y1, x2, y2, stroke = '#ff0000') {
  let line = new fabric.Line([x1, y1, x2, y2], {
      stroke: stroke,
      strokeWidth: 2,
      opacity: 0.3,
      selectable: false,
      evented: false,
      excludeFromExport: true
  });
  canvas.add(line);
  return line;
}

// Clear all guides from the canvas
function clearGuides() {
    let objects = canvas.getObjects();
    for (let i = objects.length - 1; i >= 0; i--) {
        if (objects[i].excludeFromExport) {
            canvas.remove(objects[i]);
        }
    }
}


const threshold = 10;  // Proximity threshold
const strong = 20

canvas.on('object:moving', (event) => {

  activeObject = event.target;

  // Ruler guides
  clearGuides();
  if (ruler){
    drawGuides()
  }



  let centerX = activeObject.left+(activeObject.width*activeObject.scaleX)/2
  let centerY = activeObject.top+(activeObject.height*activeObject.scaleY)/2


  switch (activeObject.pin){

    case 'left':
      drawGuide(0, centerY, centerX, centerY)
      break
    case 'right':
      drawGuide(centerX, centerY, canvas.width, centerY)
      break

    case 'center':
      drawGuide(centerX, 0, centerX, canvas.height)
      break

    default:
      break
  }

  // Handle transformations for each object in the active selection.
  //applyParallaxEffect();

  // Property text
  if (activeObject.type === 'activeSelection') {
        activeObject.getObjects().forEach(obj => {
            handleObject(obj, activeObject);
        });
    } else {
        handleObject(activeObject);
    }

});


canvas.on('object:moved', (event) => {
    let activeObject = event.target;

    if (activeObject.type === 'activeSelection') {
        activeObject.getObjects().forEach(obj => {
            let absoluteTop = obj.top + activeObject.top;
            updateDepth(obj, absoluteTop);
        });
    } else {
        updateDepth(activeObject, activeObject.top);
    }

    applyParallaxEffect();
});









function drawGuides(){

  let midPoint = canvas.width / 2;

  canvas.getObjects().forEach((obj) => {
      if (obj === activeObject || obj.excludeFromExport) return;

      // Check horizontal alignments
      if (isClose(activeObject.left, obj.left, threshold)) {
          drawGuide(obj.left, 0, obj.left, canvas.height);
          activeObject.left = obj.left;
      } else if (isClose(activeObject.left + activeObject.width * activeObject.scaleX, obj.left, threshold)) {
          drawGuide(obj.left, 0, obj.left, canvas.height);
          activeObject.left = obj.left - activeObject.width * activeObject.scaleX;
      } else if (isClose(activeObject.left, obj.left + obj.width * obj.scaleX, threshold)) {
          drawGuide(obj.left + obj.width * obj.scaleX, 0, obj.left + obj.width * obj.scaleX, canvas.height);
          activeObject.left = obj.left + obj.width * obj.scaleX;
      }

      // Check vertical alignments
      if (isClose(activeObject.top, obj.top, threshold)) {
          drawGuide(0, obj.top, canvas.width, obj.top);
          activeObject.top = obj.top;
      } else if (isClose(activeObject.top + activeObject.height * activeObject.scaleY, obj.top, threshold)) {
          drawGuide(0, obj.top, canvas.width, obj.top);
          activeObject.top = obj.top - activeObject.height * activeObject.scaleY;
      } else if (isClose(activeObject.top, obj.top + obj.height * obj.scaleY, threshold)) {
          drawGuide(0, obj.top + obj.height * obj.scaleY, canvas.width, obj.top + obj.height * obj.scaleY);
          activeObject.top = obj.top + obj.height * obj.scaleY;
      }
  });


  // First priority: Object's center aligning with canvas center
  if (isClose(activeObject.left + (activeObject.width * activeObject.scaleX) / 2, midPoint, strong)) {

      drawGuide(midPoint, 0, midPoint, canvas.height, 'blue');
      activeObject.left = midPoint - (activeObject.width * activeObject.scaleX) / 2;
      //return;  // Exit the function after snapping to center
  }

  // Second priority: Object's edges and center aligning with every 10th gridline
  for (let i = 0; i <= canvas.width; i += 10) {
      if (isClose(activeObject.left, i, threshold)) {
          drawGuide(i, 0, i, canvas.height, 'green');
          activeObject.left = i;
      } else if (isClose(activeObject.left + activeObject.width * activeObject.scaleX, i, threshold)) {
          drawGuide(i, 0, i, canvas.height, 'green');
          activeObject.left = i - activeObject.width * activeObject.scaleX;
      } else if (isClose(activeObject.left + (activeObject.width * activeObject.scaleX) / 2, i, threshold)) {
          drawGuide(i, 0, i, canvas.height, 'yellow');
          activeObject.left = i - (activeObject.width * activeObject.scaleX) / 2;
      }
  }

  canvas.renderAll()
}





///////////////////////////////////////////////////
//////////////// OBJECT PROPERTIES ////////////////
///////////////////////////////////////////////////



 // Utility function to update the value of both input and range elements
function updatePropertyElements(property, value) {
  const inputElement = Id(`input-${property}`);
  const rangeElement = Id(`range-${property}`);

  if (inputElement) inputElement.value = value;
  if (rangeElement) rangeElement.value = value;
}

// Automatically sync UI elements based on the active object's properties
function updateUIFromCanvasObject(obj) {
  const properties = ['width', 'height', 'angle', 'fontFamily', 'fill', 'charSpacing', 'fontSize', 'textAlign', 'fontWeight', 'fontStyle', 'fill', 'xPercent', 'depth', 'color'];

  properties.forEach(property => {
    let value = obj[property];

    if (property === 'width') value = Math.round(obj.width * obj.scaleX);
    if (property === 'height') value = Math.round(obj.height * obj.scaleY);
    if (property === 'angle') value = Math.round(obj.angle);

    updatePropertyElements(property, value);
  });
}

// Function to apply styles to the canvas object
window.applyStyles = function(prop, value) {
  const activeObjects = canvas.getActiveObjects();

  activeObjects.forEach(activeObject => {
    if (prop === "width" || prop === "height") {
        const scaleValue = parseFloat(value) / (prop === "width" ? activeObject.width : activeObject.height);
        activeObject.scaleX = prop === "width" ? scaleValue : activeObject.scaleX;
        activeObject.scaleY = prop === "height" ? scaleValue : activeObject.scaleY;
    } else {
        if (typeof value == 'string' && !isNaN(value)) {
            activeObject[prop] = parseFloat(value);
        } else {
            activeObject[prop] = value;
        }

        if (prop == 'depth'){
          updateDepth(activeObject);
        }



        activeObject.dirty = true;
        activeObject.textBackgroundColor = 'rgba(0,0,0,0)'
        canvas.requestRenderAll();
    }
  });




  canvas.requestRenderAll();
  canvas.renderAll();
  canvas.calcOffset();
  saveCanvasToSupabase();
};


function clearCanvas() {
  canvas.remove(...canvas.getObjects());
}



function attachInputListeners(id, property) {
  const element = Id(id);
  if (element) {
    element.addEventListener('input', function() {
      applyStyles(property, element.value);
      updatePropertyElements(property, element.value); // Automatically sync input and range
    });
  }
}

function extractPropertiesFromTemplate(template) {
    return template.map(item => item.id);
}

function combineProperties(...templates) {
    let combined = [];
    templates.forEach(template => {
        combined = combined.concat(extractPropertiesFromTemplate(template));
    });
    return [...new Set(combined)]; // Return unique properties only
}

function getCurrentObjectProperties(obj) {
    if (!obj) {
        return [];
    }


    switch (obj.type){

      case 'textbox':
        return extractPropertiesFromTemplate(textTemplate(obj));
        break

      case 'image':
        return extractPropertiesFromTemplate(imageTemplate(obj));
        break

      case 'rect':
        return extractPropertiesFromTemplate(rectTemplate(obj));
        break

      case 'ellipse':
        return extractPropertiesFromTemplate(ellipseTemplate(obj));
        break

      case 'polygon':
        return extractPropertiesFromTemplate(polygonTemplate(obj));
        break

      case 'path':
        return extractPropertiesFromTemplate(pathTemplate(obj));
        break


      default:
        return []
        break
    }

}

function dynamicallyBindListeners() {
    activeObject = canvas.getActiveObject();
    const properties = getCurrentObjectProperties(activeObject);

    setTimeout(() => {

      properties.forEach(property => {

      attachInputListeners(`input-${property}`, property);
      attachInputListeners(`range-${property}`, property);
});


if (document.getElementById("sendToFront")){
  document.getElementById("sendToFront").addEventListener("click", sendObjectToFront);
document.getElementById("sendToBack").addEventListener("click", sendObjectToBack);

}



    }, 300);


}





// Input Correspondence

function adjustDimensionsAfterScaling(obj) {
    if (obj.type === 'rect') {
        obj.set({
            width: obj.width * obj.scaleX,
            height: obj.height * obj.scaleY,
            scaleX: 1,
            scaleY: 1
        });
    } else if (obj.type === 'circle') {
        obj.set({
            radius: obj.radius * obj.scaleX, // assuming uniform scaling
            scaleX: 1,
            scaleY: 1
        });
    } else if (obj.type === 'polygon') {
        let newPath = obj.path.map(segment => {
            return segment.map((point, index) => {
                if (typeof point === 'number') { // avoid adjusting command letters like M, L, etc.
                    return point * (index % 2 === 0 ? obj.scaleX : obj.scaleY);
                }
                return point;
            });
        });
        obj.set({
            path: newPath,
            scaleX: 1,
            scaleY: 1
        });
    }else if (obj.type === 'ellipse') {
        obj.set({
            rx: obj.rx * obj.scaleX,
            ry: obj.ry * obj.scaleY,
            scaleX: 1,
            scaleY: 1
        });
    }if (obj.type === "group") {
      // Loop through each child of the group
      obj.getObjects().forEach(child => {
            // Adjust the dimensions of each child
            adjustDimensionsAfterScaling(child);
        });

        // Reset group's scaling
        obj.set({
            scaleX: 1,
            scaleY: 1
        });
    }

    // ... Handle other object types similarly
    obj.setCoords();  // Recalculate object's bounding box after modifications
    canvas.renderAll();
    canvas.requestRenderAll();
}


canvas.on('object:scaling', function(event) {
    const obj = event.target;

    if (obj.type === 'textbox') {
        const scaleX = obj.scaleX;
        const newFontSize = Math.floor(obj.fontSize * scaleX);
        obj.set('fontSize', newFontSize);
        obj.set('scaleX', 1);
        obj.set('scaleY', 1);
        obj.initDimensions();
    }else if (obj.width) {
        // Update the width and height input values to the current scaled dimensions

        if (Id('input-width')){
          Id('input-width').value = Math.round(obj.width * obj.scaleX)
          Id('input-height').value = Math.round(obj.height * obj.scaleY)
          Id('range-width').value =  Math.round(obj.height * obj.scaleY)
          Id('range-height').value =Math.round(obj.width * obj.scaleX)
        }

        if (Id('input-left')){
          Id('input-left').value =  Math.round(obj.left)
          Id('range-left').value = Math.round(obj.left)
          Id('input-top').value =  Math.round(obj.top)
          Id('range-top').value = Math.round(obj.top)
        }

      }

      adjustDimensionsAfterScaling(obj);

    canvas.renderAll();
    dynamicallyBindListeners();
    updateUIFromCanvasObject(event.target);
});

canvas.on('object:rotating', function(event) {
    const obj = event.target;

    if (Id('input-angle')) {
      Id('input-angle').value = Math.round(obj.angle)
      Id('range-angle').value = Math.round(obj.angle)
    }

    canvas.renderAll();
    dynamicallyBindListeners();
    updateUIFromCanvasObject(event.target);
});

canvas.on('object:selected', function(event) {
    dynamicallyBindListeners();
    updateUIFromCanvasObject(event.target);
});

canvas.on('object:modified', function(event) {
    dynamicallyBindListeners();
    updateUIFromCanvasObject(event.target);
    saveCanvasToSupabase()


});










/////////////////xfd//////////////////////////////////
////////////////// LOAD CANVAS ////////////////////
///////////////////////////////////////////////////


  let xArr = Array.from({length: 40}, (_, i) => i * 40);
  let yArr = Array.from({length: 40}, (_, i) => i * 40);
  let gridLines = [];




  let shadow = new fabric.Shadow({
            color: 'rgba(0,0,0,0.1)', // Set the shadow color
            blur: 40,                 // Blur amount
            offsetX: -10,               // Horizontal shadow offset
            offsetY: 50                // Vertical shadow offset
          })


const loadCanvasFromSupabase = async () => {
    if (!data.content) {
        return;
    }

    // Ensure that the user has an active session
    const session = data.session;

    if (!session) {
        return;
    }
    // Use the session's access token in headers for authorization
    const headers = {
        'Authorization': `Bearer ${session.access_token}`
    };

    const { data: fileData, error } = await supabaseClient.storage.from('fabric')
        .download(data.content, { headers });  // Provide headers as options

    if (error) {
        console.error('Error downloading the file:', error);
        return;
    }

    // Convert blob data to JSON string
    const blobToText = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(blob);
        });
    };


    try {
        const fileText = await blobToText(fileData);
        const fileJson = JSON.parse(fileText);

        // Load the parsed data into the canvas
        canvas.loadFromJSON(fileJson, () => {


            Id('loader').style.display = 'none';

            const canvasCenterX = canvas.width / 2;
            const scaleX = canvas.width / data.iwidth


            canvas.getObjects().forEach((object) => {

                if (!object.pin){
                  object.pin = 'center'
                }

          object.shadow = shadow


                object.set({
                  //left: object.left * scaleX,
                  top: object.top
                })


                object.set({
                  borderColor: '#E0E0E0',
                  cornerColor: '#FF004D',
                  cornerSize: 10,
                  borderScaleFactor: 1.5,
                  cornerStrokeColor: 'white',
                  cornerStyle: 'circle',
                  transparentCorners: false
                });


              if (object.originalTop === undefined) {
                  object.originalTop = object.top;
              }


                //object.originalTop = object.top;
                object.right = canvas.width - object.left + object.width * object.scaleX
                object.center = (object.left + (object.width * object.scaleX) / 2 - canvas.width / 2)


                if (!object.pin){
                  object.pin = 'center'
                }

            });


            unifiedResize()


            calculateGrid()
         // drawGrid()


            applyParallaxEffect();
            canvas.setHeight(data.height);
            canvas.setHeight(height);
            canvas.setBackgroundColor(data.color);
            Id('canvas-container').style.background = data.color
            Id('container').style.background = data.color

            canvas.renderAll();
        }, function (o, object){

        });

    } catch (parseError) {
        console.error('Error parsing the blob data:', parseError);
    }
};

// Usage:
// loadCanvasFromSupabase(yourData);


function addShadows() {
  canvas.forEachObject(function(object) {
    let shadow = new fabric.Shadow({
      color: 'black', // Set the shadow color
      blur: 50,                 // Blur amount
      offsetX: 5,               // Horizontal shadow offset
      offsetY: 5                // Vertical shadow offset
    })

    object.shadow = shadow

    console.log(object.shadow)
    console.log('yo')
  });
  canvas.renderAll(); // Always remember to re-render the canvas after making changes
}




canvas.setBackgroundColor(data.color);
    Id('canvas-container').style.background = data.color

   loadCanvasFromSupabase()

   canvas.setHeight(data.height);


setTimeout(() => {
  canvas.setBackgroundColor(data.color);
    Id('canvas-container').style.background = data.color

   loadCanvasFromSupabase()
   canvas.setHeight(data.height);
},2000)



Id('color').addEventListener('input', e => {
  canvas.setBackgroundColor(Id('color').value, () => canvas.renderAll());
  //Id('bar').style.background = Id('color').value
  saveCanvasToSupabase()
})

Id('setHeight').addEventListener('click', async () => {

  canvas.setHeight(height)
  saveCanvasToSupabase()
})

/*
Id('clear').addEventListener('click', async () => {

  clearCanvas()
  saveCanvasToSupabase()
})
*/





document.querySelectorAll('.sliding-selector .options span').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.closest('.sliding-selector');
        const background = parent.querySelector('.slider-background');

        // Move the background to the clicked option's position
        background.style.left = this.offsetLeft + 'px';
        background.style.width = this.offsetWidth + 'px';

        // Handle the selection logic (e.g., update the corresponding property value)
        const value = this.dataset.value;
        console.log('Selected:', value);
    });
});


/*
// Initialize the slider-background for the currently selected option
// Assuming the first option is selected by default
const firstOption = document.querySelector('.sliding-selector .options span');
const background = document.querySelector('.sliding-selector .slider-background');
background.style.left = firstOption.offsetLeft + 'px';
background.style.width = firstOption.offsetWidth + 'px';
*/


function positionSliderBackground(selectorElement) {

  if (selectorElement){
    const activeOption = selectorElement.querySelector('.options span.selected');
    const sliderBackground = selectorElement.querySelector('.slider-background');

    if (activeOption) {
        const activeOptionPosition = activeOption.getBoundingClientRect();
        const selectorPosition = selectorElement.getBoundingClientRect();

        sliderBackground.style.left = (activeOptionPosition.left - selectorPosition.left - 27) + 'px';
        sliderBackground.style.width = activeOptionPosition.width + 'px';
        sliderBackground.style.top = (activeOptionPosition.top - selectorPosition.top) + 'px';
        sliderBackground.style.height = activeOptionPosition.height + 'px';
    }
  }
}



// Function to handle option click
function handleOptionClick(event) {
    const targetOption = event.target;

    // Check if the clicked element is a sliding option
    if (!targetOption.matches('.sliding-selector .options span')) return;

    const selectorElement = targetOption.closest('.sliding-selector');
    const allOptions = selectorElement.querySelectorAll('.options span');
    const sliderBackground = selectorElement.querySelector('.slider-background');

    // Remove the 'selected' class from all options and add it to the clicked one
    allOptions.forEach(opt => opt.classList.remove('selected'));
    targetOption.classList.add('selected');

    // Move the slider background to the clicked option
    const targetOptionPosition = targetOption.getBoundingClientRect();
    const selectorPosition = selectorElement.getBoundingClientRect();

    sliderBackground.style.left = (targetOptionPosition.left - selectorPosition.left) + 'px';
    sliderBackground.style.width = targetOptionPosition.width + 'px';

    // Adjust the vertical position of the slider background to match the clicked option
    sliderBackground.style.top = (targetOptionPosition.top - selectorPosition.top) + 'px';
    sliderBackground.style.height = targetOptionPosition.height + 'px';

    // Apply style to the canvas
    const prop = selectorElement.getAttribute('data-option-prop');
    const value = targetOption.getAttribute('data-value');

    applyStyles(prop, value);
}

// Attach an event listener to the document (event delegation)
document.addEventListener('click', handleOptionClick);







function applyParallaxEffect() {
    let scrollAmount = document.getElementById('canvas-container').scrollTop;
    canvas.forEachObject(object => {
        if (object.originalTop !== undefined) {
            let depth = object.depth || 1;
            let parallaxShift = 0.15 * depth * scrollAmount;
            //object.set('top', object.originalTop + parallaxShift);
        }
    });
    canvas.renderAll();
}


document.getElementById('canvas-container').addEventListener('scroll', applyParallaxEffect);






var elem, isDown, origX, origY;


// Create Rect

let isObjectBeingModified = false; // Track if an object is being edited, resized, or dragged

// Listen for object modification events
canvas.on('object:modified', function() {
    isObjectBeingModified = true;
    activeObject = canvas.getActiveObject()

    MODE = null
});

canvas.on('selection:created', function() {
  //MODE = null
    isObjectBeingModified = true;

});


function handleObject(obj, activeSelection) {
    let absoluteLeft = obj.left;
    let absoluteTop = obj.top;

    if (activeSelection) {
        absoluteLeft = obj.left + activeSelection.left + activeSelection.width/2
        absoluteTop = obj.top + activeSelection.top + activeSelection.height/2
    }

    obj.xPercent = (absoluteLeft + (obj.width * obj.scaleX) / 2 - canvas.width / 2) / canvas.width;
    obj.right = absoluteLeft + (obj.width * obj.scaleX) / 2 - canvas.width;
    obj.center = (absoluteLeft + (obj.width * obj.scaleX) / 2 - canvas.width / 2);

    updateDepth(obj, absoluteTop);
}

function updateDepth(object, top = object.top) {
    let scrollAmount = document.getElementById('canvas-container').scrollTop;
    let depth = object.depth || 1;
    let parallaxShift = 0.15 * depth * scrollAmount;
    object.originalTop = top - parallaxShift
}







canvas.on('object:scaling', function() {
    isObjectBeingModified = true;
});
canvas.on('object:rotating', function() {
    isObjectBeingModified = true;
});





let isCloning = false;



let CLICK = 0


///////////////////////////////////////////////////
//////////////// CREATING ELEMENTS ////////////////
///////////////////////////////////////////////////



function isPathOverRect(path, rect) {
    const pathBounds = path.getBoundingRect();
    const rectBounds = rect.getBoundingRect();

    return pathBounds.left < rectBounds.left + rectBounds.width &&
           pathBounds.left + pathBounds.width > rectBounds.left &&
           pathBounds.top < rectBounds.top + rectBounds.height &&
           pathBounds.top + pathBounds.height > rectBounds.top;
}

function clipPathUsingRect(path, rect) {

rect.clone(function(clonedRect) {
  clonedRect.objectCaching = false
  path.objectCaching = false
    path.clipPath = clonedRect;
    path.stroke = 'red';
    path.objectCaching = false;

    // Rerender to apply changes.
    canvas.requestRenderAll();
});

console.log(path.clipPath)
}




let currentGroup = null;
let editButton = null;



let overlay = new fabric.Rect({
    selectable: false,
    evented: false,
    fill: 'rgba(0, 0, 0, 0.7)', // semi-transparent black
    width: canvas.width,
    height: canvas.height
});






canvas.on('mouse:down', (o) => {
    Id('loader').style.display = 'none';

    // If the activeObject is a drawing group, show the Edit button
    activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type == 'group'){
      currentGroup = activeObject
    }

    if (isObjectBeingModified || canvas.getActiveObject() || CLICK > 0) {
        // Reset and exit early if an object is being modified
        isObjectBeingModified = false;
        CLICK = 0;
        return;
    }

    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    switch (MODE){
        case 'rect':
            elem = new fabric.Rect({
                strokeWidth: 1,
                stroke: 'black',
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: 50,
                height: 50,
                angle: 0,
                fill: 'white',
                transparentCorners: false,
                link: 'https://capsule.pw',
                depth: 2,
                pin: 'center'
            });
            canvas.add(elem);
            canvas.setActiveObject(elem)
            break;
        case 'text':
          elem= new fabric.Textbox('Hello World!', {
              left: origX,
              top: origY,
              fontFamily: 'Gabarito',
              fill: '#000',
              charSpacing: -20,
              fontSize: 16,
              lineHeight: 1,
              fontWeight: 300,
              originX: 'left',
              originY: 'top',
              editable: true,
              link: 'https://capsule.pw',
              depth: 2,
              pin: 'center'
            });
            canvas.add(elem);
            canvas.setActiveObject(elem)
          break;
          case 'video':
            elem = new fabric.Image.fromURL('path_to_thumbnail_image.jpg', function(img) {
                img.set({
                    left: origX,
                    top: origY,
                    originX: 'left',
                    originY: 'top',
                    link: 'https://path_to_video.com',
                    depth: 2,
                    pin: 'center'
                });
                canvas.add(img);
                canvas.setActiveObject(img);
            });
            break;
          case 'image':
            /*
            elem = new fabric.Image.fromURL('https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/sign/images/paine.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvcGFpbmUucG5nIiwiaWF0IjoxNjkzOTcxMTUxLCJleHAiOjE3MjU1MDcxNTF9.jjT84RALo8psjpZnMBFNTGjMmnd5jYmFpyqPi05ul9s&t=2023-09-06T03%3A32%3A31.209Z', function(img) {
              const scaleFactorX = 250 / img.width;
              const scaleFactorY = 250 / img.height;

              img.set({
                  left: origX,
                  top: origY,
                  scaleX: scaleFactorX,
                  scaleY: scaleFactorY,
                  originX: 'left',
                  originY: 'top',
                  depth: 2,
              });

              canvas.add(img);
              canvas.setActiveObject(img);
            });
            */
            break;
        case 'button':
            elem = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: 100,
                height: 50,
                fill: 'rgba(0,0,255,1)',
                label: 'Click Me!',
                link: 'https://capsule.pw',
                depth: 2,
                pin: 'center'
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;
        case 'polygon':
            elem = new fabric.Polygon([
                {x: 0, y: 0},
                {x: 50, y: -80},
                {x: 100, y: 0},
            ], {
                left: origX,
                top: origY,
                fill: 'rgba(0,255,0,1)',
                selectable: true,
                pin: 'center'
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;
        case 'ellipse':
            elem = new fabric.Ellipse({
              strokeWidth: 1,
                stroke: 'black',
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                rx: 40,
                ry: 40,
                fill: 'white',
                depth: 2,
                pin: 'center'
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;

        case 'draw':
            canvas.isDrawingMode = true; // Enable free drawing mode on mouse down
            canvas.freeDrawingBrush.width = 2;
            canvas.freeDrawingBrush.color = "#000";
            canvas.selection = false;
            break;

        case 'erase':
            canvas.isDrawingMode = true; // Enable free drawing mode
            canvas.freeDrawingBrush.width = 20; // Make the brush larger to simulate an eraser
            canvas.freeDrawingBrush.color = "#FFF"; // Set the brush to white to simulate erasing
            break;

        case 'bound':
            let pointer = canvas.getPointer(o.e);
            activeBoundary = new fabric.Rect({
                left: pointer.x,
                top: pointer.y,
                originX: 'left',
                originY: 'top',
                width: 0,
                height: 0,
                //selectable: false,
                stroke: '#d0d0d0',
                fill: 'white',
                pin: 'center',
                hasControls: false,
                rx: 5,
                ry: 5
            });
            canvas.add(activeBoundary);
            break;
        default:
            break;

    }


    if (MODE != 'draw' && MODE != 'erase') {
        canvas.isDrawingMode = false;
        canvas.selection = true
    }


    // MODE = null


    canvas.renderAll()
    saveCanvasToSupabase()

})




canvas.on('mouse:move', function (o) {
    if (MODE === 'bound' && activeBoundary) {
        let pointer = canvas.getPointer(o.e);
        activeBoundary.set({ width: Math.abs(pointer.x - activeBoundary.left), height: Math.abs(pointer.y - activeBoundary.top) });
        canvas.renderAll();
    }

});

canvas.on('mouse:up', function () {

  isDown = false;
/*
  if (currentGroup) {
        // Collect all paths on the canvas and add them to the currentGroup
        let allPaths = canvas.getObjects('path');
        allPaths.forEach(path => {
            currentGroup.addWithUpdate(path);
            canvas.remove(path);
        });


        if (MODE === 'bound' && activeBoundary) {
            currentGroup.setControlVisible('edit', true);
            canvas.remove(activeBoundary);
            activeBoundary = null;
            MODE = 'draw';
        } else {
            MODE = 'bound';
        }
    }


    */

    if (MODE === 'draw' || MODE === 'erase') {

        // Check if there's an active boundary and drawn paths inside it
        if (activeBoundary && currentDrawings.length > 0) {
            // Create a group with the boundary and paths
            let group = new fabric.Group([activeBoundary].concat(currentDrawings), {
                selectable: true // Adjust as per your requirement
            });

            // Add this group to the canvas
            canvas.add(group);
            currentGroup = group;  // Update the current group reference

            // Remove the individual boundary and paths from the canvas
            canvas.remove(activeBoundary);
            currentDrawings.forEach(path => canvas.remove(path));

            // Clear the currentDrawings array and nullify activeBoundary
            currentDrawings = [];
            activeBoundary = null;

            // Optional: If you want to automatically transition back to boundary mode after saving the drawings
            MODE = 'bound';
        }
    } else if (MODE === 'bound') {
        // If in bound mode and a boundary was being drawn, prepare for the drawing mode
        if (activeBoundary) {
            let group = new fabric.Group([activeBoundary], {
                selectable: true
            });
            canvas.add(group);
            currentGroup = group;  // Update the current group reference

            group.setControlVisible('edit', true);

            // Remove the individual boundary from the canvas
            canvas.remove(activeBoundary);

            activeBoundary = null;
            MODE = 'draw';

        }
    }

    // Other modes can be handled similarly
});




function clipByRect(ctx) {
    let boundary = currentGroup.getBoundingRect();
    ctx.rect(boundary.left, boundary.top, boundary.width, boundary.height);
}

canvas.on('path:created', function(event) {
    const originalPath = event.path;
    const boundaryRect = currentGroup.item(0);

    // Extract points from the original path
    let originalPoints = originalPath.path.map(segment => {
        return new fabric.Point(segment[1], segment[2]);
    });

    // Filter points that are inside the boundary
    let clippedPoints = originalPoints.filter(point => boundaryRect.containsPoint(point));

    // If we have any remaining points, recreate the path, else remove the path
    if (clippedPoints.length > 1) {
        let newPathData = "M " + clippedPoints.map(p => p.x + " " + p.y).join(" L ");
        let newPath = new fabric.Path(newPathData);
        newPath.set({
            left: originalPath.left,
            top: originalPath.top,
            stroke: originalPath.stroke,
            strokeWidth: originalPath.strokeWidth,
            fill: originalPath.fill
        });
        canvas.add(newPath);
        currentGroup.addWithUpdate(newPath);
        canvas.remove(originalPath);
    } else {
        canvas.remove(originalPath);
    }

    canvas.renderAll();
});

canvas.on('object:moving', function(e) {
    if (editButton && activeObject.type === 'group') {
        let left = activeObject.left + activeObject.width + 5;
        let top = activeObject.top;

        editButton.set({ left: left, top: top });
    }

    if (activeObject.eventType) {  // Check if it's our created button
        activeObject.setCoords();
        canvas.forEachObject(function(targ) {
           activeObject.setCoords();
            if (targ.eventType && targ != activeObject) {
                if (activeObj.intersectsWithObject(targ)) {
                   activeObject.left = activeObject.originalState.left;
                   activeObject.top = activeObject.originalState.top;
                }
            }
        });
    }
});



window.deleteObject = function(){
  var active = canvas.getActiveObject()
  if (active) {
    canvas.remove(active)
    if (active.type == "activeSelection") {
      active.getObjects().forEach(x => canvas.remove(x))
      canvas.discardActiveObject().renderAll()
    }else{
      canvas.renderAll()
  canvas.calcOffset()
    }
  }
  saveCanvasToSupabase()
}






let isResizing = false;
let lastX;


document.getElementById("handle").addEventListener("mousedown", function(event) {
    isResizing = true;
    lastX = event.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => {
        isResizing = false;
        document.removeEventListener("mousemove", handleMouseMove);
    });
});


function handleMouseMove(event) {
    let deltaX = (event.clientX - lastX)*2
    let container = document.getElementById("container");
    const previousWidth = container.offsetWidth;
    let newWidth = previousWidth + deltaX;

    if (newWidth > 400 && newWidth < window.innerWidth - 260) {
        container.style.width = `${newWidth}px`;
        if (container.offsetWidth !== previousWidth) {
            unifiedResize(container.offsetWidth);
        }
        lastX = event.clientX;
    }
}

canvas.getObjects().forEach((object) => {
    if (!object.originalWidth) {
        object.originalWidth = object.width;
    }
    if (!object.originalLeft) {
        object.originalLeft = object.left;
    }
});


canvas.on('object:added', function(options) {
  const obj = options.target;
  const canvasCenterX = canvas.width / 2;



  // Calculate offset from the center.
  obj.xPercent = (obj.left + (obj.width*obj.scaleX)/2  - canvasCenterX)/ canvas.width


  obj.right = (obj.left + (obj.width * obj.scaleX) / 2 - canvas.width)
  obj.center = (obj.left + (obj.width * obj.scaleX) / 2 - canvas.width / 2)





  obj.set({
    borderColor: '#E0E0E0',
    cornerColor: '#FF004D',
    cornerSize: 10,
    borderScaleFactor: 1.5,
    cornerStrokeColor: 'white',
    cornerStyle: 'circle',
    transparentCorners: false,
    depth: 2,
    shadow: shadow
  });


  // Store initial properties directly in the object.
  obj.originalProperties = {
    left: obj.left,
    top: obj.top,
    width: obj.width,
    height: obj.height,
    scaleX: obj.scaleX,
    scaleY: obj.scaleY,
    xPercent: obj.xPercent
  };


  if (obj.type === 'path') {

      obj.objectCaching = false;
        // Check for overlapping rects and clip if necessary
        canvas.forEachObject(function(object) {
            if (object.type === 'rect' && isPathOverRect(obj, object)) {
                clipPathUsingRect(obj, object);
            }
        });
    }


  if (obj.type !== 'text') {  // Avoid recursion!
        canvas.renderAll();
    }

});




function unifiedResize(newContainerWidth = window.innerWidth - panelWidth) {


  let previousWidth = previousCanvasWidth;

  const newWidth = newContainerWidth;
  const canvasCenterX = newWidth / 2;

  // Set canvas width to the new value
  canvas.setWidth(newWidth);


  // Update position of each object based on xPercent and new canvas width
  canvas.getObjects().forEach((object) => {

    let newLeftPos

    //const newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;

    if (!object.pin){
      object.pin = 'center'
    }

    switch (object.pin) {
        case 'scale':
            newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;
            break;
        case 'left':
            newLeftPos = object.left;
            break;
        case 'right':
            const distanceFromRight = previousWidth - (object.left + object.width * object.scaleX);
            newLeftPos = newWidth - distanceFromRight - object.width * object.scaleX;
            break;
        case 'center':
            const originalCenterDistance = object.left - previousWidth / 2;
            newLeftPos = canvasCenterX + originalCenterDistance;
            break;
        default:
            newLeftPos = object.left;
            break;
    }

      object.set('left', newLeftPos)

      //object.xPercent = (object.left + (object.width * object.scaleX) / 2 - canvas.width / 2) / canvas.width;
      object.setCoords();
  });

  // Adjust the widths of the container and canvas-container
  const container = Id('container');
  const canvasContainer = Id('canvas-container');
  const subContainer = Id('subcontainer');

  if (container) {
      container.style.width = `${newWidth}px`;
  }
  if (canvasContainer) {
      canvasContainer.style.width = `${newWidth}px`;
  }
  if (subContainer) {
      canvasContainer.style.width = `${newWidth}px`;
  }
  //canvas.setWidth(newWidth);

  // Render the canvas
  previousCanvasWidth = newWidth;

  canvas.renderAll();
  canvas.calcOffset();
}



Id('canvas-container').addEventListener('resize', () => unifiedResize());

window.addEventListener('resize', () => unifiedResize());
  window.addEventListener('load', () => unifiedResize())
    setTimeout(() => {
      unifiedResize()
    },300)


    setTimeout(() => {
    document.getElementById('app').style.background = 'white'
}, 3000);

setTimeout(() => {
    document.getElementById('app').style.background = 'white'
}, 1000);



let initialX, initialY;

// Function to add text


function getOverlappingProperties(objects) {

    if (objects.length === 0) {
        return [];
    }

    let overlappingProps = getCurrentObjectProperties(objects[0]);

    for (let i = 1; i < objects.length; i++) {
        const currentProps = getCurrentObjectProperties(objects[i]);
        overlappingProps = overlappingProps.filter(prop => currentProps.includes(prop));
    }

    return overlappingProps;
}

function updateUIFromCanvasObjects(objects) {
    const overlappingProps = getOverlappingProperties(objects);

    overlappingProps.forEach(property => {
        // For simplicity, use the value from the first object
        let value = objects[0][property];

        if (property === 'width') value = Math.round(objects[0].width * objects[0].scaleX);
        if (property === 'height') value = Math.round(objects[0].height * objects[0].scaleY);
        if (property === 'angle') value = Math.round(objects[0].angle);


        updatePropertyElements(property, value);
    });
}



function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleSelection(event) {
  const activeObjects = canvas.getActiveObjects()



  $isPanelVisible = true;

  if(activeObjects.length == 1) {

    let activeObject = activeObjects[0];
  let options = {};

  switch (activeObject.type) {
    case 'textbox':
      options = textTemplate(activeObject);
      break;
    case 'image':
      options = imageTemplate(activeObject);
      break;
    case 'rect':
      options = rectTemplate(activeObject);
      break;
    case 'ellipse':
      options = ellipseTemplate(activeObject);
      break;
    case 'polygon':
      options = polygonTemplate(activeObject);
      break;
    case 'path':
      options = pathTemplate(activeObject);
      break;
    case 'video':
      options = videoTemplate(activeObject);
      break;
    default:
      break;
  }

  let div =
  `
  <h1 id = 'controls-title'> ${capitalize(activeObject.type)} </h1>
  `


  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    let opt = '';



    switch (option.type) {
      /*
      case 'range':
mb
        console.log(activeObject)
        opt = `
        <div id = 'option-${option.id}' class="option option-${option.type}}">
          <label> ${option.label} </label>
          <input id = 'input-${option.id}' class = 'input range' value='${Math.round(activeObject[option.id])}' type="range" min="${option.min}" max="${option.max}" oninput="applyStyles()">
        </div>
        `;
        break;
        */

      case 'number':
        let val = Math.round(activeObject[option.id])
        opt = `
        <div id = 'option-${option.id}' class="option option-${option.type} option-${option.id}">
          <label> ${option.label} </label>

          <img src = '${option.icon}' class = 'icon' alt = 'icon'>
          <div class = 'control'>
            <input id = 'input-${option.id}' step ='${option.step}' class = 'input input-${option.id} number' value='${Math.round(activeObject[option.id])}' type="number" min="${option.min}" max="${option.max}">
            <input id = 'range-${option.id}' step ='${option.step}' class = 'input input-${option.id} range' value='${Math.round(activeObject[option.id])}' type="range" min="${option.min}" max="${option.max}">
          </div>
          </div>
        `;
        break;

        case 'dropdown':
    opt = `
    <div id="option-${option.id}" class="option option-${option.type} option-${option.id}">
        <label>${option.label}</label>
        <img src="${option.icon}" class="icon" alt="icon">

        <div class="sliding-selector" data-option-prop="${option.prop}">
            <div class="options">
    `;

    for (let i = 0; i < option.options.length; i++) {
        let o = option.options[i];
        const isSelected = (activeObject[option.id] == o) ? 'selected' : '';

        console.log(activeObject[option.id], o)
        console.log(activeObject[option.id] == o)
        console.log(isSelected)

        opt += `<span data-value="${o}" class="${isSelected}">${o}</span>`;
    }

    opt += `
            </div>
            <div class="slider-background"></div>
        </div>
    </div>
    `;

    break;


      case 'checkbox':
        const isChecked = activeObject[option.id] ? 'checked' : '';
        opt = `
        <div id="option-${option.id}" class="option option-${option.type} option-${option.id}">
            <label>${option.label}</label>
            <input id="input-${option.id}" class="input ${option.type}" type="${option.type}" oninput="applyStyles(canvas)" ${isChecked} />
        </div>
        `;
        break;

      case 'color':
        opt = `
        <div id="option-${option.id}" class="option option-${option.type} option-${option.id}">
            <label>${option.label}</label>
              <img src = '${option.icon}' class = 'icon' alt = 'icon'>
            <input id="input-${option.id}" class="input ${option.type}" value=${activeObject.fill} type="${option.type}" />
        </div>
        `;
        break;

      default:
        break;
    }

    div += opt;
  }



  div +=
  `
  <div id = 'option-link' class="option option-link">
    <label> Link </label>
    <input id = 'input-link' class = 'input' value = '${activeObject.link}' placeholder='Enter URL here...' type="text" oninput="applyStyles(canvas)">
  </div>

  <div id = 'control'>
    <button id="delete" class='red control-btn' onclick="deleteObject()"> Delete </button>
    <button id="sendToFront" class = 'control-btn' onclick="sendObjectToFront()"> Send to Front </button>
    <button id="sendToBack" class  ='control-btn' onclick="sendObjectToBack()"> Send to Back </button>
  </div>

  `



  SCROLL.innerHTML = div;


  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    switch (option.type) {
      case 'dropdown':
        const newSelector = document.getElementById(`option-${option.id}`);
        positionSliderBackground(newSelector);
        break;
      default:
        break;

    }
  }



  dynamicallyBindListeners()
}else{
  updateUIFromCanvasObjects(activeObjects);
}

}


window.sendObjectToFront = () => {
    if (activeObject) {
        activeObject.bringToFront();
        canvas.renderAll();
        saveCanvasToSupabase()
    }
}

window.sendObjectToBack = () => {
    if (activeObject) {
        activeObject.sendToBack();
        canvas.renderAll();
        saveCanvasToSupabase()
    }
}



function Class(id){
  return document.getElementsByClassName(id)
}



canvas.on('selection:cleared', () => {

  clearGuides()
  isPanelVisible.set(false)
  $isPanelVisible = false
  CLICK++

});


canvas.on('selection:created', handleSelection);
canvas.on('selection:updated', handleSelection);




///////////////////////////////////////////////////
//////////////// UPLOADING IMAGES /////////////////
///////////////////////////////////////////////////


// Assuming supabaseClient is initialized somewhere above
async function fileExistsInSupabase(filePath) {
    const { error } = await supabaseClient.storage.from('images').download(filePath);
    return !error;
}

async function getImageUrlFromSupabase(filePath) {
    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
}

async function uploadToSupabase(file) {
    const filePath = `${data.user.id}/${file.name}`;

    if (await fileExistsInSupabase(filePath)) {
        console.log('File already exists in Supabase. Skipping upload.');
        return filePath;
    }

    const { error } = await supabaseClient.storage.from('images').upload(filePath, file);
    if (error) {
        console.error('Error uploading file:', error);
        return null;
    }
    return filePath;
}

canvas.wrapperEl.addEventListener('dragover', function(e) {

    e.preventDefault();
    Id('canvas').style.opacity = 0.3;
}, false);



async function loadImagesFromSupabase() {

assets.set([])
const path = `${data.user.id}/`; // Construct the path to your subfolder

const { data: files, error } = await supabaseClient.storage.from('images').list(path);


if (error) {
  console.error("Error fetching files:", error);
  return;
}

// Iterate through the files and download each one
for (const file of files) {
  const { data: fileData, error } = await supabaseClient.storage.from(`images/${data.user.id}`).download(file.name);

  if (error) {
    console.error("Error downloading the file:", error);
    continue;
  }


  const url = URL.createObjectURL(fileData);
  assets.update(urls => [...urls, {name: file.name, id: file.id, url: url}]);

}
}



canvas.wrapperEl.addEventListener('drop', async function(e) {
    e.preventDefault();
    Id('canvas').style.opacity = 1;
    const dropPoint = canvas.getPointer(e);  // Get drop position on canvas

    const files = e.dataTransfer.files;
    if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (file.type.includes("image")) {
                let imagePath = await uploadToSupabase(file);
                let imageURL;

                if (imagePath) {
                    imageURL = await getImageUrlFromSupabase(imagePath);
                    loadImagesFromSupabase();
                } else {
                    console.error('Failed to upload image to Supabase.');
                    continue;
                }

                if (typeof imageURL === "string" && imageURL) {
                    fabric.Image.fromURL(imageURL, function(img) {
                        img.scaleToWidth(300);
                        img.scaleToHeight(300);
                        img.set({
                            left: dropPoint.x,
                            top: dropPoint.y,
                            depth: 2,
                        });
                        canvas.add(img);
                        canvas.renderAll();
                        saveCanvasToSupabase();
                    });
                } else {
                    console.error('Invalid imageURL:', imageURL);
                }
            }
            // Handle videos similarly...
        }
    } else {
      const droppedElement = e.dataTransfer.getData('text/html');
      const parser = new DOMParser();
      const parsed = parser.parseFromString(droppedElement, 'text/html');
      const imgTag = parsed.querySelector('img');
      const imageURL = imgTag ? imgTag.src : null;
      const originalFilename = imgTag ? imgTag.dataset.filename : null;

      if (imageURL) {
            fabric.Image.fromURL(`https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/8310ad31-edea-43ca-b02b-4dbf29f7602d/${originalFilename}`, function(img) {
                img.scaleToWidth(300);
                img.scaleToHeight(300);
                img.set({
                    left: dropPoint.x,
                    top: dropPoint.y,
                    depth: 2,
                });
                canvas.add(img);
                canvas.renderAll();
                saveCanvasToSupabase();
            });
      }
    }
}, false);



function addText(x,y) {
  const text = new fabric.IText('Hello World!', {
    left: x,
    top: y,
    fontFamily: 'Arial',
    charSpacing: -30,
    fill: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    editable: true,
    easing: 'easeInOutQuad'
  });
  canvas.add(text);
}



function resizeCanvas() {

  let maxHeight = initialCanvasHeight
  const container = canvas.wrapperEl;
  const oldScrollTop = container.scrollTop;


  canvas.getObjects().forEach((object) => {
    // Calculate the bottom edge position for each object.

    const obj = object
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const buffer = 100; // distance from edge to start expanding canvas

    // Extend Canvas Height
    if ((obj.top + obj.height) > (canvasHeight - buffer) && (obj.top + obj.height) > maxHeight) {
   maxHeight = obj.top + obj.height;
}
  });


  container.scrollTop = oldScrollTop;

  // Add 100px to maxHeight and update canvas height.
  //canvas.setHeight(maxHeight + 100);

  // Update canvas dimensions on the actual HTML element
  canvas.calcOffset();

  // Ensure canvas is re-rendered
  canvas.renderAll();
}




// Function to add image
function addImage(x,y) {
  fabric.Image.fromURL('https://ncvoplbawcrefpsplcue.supabase.co/storage/v1/object/public/images/space/the-prince/icon/shelost_a_vector_scene_from_common_sense_by_thomas_paine_simpl_40d7bd6a-1e44-4fc1-b301-df7c459974b4.png', function(image) {
    image.set({
      left: x,
      top: y,
      scaleX: 0.2,
      scaleY: 0.2,
      easing: 'easeInOutQuad'
    });
    canvas.add(image);
  });
}

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}



// Function to add video
function addVideo(x,y) {
  const videoEl = document.createElement('video');
  videoEl.src = 'sample.mp4'; // Add your video URL here
  videoEl.crossOrigin = 'anonymous';
  const video = new fabric.Image(videoEl, {
    left: x,
    top: y,
    scaleX: 0.2,
    scaleY: 0.2,
    easing: 'easeInOutQuad'
  });
  canvas.add(video);
  video.getElement().play();
}


/*
// Function to add video
function addButton(x,y) {
  const text = new fabric.IText('Hello World!', {
    left: x,
    top: y,
    fontFamily: 'Arial',
    charSpacing: -30,
    fill: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    editable: true,
    padding: 5,
    backgroundColor: '#0074ff'
  });
  canvas.add(text);
}
*/

function addButton(x, y) {
  const text = new fabric.IText('Button', {
    left: x,
    top: y,
    fontFamily: 'Arial',
    fill: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    editable: true,
  });

  const button = new fabric.Rect({
    left: x - text.width/2 - 20,
    top: y - text.height/2 - 15,
    rx: 10, // Border radius
    ry: 10,
    fill: '#0074ff',
    width: text.width + 40,
    height: text.height + 30,
  });

  const group = new fabric.Group([button, text], {
    left: x,
    top: y,
    hasControls: true,
  });


  text.on('modified', function() {
    button.set({
      width: text.width + 20,
      height: text.height + 20,
    });
    group.set({
      width: text.width + 20,
      height: text.height + 20,
    });
    canvas.renderAll();
  });
  canvas.add(group);
}



  canvas.on('mouse:out', function(event) {

    //CONTROLS.style.opacity = '0'
  })


  document.getElementById('pointer').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = null

    $isPanelVisible = false

  });


  // Add text on button click
  document.getElementById('addText').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'text'

  });

  document.getElementById('addPolygon').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'polygon'

  });


  document.getElementById('addDraw').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'bound'
  });


   // Add text on button click
   document.getElementById('addRect').addEventListener('click', ()=> {

    MODE = 'rect'
  });



  document.getElementById('addCircle').addEventListener('click', ()=> {

    MODE = 'ellipse'
  });

  // Add image on button click
  document.getElementById('addImage').addEventListener('click', () => {
    //addImage(10,10);

    MODE = 'image'


    $isPanelVisible = true



    let PANEL = Id('panel')

    PANEL.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.dataTransfer.setData('text/plain', e.target.dataset.url);
    }
});


    let div = `<h1 id = 'title'> Images </h1>`

    for (let i=0; i<$assets.length; i++){
      let asset = $assets[i]

      div +=
        `
        <img src="${asset.url}" data-filename="${asset.name}" alt="image" draggable="true" data-url="${asset.url}">
        `;
    }

    SCROLL.innerHTML = div

  });

  /*
  // Add video on button click
  document.getElementById('addVideo').addEventListener('click', () => {
    //addText(10,10);

     MODE = 'video'
  });
  */

  // Add video on button click
  document.getElementById('addButton').addEventListener('click', () => {
    //addButton(10,10);

    MODE = 'button'
  });

  canvas.on('text:editing:entered', (textObject) => {
  // calculate canvas offset and textObject offset and scroll to this position
  })


  /////




  function removeGrid() {
    gridLines.forEach(line => {
        canvas.remove(line);
    });
    gridLines = [];
  }

  function calculateGrid() {
    xArr = [];
    yArr = [];

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    const columns = 40;  // The number of columns you want.
    const gridSpacing = canvasWidth / columns; // Now gridSpacing is dynamic.

    for(let x = 0; x <= canvasWidth; x += gridSpacing) {
        xArr.push(x);
    }

    // Assuming you want to keep the aspect ratio the same for rows as well.
    for(let y = 0; y <= canvasHeight; y += gridSpacing) {
        yArr.push(y);
    }
  }

  function drawGrid() {
    // Draw the grid on the canvas
    removeGrid();

    const zoom = canvas.getZoom();
    const pan = canvas.viewportTransform;

    // Get pan offsets
    const panOffsetX = pan[4];
    const panOffsetY = pan[5];

    xArr.forEach(x => {
        yArr.forEach(y => {
            const circle = new fabric.Circle({
                radius: 2,  // You can adjust the size of the dots here
                fill: '#000',
                left: (x + panOffsetX) / zoom,  // Adjust position considering pan and zoom
                top: (y + panOffsetY) / zoom,
                selectable: false,
                opacity: 0.1,
                excludeFromExport: true
            });
            canvas.add(circle);
            canvas.sendToBack(circle);
            gridLines.push(circle); // Populate gridLines array with dots
        });
    });
}


////////////////////////////// TEMPLATES //////////////////////////////


  function textTemplate(activeObject) {
    const options = [
      { label: 'Font', id: 'fontFamily', type: 'dropdown', prop: 'fontFamily', icon: IconT, value: activeObject.fontFamily, options: ['Arial', 'Newsreader', 'Gabarito', 'Helvetica', 'Times New Roman', 'Courier New'] },
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Letter Spacing', id: 'charSpacing', prop: 'charSpacing', icon: IconLS, type: 'number', value: activeObject.charSpacing || 0, min: -50, max: 50 },
      { label: 'Font Size', id: 'fontSize', type: 'number', step: 1, icon: IconS, prop: 'fontSize', value: activeObject.fontSize || 20, min: 5, max: 100 },
      { label: 'Text Align', id: 'textAlign', type: 'dropdown', icon: IconP, prop: 'textAlign', value: activeObject.textAlign, options: ['left', 'center', 'right'] },
      { label: 'Font Weight', id: 'fontWeight', type: 'number', icon: IconB, step: 100,prop: 'fontWeight', value: activeObject.fontWeight || 500, min: 100, max: 900 },
      { label: 'Font Style', id: 'fontStyle', type: 'dropdown', icon: IconT, prop: 'fontStyle', value: activeObject.fontStyle, options: ['normal', 'italic', 'oblique'] },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0,  max: 360 },
        { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },


      { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5 },
    ];

    return options;
  }

  function buttonTemplate(activeObject) {
    const options = [
      { label: 'Border Radius', id: 'borderRadius', type: 'range', value: activeObject.borderRadius || 0, min: 0, max: 50 },
      { label: 'Color', id: 'buttonColor', type: 'color', value: activeObject.backgroundColor || '#FFFFFF' },
      // Add padding if needed
      { label: 'Padding', id: 'buttonPadding', type: 'number', value: activeObject.padding || 10 }
    ];
    return options;
  }

  function imageTemplate(activeObject) {
    return [
      { label: 'Width', id: 'width', type: 'number', icon: IconW, value: activeObject.width * activeObject.scaleX, min: 0, max: 1000, },
      { label: 'Height', id: 'height', type: 'number', icon: IconH, value: activeObject.height * activeObject.scaleY, min: 0, max: 1000, },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
      { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'originalTop', type: 'number', icon: IconY, value: activeObject.originalTop, min: 0, max: 1000 },

      { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5 },
    ];
  }

  function rectTemplate(activeObject) {
    return [
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Stroke', id: 'stroke', type: 'color', prop: 'stroke', icon: IconC, value: activeObject.stroke },
      { label: 'Width', id: 'width', type: 'number', icon: IconW, value: activeObject.width * activeObject.scaleX, min: 0, max: 1000, },
      { label: 'Height', id: 'height', type: 'number', icon: IconH, value: activeObject.height * activeObject.scaleY, min: 0, max: 1000, },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
      { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },


      { label: 'strokeWidth', id: 'strokeWidth', type: 'number', icon: IconW, value: activeObject.strokeWidth, min: 0, max: 10, },

      { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5},
    ];
  }

  function pathTemplate(activeObject) {
    return [
        { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
        { label: 'Stroke', id: 'stroke', type: 'color', prop: 'stroke', icon: IconC, value: activeObject.stroke },
        { label: 'Stroke Width', id: 'strokeWidth', type: 'number', icon: IconW, value: activeObject.strokeWidth, min: 0, max: 10 },
        { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
        { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
        { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },
        { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },
        { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5 },
    ];
}

function polygonTemplate(activeObject) {
    return [
        { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
        { label: 'Stroke', id: 'stroke', type: 'color', prop: 'stroke', icon: IconC, value: activeObject.stroke },
        { label: 'Stroke Width', id: 'strokeWidth', type: 'number', icon: IconW, value: activeObject.strokeWidth, min: 0, max: 10 },
        { label: 'Points', id: 'points', type: 'text', icon: IconP, value: JSON.stringify(activeObject.points) }, // This is an assumption. You may want a more interactive UI for editing points.
        { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
        { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
        { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },
        { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },
        { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5 },
    ];
}

  function ellipseTemplate(activeObject) {
    return [
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Stroke', id: 'stroke', type: 'color', prop: 'stroke', icon: IconC, value: activeObject.stroke },
      { label: 'Width', id: 'width', type: 'number', icon: IconW, value: activeObject.width * activeObject.scaleX, min: 0, max: 1000, },
      { label: 'Height', id: 'height', type: 'number', icon: IconH, value: activeObject.height * activeObject.scaleY, min: 0, max: 1000, },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
      { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },

      { label: 'strokeWifth', id: 'strokeWidth', type: 'number', icon: IconW, value: activeObject.strokeWidth, min: 0, max: 10, },



      { label: 'Pin', id: 'pin', type: 'dropdown', icon: IconP, prop: 'pin', value: activeObject.pin, options: ['scale', 'left', 'center', 'right'] },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max:  5},
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




window.addEventListener('keyup', e => {

  switch (e.code){
    case 'Backspace':
      //deleteObject()
      break;
    case 'KeyF':
      toggleFullScreen()
      break;
    default:
      break;
  }
})







////////



function preventScroll(event) {
    //event.preventDefault();
}
function saveCanvasToSupabase() {
    // Center of the canvas
    const canvasCenterX = canvas.width / 2;

    saved = false


    let initialCanvasWidth = canvas.width


    canvas.getObjects().forEach((obj) => {
      /*
        if (object.originalWidth && object.originalWidth <= canvas.getWidth() * 0.95) {
            object.set({
                scaleX: 1,
                scaleY: 1,
                left: object.originalLeft,
                width: object.originalWidth
            }).setCoords();
        }
        */


        //obj.xPercent = (obj.left + (obj.width * obj.scaleX) / 2 - canvas.width / 2) / canvas.width;
    });

    // Save the scroll position
    const scrollTop = Id('canvas-container').scrollTop;
    const backupGridLines = [...gridLines];

    // Calculate original dimensions
    const originalCanvasWidth = window.innerWidth - panelWidth;
    const aspectRatio = initialCanvasHeight / initialCanvasWidth;
    const originalCanvasHeight = originalCanvasWidth * aspectRatio;

    // Backup current size and position of all objects
    const backupObjects = canvas.getObjects().map(object => ({
        left: object.left,
        top: object.top,
        xPercent: object.xPercent,
        scaleX: object.scaleX,
        scaleY: object.scaleY
    }));

    const newWidth = window.innerWidth - panelWidth;

    const previousWidth = originalCanvasWidth


    canvas.setWidth(originalCanvasWidth);

/*
    // Adjust object positions relative to the center of the canvas before upload
    canvas.getObjects().forEach(object => {

      if (!object.pin){
        object.pin = 'center'
      }

      let newLeftPos

      switch (object.pin) {
          case 'scale':
              newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;
              break;
          case 'left':
              newLeftPos = object.left;
              break;
          case 'right':
              const distanceFromRight = previousWidth - (object.left + object.width * object.scaleX);
              newLeftPos = newWidth - distanceFromRight - object.width * object.scaleX;
              break;
          case 'center':
              const originalCenterDistance = object.left - previousWidth / 2;
              newLeftPos = canvasCenterX + originalCenterDistance;
              break;
          default:
              newLeftPos = object.left;
              break;
      }

      object.set('left', newLeftPos)
    });
    */

    // Remove clipping (if any)
   // canvas.clipTo = null;

    // Temporarily reset the canvas to its full/original size


    //canvas.setHeight(originalCanvasHeight);

    // Upload the full canvas version to the database


    setTimeout(() => {
      uploadCanvas();

      // Restore the canvas to the backed-up size and reposition all objects
      canvas.setWidth(initialCanvasWidth);

      const scaleX = newWidth / originalCanvasWidth;
      canvas.clipTo = function(ctx) {
          ctx.rect(0, 0, newWidth, originalCanvasHeight * scaleX);
          ctx.clip();
      };

      canvas.renderAll();
      canvas.calcOffset();

      gridLines = backupGridLines;
      gridLines.forEach(circle => canvas.add(circle));

      // Restore the scroll position
      Id('canvas-container').scrollTo({
          top: scrollTop,
      });
      Id('canvas-container').scrollTop = scrollTop
    }, 1000);




    // Remove the event listener to allow scrolling
    window.removeEventListener('scroll', preventScroll);
}




async function uploadCanvas() {
    // Retrieve the session token
    const session = data.session
    const token = session?.access_token;





    if (!token) {
        console.error('No session token available');
        return;
    }

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    // Serialize the current canvas state
    const canv = canvas.toJSON(['link', 'depth', 'xPercent', 'scaler', 'originalProperties', 'originalTop', 'pin', 'right', 'center']);
    const json = JSON.stringify(canv);

    // Prepare the file for Supabase Storage
    const fileName = `${data.id}.json`;  // Assuming the ID is unique and suitable for a filename

    const uploadFile = async () => {
        return await supabaseClient.storage
            .from('fabric')
            .upload(fileName, new Blob([json], { type: 'application/json' }), { upsert: true }, headers);
    };

    let uploadResponse = await uploadFile();

    if (uploadResponse.error && uploadResponse.error.statusCode === '409') {
        // If duplicate error, try to delete the old file
        const { error: deleteError } = await supabaseClient.storage
            .from('fabric')
            .remove([fileName], headers);

        if (deleteError) {
            console.warn('Error deleting existing file:', deleteError);
            return;
        }

        // Retry the upload after deleting the old file
        uploadResponse = await uploadFile();
    }

    // Handle upload errors
    if (uploadResponse.error) {
        console.error('Error uploading to Supabase Storage: ', uploadResponse.error);
        return;
    }

    // Save the reference to the Supabase database
    const { data: dbData, error: dbError } = await supabaseClient
        .from('pages')
        .upsert([
            {
              id: data.id,
              title: title,
              content: fileName,  // Storing the file name as the reference
              iwidth: canvas.width,
              color: color,
              height: height
            }
        ]);

    if (dbError) {
        console.error('Error saving reference to database: ', dbError);
    } else {

      saved = true
      console.log('Saved!')
    }
}


  function downloadCanvasAsJSON() {
    // Serialize the canvas to JSON

    const canv = canvas.toJSON(['link', 'depth']);
    const json = JSON.stringify(canv);

    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: 'application/json' });

    let url = URL.createObjectURL(blob);

    // Create an anchor element and set its attributes
    const a = document.createElement('a');
    a.href = url
    a.download = 'canvas.json';

    // Append the anchor to the DOM and simulate a click to start the download
    document.body.appendChild(a);
    a.click();

    // Clean up: remove the anchor from the DOM and revoke the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // You can bind this function to a button click or some other event
  // document.getElementById('downloadJSON').addEventListener('click', downloadCanvasAsJSON);
 // document.getElementById('upload').addEventListener('click', saveCanvasToSupabase);
  // document.getElementById('delete').addEventListener('click', deleteObject);
  document.getElementById('title').addEventListener('input', saveCanvasToSupabase);
  //document.getElementById('exitEditMode').addEventListener('click', handleExit);


  let togglable = true

  function toggleFullScreen(){
    $MAX = !$MAX

    if (!togglable){
      return
    }

    togglable = false

    if (!$MAX){
      Id('container').classList.remove('max')
      Id('canvas-container').classList.remove('max')
      Id('subcontainer').classList.remove('max')
      Id('gradient-top').style.opacity = 1
      Id('gradient-bottom').style.opacity = 1
      Id('buttons').style.left = '15px'
      Id('mast').style.top = '15px'

      unifiedResize(window.innerWidth - 260)

      setTimeout(() => {
        Id('container').style.transition = 'none'
        Id('canvas-container').style.transition = 'none'
        Id('canvas').style.transition = 'none'
        togglable = true
      }, 500);
    }else{
      Id('container').style.transition = '0.4s ease'
      Id('canvas-container').style.transition = '0.4s ease'
      Id('canvas').style.transition = '0.4s ease'
      Id('gradient-top').style.opacity = 0
      Id('gradient-bottom').style.opacity = 0

      Id('buttons').style.left = '-35px'
      Id('mast').style.top = '-30px'

      setTimeout( () => {
        Id('container').classList.add('max')
        Id('canvas-container').classList.add('max')
        Id('subcontainer').classList.add('max')
        togglable = true
      }, 200);


      let width = canvas.width

      if (width < window.innerWidth){
        while (width < window.innerWidth){
          unifiedResize(width)
          width += 10
        }
      }


    }
  }

  document.getElementById('max').addEventListener('input', toggleFullScreen);

  /*
  document.getElementById('url').addEventListener('click', () => {
    // Assuming data.id is defined somewhere in your code
    const textToCopy = `https://xylophone.dev/p/${data.id}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert(`Copied the text: ${textToCopy}`);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  });
  */
});

</script>

