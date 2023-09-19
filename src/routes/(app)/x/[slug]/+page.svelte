<div id = 'app'>


  <div id = 'bar'>
    <input id = 'title' bind:value = {title} placeholder = 'Untitled Page' style='outline: none !important;'>

    <div id = 'buttons'>
      <div class = 'add' id="pointer"  class:active = { MODE == null } >
        <img src = {Text} class = 'icon'  alt = 'icon'>
      </div>
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


      <label class="switch">
        <input type="checkbox" id = 'ruler' bind:checked={ruler} >
        <span class="slider round"></span>
      </label>

      <div>
        <input type="color" id="color" name="head" bind:value={color} />
      </div>

  </div>

</div>







  <div id = 'container' in:fly={{ y: 100, duration: 500 }}>


    <div id = 'canvas-container'>

      <div id="loader"></div>

      <canvas id = 'canvas'></canvas>

    </div>



    <div id="handle"></div>
</div>





</div>




<svelte:head>
	<title> Arachne | Build Your Perfect Web </title>
	<meta name="description" content="Arachne is a different kind of dev." />
  <link rel = 'icon' href = '{icon}'>
</svelte:head>



<style lang='scss'>



.switch {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
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
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 1px;
  bottom: 1px;
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
  transform: translateX(11px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}




  #app{
      width: calc(100vw - 240px);
      margin-top: 0px;
      height: calc(100vh);



      margin-left: 240px;

      //padding-left: 240px;

      overflow: visible !important;

      display: flex;

      justify-content: center;



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

  #handle {
    cursor: ew-resize;  // cursor indicates horizontal resizing
    position: absolute;
    right: 0;
    top: calc(50vh - 50px);
    width: 12px;
    height: 60px;
    background: white; // semi-transparent background for the handle
    border-radius: 50px;
    box-shadow: 0px 20px 40px rgba(black, 0.3);
    transform: translateX(5px);
}

  #canvas-container{
    //height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;








    overflow-x: hidden;
    overflow-y: scroll !important;
    width: calc(100vw - 260px) !important;
    height: calc(100vh - 65px) !important;

    background: none;

    //border: 1px solid rgba(black, 0.05);

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
      border: 4px solid rgba(black, 0.1);
      border-radius: 50%;
      border-top: 4px solid black;
      animation: spin 1s linear infinite;
      transition: 0.3s ease;
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

      width: calc(100vw - 255px);
      height: calc(100vh - 60px);
      margin-top: 50px;

      border: 2px solid white;
      box-shadow: 20px 50px 150px rgba(black, 0.15);

      border: 3px solid black;




    //resize: horizontal;  // allows horizontal resizing
    overflow: auto;      // to account for the scrollbar that may appear
    position: relative;  //



      display: flex;
      justify-content: center;
      overflow-x: visible !important;
      overflow-y: hidden;

      border-radius: 10px;

  }



  #bar{

display: flex;
justify-content: space-between;
align-items: center;
padding-right: 20px;
margin-left: 10px;

height: 45px;
border-bottom: 1px solid rgba(black, 0.02);
//box-shadow: 0px 20px 60px rgba(black, 0.05);
width: calc(100vw - 250px);
color: black;

z-index: 3;


position: fixed;


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
import Triangle from '$lib/img/i-triangle.svg'
import Rect from '$lib/img/i-rect.svg'
import Ellipse from '$lib/img/i-ellipse.svg'
import Copy from '$lib/img/copy.svg'

import { fly } from 'svelte/transition'

import Grid from '$lib/components/Grid.svelte'
import { object_without_properties } from 'svelte/internal';

//import { pages, isPanelVisible } from '$lib/utils/store.js'; // Adjust the path as necessary

import { pages, isPanelVisible, assets } from '../../../../lib/utils/store.js'; // Adjust the path as necessary


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
let ruler = true
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


  const panelWidth = 260

  const PANEL = Id('panel')

  let initialCanvasWidth = window.innerWidth - panelWidth;  // Initial canvas width, 250 is the panel width
  let initialCanvasHeight = window.innerHeight;  // Initial canvas height


  let canvas = new fabric.Canvas('canvas', {
      width: initialCanvasWidth,
      height: initialCanvasHeight,
      renderOnAddRemove: false,
  });

  unifiedResize()




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

  if (ruler){

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
  }

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

    setTimeout(() => {

      properties.forEach(property => {

attachInputListeners(`input-${property}`, property);
attachInputListeners(`range-${property}`, property);
});


document.getElementById("sendToFront").addEventListener("click", sendObjectToFront);
document.getElementById("sendToBack").addEventListener("click", sendObjectToBack);



    }, 300);


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








