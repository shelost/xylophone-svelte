<div id = 'app'>

  <div id = 'container' in:fly={{ y: 100, duration: 500 }}>
      <div id = 'bar'>
        <input id = 'title' bind:value = {title} placeholder = 'Untitled Page' style='outline: none !important;'>

        <div id = 'buttons'>
          <div class = 'add' id="addText"  class:active = { MODE == 'text' } >
            <img src = {Text} class = 'icon'  alt = 'icon'>
          </div>
          <div class = 'add' id="addImage" class:active = { MODE == 'image' }>
            <img src = {Image} class = 'icon'  alt = 'icon'>
          </div>
          <div class = 'add' id="addVideo" class:active = { MODE == 'video' }>
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
            <img src = {Ellipse} class = 'icon'  alt = 'icon'>
          </div>

          <div>
            <input type="color" id="color" name="head" bind:value={color} />
          </div>

      </div>


      <!--
  <div id = 'controls'>

    <div id = 'buttons'>
        <div class = 'add' id="addText"  class:active = { MODE == 'text' } >
          <img src = {Text} class = 'icon'  alt = 'icon'>
        </div>
        <div class = 'add' id="addImage" class:active = { MODE == 'image' }>
          <img src = {Image} class = 'icon'  alt = 'icon'>
        </div>
        <div class = 'add' id="addVideo" class:active = { MODE == 'video' }>
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

        <div>
          <input type="color" id="color" name="head" bind:value={color} />
        </div>


        <div id = 'align'>
        </div>
    </div>

-->
</div>




      <div id = 'canvas-container'>

        <div id="loader"></div>

        <canvas id = 'canvas'></canvas>
    <!-- id="resize-handle"></div>-->
      </div>




  </div>


</div>




<svelte:head>
	<title> Xylophone | Build Freely </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={icon} />
</svelte:head>



<style lang='scss'>

  ::-webkit-scrollbar{
      width: 3px;
      height: 0;
      width: 0;
      background: rgba(black, 0.1);
  }

  ::-webkit-scrollbar-thumb{
      background: rgba(black, 0.4);
  }

  #app{
      width: 100vw;
      margin-top: 0px;
      height: calc(100vh);


      padding-left: 240px;

      //padding-left: 240px;

      overflow: visible !important;



      //border: 1px solid rgba(black, 0.1);

      //box-shadow: 0px 10px 50px rgba(black, 0.1);

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

  #canvas-container{
    //height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 45px;


    overflow-y: scroll;
    width: calc(100vw - 250px) !important;
    height: 100vh;

    background: none;


    //border: 1px solid rgba(black, 0.05);

    #canvas{
      flex-shrink: 0;

      width: calc(100vw - 250px);
      margin: 0;
  }

    #resize-handle{
      cursor: ew-resize;
      height: 30px;
      width: 10px;
      background: #333;
      z-index: 10;
    }

    #loader {
      position: absolute;
      left: calc(50% + 0px);
      top: calc(50% - 30px);
      z-index: 1;
      width: 50px;
      height: 50px;
      border: 4px solid rgba(black, 0.1);
      border-radius: 50%;
      border-top: 4px solid black;
      animation: spin 1s linear infinite;
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
    width: 20px;
    height: 20px;
    transition: 0.2s ease;
    margin-top: 3px;
    border: 1px solid rgba(white, 0.3), 2px solid rgba(black, 0.3);
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


  .add{
    //background: rgba(black, 0.1);
    color: black;
    box-shadow: none;

    width: 28px;
    height: 28px;
    border-radius: 3px;
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
      width: 14px;
      height: 14px;

    }
  }


  /*
  #controls{

    position: fixed;

    z-index: 3;
    margin-top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45px;
      width: calc(100vw - 240px);
      background: black;

      #buttons{
          display: flex;
          align-items: center;
          gap: 0px;


          button{
            width: 20px;
            height: 20px;
            filter: invert(100%);
          }
      }

  }
  */




  :global(.option){
      font-size: 12px;
      display: flex;
      flex-direction: column;
    }



  .active{
      opacity: 1;
  }

  #container {
      flex-grow: 1;
      width: calc(100vw - 260px);
      height: calc(100vh - 30px);
      margin-top: 15px;

      //border: 1px solid rgba(black, 0.1);

      box-shadow: 0px 30px 100px rgba(black, 0.1);





      display: flex;
      flex-direction: column;
      overflow-x:hidden;
      overflow-y: hidden;

      border-radius: 5px;


      #bar{

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;



        height: 45px;
        border-radius: 5px 5px  0 0;
        border-bottom: 1px solid rgba(black, 0.02);
        //box-shadow: 0px 20px 60px rgba(black, 0.05);
        width: calc(100vw - 260px);
        position: fixed;
        color: black;

        z-index: 3;


        //border-bottom: 1px solid rgba(black, 0.1);


        #title{
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.3px;
          padding: 0 5px;
          height: 24px;
        }

        #buttons{
          display: flex;
          align-items: center;
          gap: 10px;
        }

        button{
          display: none;
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

#app #container #bar #title{
    background: none !important;
    border: none !important;
    outline: none !important;


    &:focus{
        border: none !important;
        outline: none !important;
        -webkit-appearance: none !important;

    }
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
    background: blue !important;
  }


  @media screen and (max-width: 800px){

    #app{
      width: 100vw !important;
      border: 2px solid blue;
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
import Triangle from '$lib/img/i-triangle.svg'
import Rect from '$lib/img/i-rect.svg'
import Ellipse from '$lib/img/i-ellipse.svg'
import Copy from '$lib/img/copy.svg'

import { fly } from 'svelte/transition'

import Grid from '$lib/components/Grid.svelte'
import { object_without_properties } from 'svelte/internal';

//import { pages, isPanelVisible } from '$lib/utils/store.js'; // Adjust the path as necessary

import { pages, isPanelVisible } from '$lib/utils/store.js'; // Adjust the path as necessary


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


export let data

let title= data.title
let color = data.color
let activeObject;
let MODE


onMount(()=> {
  // Initialize fabric.js canvas

  let id = $page.params.slug
  //let data = get(pages).find(page => page.id === id);

  MODE = 'text'
  title = data.title
  color = data.color


  function Id(e){
    return document.getElementById(e)
  }


  const panelWidth = 250


  const PANEL = Id('panel')

  let initialCanvasWidth = window.innerWidth - panelWidth;  // Initial canvas width, 250 is the panel width
  let initialCanvasHeight = window.innerHeight;  // Initial canvas height


  let canvas = new fabric.Canvas('canvas', {
      width: initialCanvasWidth,
      height: initialCanvasHeight,
      renderOnAddRemove: false,
  });

  resize()




  var cloneImg = document.createElement('img');
  cloneImg.src = Copy


  fabric.Object.prototype.controls.clone = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 5,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 18
  });


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
      opacity: 0.4,
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


  clearGuides();  // Clear old guides

    let activeObject = event.target;

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

});





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
  const properties = ['width', 'height', 'angle', 'fontFamily', 'fill', 'charSpacing', 'fontSize', 'textAlign', 'fontWeight', 'fontStyle', 'fill', 'depth'];

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

        activeObject.dirty = true;
        activeObject.textBackgroundColor = 'rgba(0,0,0,0)'
        console.log(activeObject.fill)
        canvas.requestRenderAll();
    }
  });




  canvas.requestRenderAll();
  canvas.renderAll();
  canvas.calcOffset();
  saveCanvasToSupabase();
};



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

      default:
        return []
        break
    }



}

function dynamicallyBindListeners() {
    activeObject = canvas.getActiveObject();
    const properties = getCurrentObjectProperties(activeObject);

    properties.forEach(property => {

        attachInputListeners(`input-${property}`, property);
        attachInputListeners(`range-${property}`, property);
    });
}





// Input Correspondence

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
        Id('input-width').value = Math.round(obj.width * obj.scaleX)
        Id('input-height').value = Math.round(obj.height * obj.scaleY)
        Id('range-width').value =  Math.round(obj.height * obj.scaleY)
        Id('range-height').value =Math.round(obj.width * obj.scaleX)
    }

    console.log('start')

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
    saveCanvasToSupabase()
    dynamicallyBindListeners();
    updateUIFromCanvasObject(event.target);

});