///////////////////////////////////////////////////
////////////////// LOAD CANVAS ////////////////////
///////////////////////////////////////////////////


  let xArr = Array.from({length: 40}, (_, i) => i * 40);
  let yArr = Array.from({length: 40}, (_, i) => i * 40);
  let gridLines = [];



  setTimeout(() => {


  if (
    data &&
    data.content &&
    canvas &&
    document &&
    document.readyState === 'complete'
  ) {
    loadCanvasFromSupabase();
  }else{
    Id('loader').style.display = 'none'
  }
}, 500);


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

           // calculateGrid()
           // drawGrid()

           canvas.setBackgroundColor(data.color);

            const canvasCenterX = canvas.width / 2;
            let maxHeight = initialCanvasHeight;

            canvas.getObjects().forEach((object) => {
                // Since we've stored objects' positions relative to the center of the canvas,
                // we need to revert the positions when loading them back.

                object.set({
                    left: object.left + canvas.width/2
                }).setCoords();




  //object.left = canvasCenterX - (object.left - object.width * object.scaleX) / 2;


                object.originalTop = object.top;

                if (object.top + object.height > maxHeight) {
                    maxHeight = object.top + object.height;
                }

                object.xPercent = (object.left + (object.width*object.scaleX)/2 - canvasCenterX) / canvas.width


                // Store initial properties directly in the object.
              object.originalProperties = {
                  left:object.left,
                  top:object.top,
                  width:object.width,
                  height:object.height,
                  scaleX:object.scaleX,
                  scaleY:object.scaleY
                };



            });

            canvas.setHeight(maxHeight + 50);
            canvas.renderAll();

        });

    } catch (parseError) {
        console.error('Error parsing the blob data:', parseError);
    }
};

// Usage:
// loadCanvasFromSupabase(yourData);








setTimeout(() => {

   loadCanvasFromSupabase()

},2000)




Id('color').addEventListener('input', e => {
  canvas.setBackgroundColor(Id('color').value, () => canvas.renderAll());
  //Id('bar').style.background = Id('color').value
  saveCanvasToSupabase()
})



function applyParallaxEffect() {

    let scrollAmount = document.getElementById('canvas-container').scrollTop;

    canvas.forEachObject(object => {
    let depth = object.depth || 0;
        let parallaxShift = 0.2 * depth * scrollAmount;

        // Use the originalTop (which isn't affected by parallax) and add the shift.
        let newTopPosition = object.originalTop + parallaxShift;
        object.set('top', newTopPosition);
    });

    canvas.renderAll();

}


// Listen for the scroll event
//document.getElementById('container').addEventListener('scroll', applyParallaxEffect);








var elem, isDown, origX, origY;


// Create Rect

let isObjectBeingModified = false; // Track if an object is being edited, resized, or dragged

// Listen for object modification events
canvas.on('object:modified', function() {
    isObjectBeingModified = true;
    MODE = null
   // applyParallaxEffect();
});

canvas.on('selection:created', function() {
  //MODE = null
    isObjectBeingModified = true;

    let activeObject = canvas.getActiveObject()

    activeObject.xPercent = (activeObject.left + (activeObject.width*activeObject.scaleX)/2  - canvas.width/2 )/ canvas.width


});