///////////////////////////////////////////////////
////////////////// LOAD CANVAS ////////////////////
///////////////////////////////////////////////////


  let xArr = Array.from({length: 40}, (_, i) => i * 40);
  let yArr = Array.from({length: 40}, (_, i) => i * 40);
  let gridLines = [];


  Id('bar').style.background = data.color
  canvas.setBackgroundColor(data.color, () => canvas.renderAll());

  setTimeout(() => {


  if (
    data &&
    data.content &&
    canvas &&
    document &&
    document.readyState === 'complete'
  ) {
    try {
      const parsedContent =
        typeof data.content === 'string'
          ? JSON.parse(data.content)
          : data.content;


      canvas.loadFromJSON(parsedContent, () => {
        try {
          canvas.setBackgroundColor(data.color, () => canvas.renderAll());
          resizeCanvas();
          resize(0)

         setTimeout(() => {
         // resizeInitial()
         }, 1000);

         Id('loader').style.opacity = 0



         calculateGrid()
          drawGrid()


          let maxHeight = window.innerHeight

          canvas.forEachObject((object) => {
            const bottomEdge = object.top + object.height;
            object.originalTop = object.top;
            if (bottomEdge > maxHeight) {
              maxHeight = bottomEdge;
            }
          });

          // Add buffer and update canvas height
          const buffer = 100;
          canvas.setHeight(maxHeight + 100); // additional 100px as per your requirement





          canvas.renderAll();
          canvas.calcOffset();


          console.log('drawed');
        } catch (error) {
          console.error('Error in canvas callback:', error);
        }
      },
      function (o, object) {

        if (object){
          object.set({
            borderColor: 'red',
            cornerColor: '#FF005C',
            cornerSize: 5,
            transparentCorners: false,
          });
        }

      });

    } catch (error) {
      console.error('Error loading canvas:', error);
    }
  }
}, 500);


setTimeout(() => {

      const parsedContent =
        typeof data.content === 'string'
          ? JSON.parse(data.content)
          : data.content;

          canvas.setBackgroundColor(data.color, () => canvas.renderAll());

           Id('bar').style.background = data.color
          Id('loader').style.opacity = 0
      canvas.loadFromJSON(parsedContent, () => {



        calculateGrid()
          drawGrid()


        canvas.renderAll()
        canvas.calcOffset()

        canvas.forEachObject((object) => {
            object.originalTop = object.top;
          });

      })

},2000)


Id('color').addEventListener('input', e => {
  canvas.setBackgroundColor(Id('color').value, () => canvas.renderAll());
  Id('bar').style.background = Id('color').value
  saveCanvasToSupabase()
})



function applyParallaxEffect() {

  drawGrid()
  /*
    let scrollAmount = document.getElementById('container').scrollTop;

    canvas.forEachObject(object => {
        let depth = object.depth || 0;
        let parallaxShift = 0.2 * depth * scrollAmount;

        // Use the originalTop (which isn't affected by parallax) and add the shift.
        let newTopPosition = object.originalTop + parallaxShift;
        object.set('top', newTopPosition);
    });

    canvas.renderAll();
    */
}


// Listen for the scroll event
document.getElementById('container').addEventListener('scroll', applyParallaxEffect);








var elem, isDown, origX, origY;


// Create Rect

let isObjectBeingModified = false; // Track if an object is being edited, resized, or dragged

// Listen for object modification events
canvas.on('object:modified', function() {
    isObjectBeingModified = true;
   // applyParallaxEffect();
});

canvas.on('selection:created', function() {
    isObjectBeingModified = true;
});


canvas.on('object:moving', function() {
    let activeObject = canvas.getActiveObject();

    if (activeObject) {
        let depth = activeObject.depth || 0;
        let scrollAmount = document.getElementById('container').scrollTop;

        // Adjust for parallax shift during dragging
        let parallaxShift = 0.2 * depth * scrollAmount;

        // Set the 'originalTop' relative to the entire canvas height
        activeObject.originalTop = activeObject.top - parallaxShift;
    }
});






canvas.on('object:moving', function() {
   //debouncedResize()
    if (activeObject){
      console.log(activeObject.originalTop)
    activeObject.originalTop = activeObject.top
    activeObject.set('originalTop', activeObject.top)
  }
    isObjectBeingModified = true;
});
canvas.on('object:scaling', function() {
    isObjectBeingModified = true;
});
canvas.on('object:rotating', function() {
    isObjectBeingModified = true;
});





let isCloning = false;

/*
const handleObjectMoving = (e) => {
    const activeObject = e.target;

    if (!e.e.altKey || isCloning) return;

    isCloning = true;

    activeObject.clone((cloned) => {
        cloned.set({
            top: activeObject.top,
            left: activeObject.left
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.requestRenderAll();
    });
};

const handleObjectMoved = () => {
    isCloning = false;
};

canvas.on('object:moving', handleObjectMoving);
canvas.on('object:moved', handleObjectMoved);

canvas.on('object:added', (e) => {
    const obj = e.target;

    // Attach the moving and moved listeners to the newly added object
    obj.on('moving', handleObjectMoving);
    obj.on('moved', handleObjectMoved);
});


*/


let CLICK = 0



///////////////////////////////////////////////////
//////////////// CREATING ELEMENTS ////////////////
///////////////////////////////////////////////////



for (let i=0; i<Class('add').length; i++){
  Class('add')[i].addEventListener('click', addObject)
}


function addObject(){
    if (isObjectBeingModified || canvas.getActiveObject() || CLICK > 0) {
        // Reset and exit early if an object is being modified
        isObjectBeingModified = false;
        CLICK = 0
        return;
    }

    isDown = true;
    //var pointer = canvas.getPointer(o.e);
    origX = 30
    origY = 30

    switch (MODE){
        case 'rect':
            elem = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: 50,
                height: 50,
                angle: 0,
                fill: 'rgba(255,0,0,1)',
                transparentCorners: false,
                link: 'https://capsule.pw',
                depth: 2,
            });
            canvas.add(elem);
            canvas.setActiveObject(elem)
            break;
        case 'text':
          elem= new fabric.Textbox('Hello World!', {
              left: origX,
              top: origY,
              fontFamily: 'Helvetica',
              fill: '#000',
              charSpacing: -20,
              fontSize: 16,
              lineHeight: 1,
              fontWeight: '300',

              originX: 'left',
              originY: 'top',
              width: 100,
              editable: true,
              link: 'https://capsule.pw',
              depth: 2,
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
                });
                canvas.add(img);
                canvas.setActiveObject(img);
            });
            break;
          case 'image':
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
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;
        case 'triangle':
            elem = new fabric.Triangle({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: 100,
                height: 100,
                fill: 'rgba(0,255,0,1)',
                depth: 2,
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;
        case 'ellipse':
            elem = new fabric.Ellipse({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                rx: 40,
                ry: 40,
                fill: 'rgba(0,0,255,1)',
                depth: 2,
            });
            canvas.add(elem);
            canvas.setActiveObject(elem);
            break;

        case 'draw':
            canvas.isDrawingMode = true; // Enable free drawing
            canvas.freeDrawingBrush.width = 5; // Set brush width
            canvas.freeDrawingBrush.color = "#000"; // Set brush color
            break;

        case 'erase':
            canvas.isDrawingMode = true; // Enable free drawing mode
            canvas.freeDrawingBrush.width = 20; // Make the brush larger to simulate an eraser
            canvas.freeDrawingBrush.color = "#FFF"; // Set the brush to white to simulate erasing
            break;
        default:
            canvas.isDrawingMode = false;
            break;

    }


    if (MODE !== 'draw' && MODE !== 'erase') {
        canvas.isDrawingMode = false;
    }



    canvas.renderAll()
    saveCanvasToSupabase()


}






window.deleteObject = function(){
  var active = canvas.getActiveObject()
  if (active) {
    canvas.remove(active)
    if (active.type == "activeSelection") {
      active.getObjects().forEach(x => canvas.remove(x))
      canvas.discardActiveObject().renderAll()
    }
  }
  canvas.renderAll()
  canvas.calcOffset()
  saveCanvasToSupabase()
}


canvas.on('mouse:over', function(e) {
    canvas.renderAll();
});



// Function to reflow text inside a bounding box
function reflowText(obj, newWidth) {
  var words = obj.text.split(' ');
  var tempLine = '';
  var newLines = [];

  for (var i = 0; i < words.length; i++) {
    var testLine = `${tempLine}${words[i]} `;
    var testLineWidth = obj.getLineWidth(0, testLine);

    if (testLineWidth > newWidth) {
      newLines.push(tempLine);
      tempLine = `${words[i]} `;
    } else {
      tempLine = testLine;
    }
  }
  newLines.push(tempLine);
  obj.set({
    text: newLines.join('\n'),
    width: newWidth,
    scaleX: 1
  });
}