canvas.on('object:moving', function() {
 // resizeCanvas()

    if (activeObject) {
        let depth = activeObject.depth || 0;
        let scrollAmount = document.getElementById('canvas-container').scrollTop;

        // Adjust for parallax shift during dragging
        let parallaxShift = 0.2 * depth * scrollAmount;

        // Set the 'originalTop' relative to the entire canvas height
        activeObject.xPercent = (activeObject.left + (activeObject.width*activeObject.scaleX)/2 - canvas.width/2)/ canvas.width



        activeObject.originalTop = activeObject.top - parallaxShift;

        activeObject.set('originalTop', activeObject.top - parallaxShift)
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



let CLICK = 0


///////////////////////////////////////////////////
//////////////// CREATING ELEMENTS ////////////////
///////////////////////////////////////////////////



canvas.on('mouse:down', (o) => {
   Id('loader').style.display = 'none'
    if (isObjectBeingModified || canvas.getActiveObject() || CLICK > 0) {
        // Reset and exit early if an object is being modified
        isObjectBeingModified = false;
        CLICK = 0
        return;
    }

    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x
    origY = pointer.y

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
              fontWeight: 300,
              originX: 'left',
              originY: 'top',
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
            canvas.freeDrawingBrush.width = 1; // Set brush width
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


    // MODE = null


    canvas.renderAll()
    saveCanvasToSupabase()

})






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


canvas.on('mouse:up', function(o){
  isDown = false;
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
    document.getElementById('container').style.width = `${initialCanvasWidth}px`;

    // Update initial dimensions
    initialCanvasHeight = canvas.getHeight();
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

    if (newWidth > 300 && newWidth < window.innerWidth - 260) {
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
});




function unifiedResize(newContainerWidth = window.innerWidth - panelWidth) {
    if (window.innerWidth < 800) {
        newContainerWidth = window.innerWidth;
    }

    const newWidth = newContainerWidth;
    const canvasCenterX = newWidth / 2;

    const maxObjectWidth = newWidth * 0.95;

    console.log('-')
    console.log(canvas.width)

    canvas.getObjects().forEach((object) => {
        const isTextbox = object.type === 'textbox';



        /*
        if (isTextbox) {


            let maxLineWidth = 0;
            object._textLines.forEach(line => {
                const lineWidth = object.get2DCursorLocation(line.length).left;
                if (lineWidth > maxLineWidth) {
                    maxLineWidth = lineWidth;
                }
            });
            const actualTextWidth = maxLineWidth;


            if (Math.round(object.width * object.scaleX) < Math.round(maxObjectWidth)) {
                const origProps = object.originalProperties;
                object.width = origProps.width
            } else {
                object.width = actualTextWidth
            }
            object.setCoords();


        } else {
            const origProps = object.originalProperties;
            object.set({
                left: origProps.left,
                top: origProps.top,
                width: origProps.width,
                height: origProps.height,
                scaleX: origProps.scaleX,
                scaleY: origProps.scaleY
            });
            object.setCoords();
        }
        */

        /*
        const origProps = object.originalProperties;
            object.set({
                left: origProps.left,
                top: origProps.top,
                width: origProps.width,
                height: origProps.height,
                scaleX: origProps.scaleX,
                scaleY: origProps.scaleY
            });
            object.setCoords();

            */

        // Adjust position relative to the canvas width change.
        const newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX)/2

        object.left = newLeftPos
        object.setCoords();

    });

    canvas.clipTo = function(ctx) {
        ctx.rect(0, 0, newWidth, canvas.getHeight());
        ctx.clip();
    };

    canvas.setWidth(newWidth);

    // Adjust the widths of both the container and the canvas-container.
    const container = document.getElementById('container');
    const canvasContainer = document.getElementById('canvas-container');

    if (container) {
        container.style.width = `${newWidth}px`;
    }
    if (canvasContainer) {
        canvasContainer.style.width = `${newWidth}px`;
    }

    canvas.renderAll();
    canvas.calcOffset();
}






window.addEventListener('resize', () => unifiedResize());


  window.addEventListener('load', () => unifiedResize())



    setTimeout(() => {
      unifiedResize()
    },300)





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

  <button id="delete" class='red' onclick="deleteObject()"> Delete </button>
  <button id="sendToFront" onclick="sendObjectToFront()"> Send to Front </button>
  <button id="sendToBack" onclick="sendObjectToBack()"> Send to Back </button>

  `

  PANEL.innerHTML = div;


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

console.log(data)

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
            console.log(file);

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


    $isPanelVisible = true



    let PANEL = Id('panel')

    PANEL.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.dataTransfer.setData('text/plain', e.target.dataset.url);
    }
});


    let div = ``

    for (let i=0; i<$assets.length; i++){
      let asset = $assets[i]

      div +=
        `
        <img src="${asset.url}" data-filename="${asset.name}" alt="image" draggable="true" data-url="${asset.url}">
        `;
    }

    PANEL.innerHTML = div

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







////////



function preventScroll(event) {
    //event.preventDefault();
}
function saveCanvasToSupabase() {
    // Center of the canvas
    const canvasCenterX = canvas.width / 2;

    canvas.getObjects().forEach((object) => {
        if (object.originalWidth && object.originalWidth <= canvas.getWidth() * 0.95) {
            object.set({
                scaleX: 1,
                scaleY: 1,
                left: object.originalLeft,
                width: object.originalWidth
            }).setCoords();
        }
    });

    // Save the scroll position
    const scrollTop = Id('canvas-container').scrollTop;

    console.log(scrollTop)
    const backupGridLines = [...gridLines];

    // Calculate original dimensions
    const originalCanvasWidth = window.innerWidth - panelWidth;
    const aspectRatio = initialCanvasHeight / initialCanvasWidth;
    const originalCanvasHeight = originalCanvasWidth * aspectRatio;

    // Backup current size and position of all objects
    const backupObjects = canvas.getObjects().map(object => ({
        left: object.left,
        top: object.top,
        scaleX: object.scaleX,
        scaleY: object.scaleY
    }));

    // Adjust object positions relative to the center of the canvas before upload
    canvas.getObjects().forEach(object => {
        object.set({
            left: object.left - canvasCenterX
        }).setCoords();
    });

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

    gridLines = backupGridLines;
    gridLines.forEach(circle => canvas.add(circle));

    // Restore the scroll position
    Id('canvas-container').scrollTo({
        top: scrollTop,
    });
    Id('canvas-container').scrollTop = scrollTop

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
    const canv = canvas.toJSON(['link', 'depth', 'xPercent', 'scaler']);
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
              color: color
            }
        ]);

    if (dbError) {
        console.error('Error saving reference to database: ', dbError);
    } else {



        console.log('Canvas saved and reference stored successfully: ', dbData);
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