/*
canvas.on('mouse:move', function(o){
    if (!isDown || isObjectBeingModified) return;  // Also check isObjectBeingModified here
    var pointer = canvas.getPointer(o.e);

    switch (MODE){
        case 'rect':
          let pointer = canvas.getPointer(o.e);

            if(origX > pointer.x){
                elem.set({ left: Math.abs(pointer.x) });
            }
            if(origY > pointer.y){
                elem.set({ top: Math.abs(pointer.y) });
            }

            elem.set({ width: Math.abs(origX - pointer.x) });
            elem.set({ height: Math.abs(origY - pointer.y) });

            break;
        default:
            break;
    }

    canvas.renderAll();
});
*/





canvas.on('mouse:up', function(o){
  isDown = false;
});


  window.addEventListener('load', function () {
    console.log('loaded')
    resize()
  });



  function resizeInitial(initial = 1) {
    let newWidth = window.innerWidth - panelWidth;

    if (window.innerWidth < 800){
        newWidth = window.innerWidth;
    }

    let scaleX = newWidth / initialCanvasWidth;
    if (initial === 0){
        scaleX = newWidth / data.iwidth;
    }

    // Calculate center shift difference to maintain the centering
    const centerShiftX = (canvas.getWidth() - newWidth) / 2;

    // Scale and center each object
    canvas.getObjects().forEach((object) => {
        object.left = (object.left - centerShiftX) * scaleX;
        object.scaleX *= scaleX;
        object.top *= scaleX;
        object.scaleY *= scaleX;
        object.setCoords();
    });


    // Clip objects to canvas boundaries
    canvas.clipTo = function(ctx) {
        ctx.rect(0, 0, newWidth, initialCanvasHeight * scaleX);
        ctx.clip();
    };

    // Update canvas dimensions
    canvas.setWidth(newWidth);
    canvas.setHeight(initialCanvasHeight * scaleX);
    canvas.renderAll();
    canvas.calcOffset();

    // Also adjust the actual HTML canvas size
    canvas.getElement().style.width = `${initialCanvasWidth}px`;
    canvas.getElement().style.height = `${initialCanvasHeight * scaleX}px`;

    // Adjust the width of the canvas container
    document.getElementById('canvas-container').style.width = `${initialCanvasWidth}px`;

    // Update initial dimensions
    initialCanvasHeight = canvas.getHeight();
}



function resize(initial = 1) {
    let newWidth = window.innerWidth - panelWidth;

    if (window.innerWidth < 800){
        newWidth = window.innerWidth;
    }


    let scaleX = newWidth / initialCanvasWidth;
    if (initial === 0){
        scaleX = newWidth / data.iwidth;
    }

    // Calculate center shift difference to maintain the centering
    const centerShiftX = (canvas.getWidth() - newWidth) / 2;


    let maxHeight = initialCanvasHeight
    // Adjust object positions without scaling them
    canvas.getObjects().forEach((object) => {
        object.left -= centerShiftX;
        object.setCoords();


        if (object.top + object.height > maxHeight){
          maxHeight = object.top + object.height
        }
    });

    // Clip objects to canvas boundaries (if necessary)
    canvas.clipTo = function(ctx) {
        ctx.rect(0, 0, newWidth, canvas.getHeight());
        ctx.clip();
    };

    // Update canvas dimensions
    canvas.setWidth(newWidth);
    canvas.setHeight(maxHeight + 100);

    // Adjust the width of the canvas container
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.style.width = `${newWidth}px`;
    }

    // Render canvas and calculate offset
    canvas.renderAll();
    canvas.calcOffset();
}



  window.addEventListener('resize', resize)
    window.addEventListener('load', resize)
    window.addEventListener('mousemove', resize)


    setTimeout(() => {
      resize(0)
    },300)


    setTimeout(() => {
      resize(0)
    },600)

    setTimeout(() => {
      resize()
    },3000)





  /*
  let isResizing = false;
let lastX;

// 1. Start resizing on mousedown
document.getElementById("resize-handle").addEventListener('mousedown', function (e) {
    isResizing = true;
    lastX = e.clientX;
});

// 2. End resizing on mouseup anywhere on the page
window.addEventListener('mouseup', function () {
    isResizing = false;
});

// 3. Handle the resizing on mousemove
window.addEventListener('mousemove', function (e) {
    if (!isResizing) return;

    const deltaX = e.clientX - lastX;
    lastX = e.clientX;

    // Calculate the new width based on the mouse movement
    const newWidth = initialCanvasWidth + deltaX;

    // Set the new width to canvas and resize it
    initialCanvasWidth = newWidth;
    resize();
});
*/


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

  if(activeObjects.length === 1) {

    let activeObject = activeObjects[0];
  let options = {};

  console.log(activeObject.type)

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
        <div id = 'option-${option.id}' class="option option-${option.type} option-${option.id}">
          <label> ${option.label} </label>
                <img src = '${option.icon}' class = 'icon' alt = 'icon'>
          <select id = 'input-${option.prop}' class = 'input dropdown' onchange="applyStyles(canvas)">
        `

        for (let i=0; i<option.options.length; i++) {
          let o = option.options[i];

          if (activeObject[option.id] == o) {
            opt += `<option value = '${o}' selected> ${o} </option> `
          }else{
            opt += `<option value = '${o}'> ${o} </option> `
          }

        }
        opt +=
        `
        </select>
        </div>

        `;

        break;

      case 'checkbox':
        console.log(activeObject[option.id])
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
            <input id="input-${option.id}" class="input ${option.type}" value =${activeObject.fill} type="${option.type}" />
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

  <button id="delete" class = 'red' onclick = "deleteObject()"> Delete </button>
  `


  console.log(PANEL)
  PANEL.innerHTML = div;


  /*
  switch (activeObject.type) {
    case 'textbox':
      break;
    case 'image':
      Id('input-width').value = Math.round(activeObject.width * activeObject.scaleX)
      Id('input-height').value = Math.round(activeObject.height * activeObject.scaleY)
      Id('range-width').value = Math.round(activeObject.width * activeObject.scaleX)
      Id('range-height').value = Math.round(activeObject.height * activeObject.scaleY)
      break;
    case 'video':
      break;
    default:
      break;
  }*/

  dynamicallyBindListeners()
}else{
  updateUIFromCanvasObjects(activeObjects);
}

}




function Class(id){
  return document.getElementsByClassName(id)
}



canvas.on('selection:cleared', () => {

  clearGuides()
  isPanelVisible.set(false)
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

console.log(data)

async function getImageUrlFromSupabase(filePath) {
    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${data.user.id}/${filePath}`;
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

canvas.wrapperEl.addEventListener('drop', async function(e) {
    e.preventDefault();
    Id('canvas').style.opacity = 1;
    var files = e.dataTransfer.files;
    const dropPoint = canvas.getPointer(e);  // Get drop position on canvas

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.type.includes("image")) {
            let imagePath = await uploadToSupabase(file);
            let imageURL;

            if (imagePath) {
                imageURL = await getImageUrlFromSupabase(imagePath);  // <-- The change is here
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
}, false);




// Assuming the saveCanvasToSupabase function is defined elsewhere, as mentioned.





/*
canvas.wrapperEl.addEventListener('drop', function(e) {
  e.preventDefault();
  Id('canvas').style.opacity = 1
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = function(e) {
      var dataURL = e.target.result;
      if (file.type.includes("image")) {
        // Create Fabric.js Image object
        fabric.Image.fromURL(dataURL, function(img) {
          img.scaleToWidth(300);  // Scale the image
          img.scaleToHeight(300);  // Scale the image
          canvas.add(img);  // Add image to canvas
        });
      } else if (file.type.includes("video")) {
        // Create Fabric.js Video object (a rect that acts as a placeholder)
        var videoEl = document.createElement('video');
        videoEl.src = dataURL;
        videoEl.addEventListener('loadedmetadata', function() {
          var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'transparent',
            width: 300,
            height: videoEl.videoHeight / (videoEl.videoWidth / 300)
          });
          canvas.add(rect);
          // Use the video element as a pattern in Fabric.js
          var patternSourceCanvas = new fabric.StaticCanvas();
          patternSourceCanvas.add(new fabric.Image(videoEl, {
            originX: 'left',
            originY: 'top',
            left: 0,
            top: 0,
            angle: 0,
            clipTo: function (ctx) {
              ctx.rect(0, 0, videoEl.videoWidth, videoEl.videoHeight);
            }
          }));
          var pattern = new fabric.Pattern({
            source: function() {
              patternSourceCanvas.setDimensions({
                width: videoEl.videoWidth,
                height: videoEl.videoHeight
              });
              patternSourceCanvas.renderAll();
              return patternSourceCanvas.getElement();
            },
            repeat: 'no-repeat'
          });
          rect.set({ fill: pattern });
          canvas.renderAll();
          videoEl.play();
          // Update pattern for every frame
          var animate = function() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(animate);
          }
          fabric.util.requestAnimFrame(animate);
        });
      }
    };
    reader.readAsDataURL(file);
  }
  saveCanvasToSupabase()
}, false);
*/




/////

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

  let maxHeight = 0;
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
  canvas.setHeight(maxHeight + 100);

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

const debouncedResize = debounce(resizeCanvas, 100);

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


  // Add text on button click
  document.getElementById('addText').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'text'
  });


  document.getElementById('addDraw').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'draw'
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
  });

  // Add video on button click
  document.getElementById('addVideo').addEventListener('click', () => {
    //addText(10,10);

     MODE = 'video'
  });

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

  function drawGrid(){
    // Draw the grid on the canvas

    removeGrid();

     // Draw new dot matrix
     xArr.forEach(x => {
        yArr.forEach(y => {
            const circle = new fabric.Circle({
                radius: 2,  // You can adjust the size of the dots here
                fill: '#f6f6f6',
                left: x,
                top: y,
                selectable: false,
                excludeFromExport: true
            });
            canvas.add(circle);
            canvas.sendToBack(circle);
            gridLines.push(circle); // Populate gridLines array with dots
        });
    });


    /*
    // Snapping function when object is moving
    canvas.on('object:moving', function(event) {
    const obj = event.target;
    const closestX = findClosest(obj.left, xArr);
    const closestY = findClosest(obj.top, yArr);
    obj.set({
        left: closestX,
        top: closestY
    }).setCoords();  // Update object's coordinates
    });

    // Find the closest value in an array to a given number
    function findClosest(num, arr) {
        return arr.reduce((prev, curr) =>
            Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
        );
    }
    */

  }


////////////////////////////// TEMPLATES //////////////////////////////


  function textTemplate(activeObject) {
    const options = [
      { label: 'Font', id: 'fontFamily', type: 'dropdown', prop: 'fontFamily', icon: IconT, value: activeObject.fontFamily, options: ['Arial', 'Newsreader', 'Helvetica', 'Times New Roman', 'Courier New'] },
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Letter Spacing', id: 'charSpacing', prop: 'charSpacing', icon: IconLS, type: 'number', value: activeObject.charSpacing || 0, min: -50, max: 50 },
      { label: 'Font Size', id: 'fontSize', type: 'number', step: 1, icon: IconS, prop: 'fontSize', value: activeObject.fontSize || 20, min: 5, max: 100 },
      { label: 'Text Align', id: 'textAlign', type: 'dropdown', icon: IconP, prop: 'textAlign', value: activeObject.textAlign, options: ['left', 'center', 'right', 'justify'] },
      { label: 'Font Weight', id: 'fontWeight', type: 'number', icon: IconB, step: 100,prop: 'fontWeight', value: activeObject.fontWeight || 500, min: 100, max: 900 },
      { label: 'Font Style', id: 'fontStyle', type: 'dropdown', icon: IconT, prop: 'fontStyle', value: activeObject.fontStyle, options: ['normal', 'italic', 'oblique'] },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0,  max: 360 },
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
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5 },
    ];
  }

  function rectTemplate(activeObject) {
    return [
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Width', id: 'width', type: 'number', icon: IconW, value: activeObject.width * activeObject.scaleX, min: 0, max: 1000, },
      { label: 'Height', id: 'height', type: 'number', icon: IconH, value: activeObject.height * activeObject.scaleY, min: 0, max: 1000, },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
      { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },

      { label: 'Depth', id: 'depth', type: 'number', icon: IconD, value: activeObject.depth, min: 0, max: 5},
    ];
  }

  function ellipseTemplate(activeObject) {
    return [
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', icon: IconC, value: activeObject.fill },
      { label: 'Width', id: 'width', type: 'number', icon: IconW, value: activeObject.width * activeObject.scaleX, min: 0, max: 1000, },
      { label: 'Height', id: 'height', type: 'number', icon: IconH, value: activeObject.height * activeObject.scaleY, min: 0, max: 1000, },
      { label: 'Angle', id: 'angle', type: 'number', icon: IconA, value: activeObject.angle, min: 0, max: 360 },
      { label: 'X', id: 'left', type: 'number', icon: IconX, value: activeObject.left, min: 0, max: canvas.width },
      { label: 'Y', id: 'top', type: 'number', icon: IconY, value: activeObject.top, min: 0, max: 1000 },

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
    default:
      break;
  }
})





////////////////////////////// LISTENERS //////////////////////////////

/*

  canvas.on('selection:cleared', function() {
    let panel = document.getElementById('controls');
    panel.innerHTML = '';
    $selectedType = nullI;
  });

  canvas.on('mouse:down', function(event) {
    const pointer = canvas.getPointer(event.e);
    initialX = pointer.x;
    initialY = pointer.y;

    floatingOptions.style.left = `${pointer.x}px`;
    floatingOptions.style.top = `${pointer.y}px`;
    floatingOptions.classList.add('active')
  });

  canvas.on('mouse:move', function(event) {
    if (floatingOptions.classList.contains('active')) return;

    const pointer = canvas.getPointer(event.e);
    const dx = pointer.x - initialX;
    const dy = pointer.y - initialY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 200) {
      floatingOptions.classList.remove('active')
    }
  });


  canvas.on('object:deselected', function(event){
    saveCanvasToSupabase()
  })
  */

  /*
  canvas.on('object:moving', function(event) {
    const obj = event.target;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const buffer = 100; // distance from edge to start expanding/retracting canvas

    // Extend Canvas Height
    const objectBottom = obj.top + obj.height; // Define object's bottom position
    if (objectBottom > (canvasHeight - buffer)) {
        canvas.setHeight(canvasHeight + buffer);
        canvas.calcOffset();
    }

    // Retract Canvas Height (if needed)
    // Find the object with the maximum bottom position

    // If there's a lot of extra space below the bottom-most object, reduce canvas height
    if ((canvasHeight - maxObjectBottom) > buffer && maxObjectBottom > window.innerHeight) {
        canvas.setHeight(maxObjectBottom + buffer);
        canvas.calcOffset();
    }
});
*/




////////



function preventScroll(event) {
    //event.preventDefault();
}

function saveCanvasToSupabase() {



    // Step 2: Save the scroll position
    const scrollTop = Id('container').scrollTop
    console.log(Id('container').scrollTop)

    // Calculate original dimensions
    const originalCanvasWidth = data.iwidth;
    const aspectRatio = initialCanvasHeight / initialCanvasWidth;
    const originalCanvasHeight = originalCanvasWidth * aspectRatio;

    // Backup current size and position of all objects
    const backupObjects = canvas.getObjects().map(object => ({
        left: object.left,
        top: object.top,
        scaleX: object.scaleX,
        scaleY: object.scaleY
    }));

    // Remove clipping (if any)
    canvas.clipTo = null;

    // Temporarily reset the canvas to its full/original size
    canvas.setWidth(originalCanvasWidth);
    //canvas.setHeight(originalCanvasHeight);

    // Upload the full canvas version to the database
    uploadCanvas();

    // Restore the canvas to the backed-up size and reposition all objects
    canvas.setWidth(initialCanvasWidth);
    //canvas.setHeight(initialCanvasHeight);
    canvas.getObjects().forEach((object, index) => {
        object.set({
            left: backupObjects[index].left,
            top: backupObjects[index].top,
            scaleX: backupObjects[index].scaleX,
            scaleY: backupObjects[index].scaleY
        }).setCoords();
    });

    // Restore the clipping
    const newWidth = window.innerWidth - panelWidth;
    const scaleX = newWidth / originalCanvasWidth;
    canvas.clipTo = function(ctx) {
        ctx.rect(0, 0, newWidth, originalCanvasHeight * scaleX);
        ctx.clip();
    };

    canvas.renderAll();
    canvas.calcOffset();

    // Step 4: Restore the scroll position

    console.log(Id('container').scrollTop, scrollTop)

    Id('container').scrollTo({
      top: scrollTop,
    })

    console.log(Id('container').scrollTop, scrollTop)


    // Step 5: Remove the event listener to allow scrolling
    window.removeEventListener('scroll', preventScroll);

}


async function uploadCanvas() {

// Serialize the current canvas state

// removeGrid()
const canv = canvas.toJSON(['link', 'depth']);
const json = JSON.stringify(canv);
// calculateGrid()
//  drawGrid()


// Save to Supabase
const { data: d, error } = await supabaseClient
    .from('pages')
    .upsert([
        {
          id: data.id,
          title: title,
          content: json,
          iwidth: canvas.width,
          color: color
        }
    ]);

if (error) {
    console.error('Error saving canvas: ', error);
} else {
    console.log('Canvas saved successfully: ', d);
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

