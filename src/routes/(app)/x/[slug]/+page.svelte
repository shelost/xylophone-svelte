<div id = 'app'>

  <div id = 'container'>
      <div id = 'bar'>
        <input id = 'title' bind:value = {title} placeholder = 'Untitled Page'>

        <div id = 'buttons'>
          <button id = 'url'> Copy Link </button>
        </div>

      </div>

      <div id = 'canvas-container'>
        <canvas id = 'canvas'></canvas>
      </div>



  </div>


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

        <div id = 'align'>
        </div>

    <!-- Control panel UI elements -->
    </div>

</div>


<div id = 'panel'>
  <h1> Controls </h1>
</div>

</div>



<svelte:head>
	<title> Xylophone | Build Freely </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={icon} />
</svelte:head>



<style lang='scss'>

  ::-webkit-scrollbar{
      width: 0px;
      height: 0;
      background: white;
  }

  ::-webkit-scrollbar-thumb{
      background: rgba(black, 0.4);
  }

  #app{

      width: calc(100vw - 305px) !important;
      height: calc(100vh - 10px);
      margin-left: 245px;
      margin-top: 5px;


      border-radius: 10px;
      //background: white;
      overflow-x: visible !important;
      //border: 1px solid rgba(black, 0.1);




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
    margin-top: 70px;
  }

  #canvas{
      flex-shrink: 0;
      border-radius: 10px;
      background: white;
      box-shadow: 0px 30px 50px rgba(black, 0.1);

      width: calc(100vw - 310px);
      height: 100vh;

      margin-bottom: 50px;

     // z-index: 3;
  }

  #floatingOptions{
      position: absolute;
      opacity: 0;
  }

  #title{
    letter-spacing: -0.4px;

  }

:global(#delete){
    background: red;
  }


  .add{
    //background: rgba(black, 0.1);
    color: black;
    box-shadow: none;

    width: 36px;
    height: 36px;
    border-radius: 5px;
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
      width: 16px;
      height: 16px;
    }
  }

  #controls{
    position: fixed;
    top: 0;
    right: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      border-radius: 0px;
      width: 70px;
      margin: 0;
      #buttons{
          display: flex;
          flex-direction: row;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin: 30px;

          button{
            width: 30px;
          }
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
      flex-grow: 1;
      width: calc(100vw - 240px);
      height: 100vh;

      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: scroll;



      padding-bottom: 40px !important;

      #bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 70px 15px 0;
        position: fixed;
        //z-index: 2;
        width: calc(100vw - 250px);


        input{
          font-size: 20px;
          font-weight: 700;
          padding: 0;
        }

        #buttons{
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
  }

  :global(.input){
      font-size: 12px !important;
      padding: 5px;
      background: white !important;
      transition: 0.2s ease;
  }

  :global(input:checked) {
    border: none;
  background: blue !important;
  }



  #panel{
    position: fixed;
    top: 0;
    right: -400px;
    width: 200px;
    padding: 20px;
    height: 100vh;
    background: #f0f0f0;
    box-shadow: -20px 0px 70px rgba(black, 0.2);
    transition: 0.3s ease-in-out;


    display: flex;
    flex-direction: column;
    gap: 24px;
    letter-spacing: -0.4px;



    :global(#controls-title){
      font-weight: 600;
    }

    .option{
      margin-top: 40px !important;
    }

    &.active{
      right: 0 !important;
    }
  }

  .active{
      right: 0 !important;
    }


  @media screen and (max-width: 800px){

      #container{
          width: calc(100vw - 240px) !important;
      }

      #canvas{
          width: calc(100vw - 240px) !important;
      }
  }


</style>



<script>


import {onMount} from 'svelte'
import {fabric} from 'fabric'
import {supabaseClient} from '$lib/db'
import {writable} from 'svelte/store'
import icon from '$lib/img/x.svg'



import Text from '$lib/img/i-text.svg'
import Button from '$lib/img/i-button.svg'
import Image from '$lib/img/i-img.svg'
import Triangle from '$lib/img/i-triangle.svg'
import Rect from '$lib/img/i-rect.svg'
import Ellipse from '$lib/img/i-ellipse.svg'



export let data

let MODE = 'text'
let title = data.title
const selectedType = writable(null);

let fonts = ['Arial', 'Times New Roman', 'Courier New'];
  let selectedFont = 'Arial'; // Default
  let fontSize = 16; // Default
  let letterSpacing = 0; // Default
  let justification = 'left'; // Default
  let fontWeight = 'normal'; // Default





function Id(e){
  return document.getElementById(e)
}


  const panelWidth = 310



onMount(()=> {
  // Initialize fabric.js canvas

  const PANEL = Id('panel')

  let initialCanvasWidth = window.innerWidth - panelWidth;  // Initial canvas width, 250 is the panel width
  let initialCanvasHeight = window.innerHeight;  // Initial canvas height


  let canvas = new fabric.Canvas('canvas', {
      width: initialCanvasWidth,
      height: initialCanvasHeight,
      renderOnAddRemove: false,
  });



  window.applyStyles = function() {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
        for (let i = 0; i < Class('input').length; i++) {
            let input = Class('input')[i];
            let prop = input.id.substring(6);

            if (prop === "width" && activeObject.type === "image") {
                const newWidth = parseFloat(input.value);
                activeObject.scaleX = newWidth / activeObject.width;
            } else if (prop === "height" && activeObject.type === "image") {
                const newHeight = parseFloat(input.value);
                activeObject.scaleY = newHeight / activeObject.height;
            } else {
                activeObject[prop] = input.value;
            }

            console.log(prop, activeObject[prop]);
        }

        canvas.renderAll();
        canvas.calcOffset();
        saveCanvasToSupabase();
    }
};





  document.addEventListener("DOMContentLoaded", function() {
  console.log('yo')
});



let xArr = Array.from({length: 40}, (_, i) => i * 40);
  let yArr = Array.from({length: 40}, (_, i) => i * 40);
  let gridLines = [];





$:  if (data && data.content && Id('canvas') && canvas && document && Id('title').value == data.title && document.readyState === 'complete') {
    try {
      const parsedContent = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;

      canvas.loadFromJSON(parsedContent, () => {

          try {
            resizeCanvas();
            resize();
            canvas.renderAll();
            canvas.requestRenderAll()
            canvas.calcOffset();
            console.log('drawed');
          } catch (error) {
            console.error('Error in canvas callback:', error);
          }
        }

        , function (o, object){
          object.set({
            borderColor: 'red',
            cornerColor: '#FF005C',
            cornerSize: 5,
            transparentCorners: false
          });
        });
      } catch (error) {
        console.error('Error loading canvas:', error);
      }
  }


setTimeout(() => {

  if (data && data.content && Id('canvas') && canvas && document && Id('title').value == data.title && document.readyState === 'complete') {
    try {
      const parsedContent = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;

      canvas.loadFromJSON(parsedContent, () => {
        try {
          resizeCanvas();
          resize();
          canvas.renderAll();
          canvas.requestRenderAll()
          canvas.calcOffset();
          console.log('drawed');
        } catch (error) {
          console.error('Error in canvas callback:', error);
        }
        }
        , function (o, object){
          object.set({
            borderColor: 'red',
            cornerColor: '#FF005C',
            cornerSize: 5,
            transparentCorners: false
          });
        });
      } catch (error) {
        console.error('Error loading canvas:', error);
      }

  }

}, 500)




/*

setTimeout(() => {

if (data && data.content && Id('canvas') && canvas && document && document.readyState === 'complete') {
  try {
    const parsedContent = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
    console.log('Parsed content:', parsedContent);

    canvas.loadFromJSON(parsedContent, () => {
      try {
        resizeCanvas();
        calculateGrid();
        drawGrid();
        canvas.getContext('2d').resetTransform();
        resize();
         resizeCanvas();
        canvas.renderAll();  // Choose either renderAll or requestRenderAll, not both
        canvas.calcOffset();
        console.log('drawed');
      } catch (error) {
        console.error('Error in canvas callback:', error);
      }
    });
  } catch (error) {
    console.error('Error loading canvas:', error);
  }
}

}, 1000)

*/




var elem, isDown, origX, origY;


// Create Rect

let isObjectBeingModified = false; // Track if an object is being edited, resized, or dragged

// Listen for object modification events
canvas.on('object:modified', function() {
    isObjectBeingModified = true;
});
canvas.on('selection:created', function() {
    isObjectBeingModified = true;
});
canvas.on('selection:cleared', function() {
    isObjectBeingModified = true;
});
canvas.on('object:moving', function() {
    isObjectBeingModified = true;
});
canvas.on('object:scaling', function() {
    isObjectBeingModified = true;
});
canvas.on('object:rotating', function() {
    isObjectBeingModified = true;
});


canvas.on('mouse:down', function(o){
    if (isObjectBeingModified || canvas.getActiveObject()) {
        // Reset and exit early if an object is being modified
        isObjectBeingModified = false;
        return;
    }

    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

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
              fontFamily: 'Arial',
              fill: '#000',
              charSpacing: -20,
              fontSize: 18,
              lineHeight: 1,
              fontWeight: '500',

              originX: 'left',
              originY: 'top',
              width: 100,
              editable: true,
              link: 'https://capsule.pw',
              depth: 1,
            });
            canvas.add(elem);
            canvas.setActiveObject(elem)
          break;
        default:
            break;
    }


    canvas.renderAll()
    saveCanvasToSupabase()


});




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
    }else if (obj.type === 'image') {
        // Update the width and height input values to the current scaled dimensions
        Id('input-width').value = Math.round(obj.width * obj.scaleX)
        Id('input-height').value = Math.round(obj.height * obj.scaleY)
    }

    canvas.renderAll();
});

canvas.on('object:rotating', function(event) {
    const obj = event.target;

    if (Id('input-angle')) {
      Id('input-angle').value = Math.round(obj.angle)
    }

    canvas.renderAll();
});







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



canvas.on('mouse:up', function(o){
  isDown = false;
});


  window.addEventListener('load', function () {
    console.log('loaded')
  });


  window.addEventListener('resize', () => {
      let newWidth = window.innerWidth - panelWidth;

      if (window.innerWidth < 800){
          newWidth = window.innerWidth
          console.log(newWidth)
      }
      const scaleX = newWidth / initialCanvasWidth;

      // Scale each object
      canvas.forEachObject((object) => {
          object.left *= scaleX;
          object.scaleX *= scaleX;
          object.top *= scaleX;
          object.scaleY *= scaleX;
          object.setCoords();
      });

      // Update canvas dimensions
      canvas.setWidth(newWidth);
      canvas.setHeight(initialCanvasHeight * scaleX);
      canvas.renderAll();
      canvas.calcOffset()


      /*
    calculateGrid()
    drawGrid()
    */


    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();
  })


  function resize(){
      let newWidth = window.innerWidth - panelWidth;

      if (window.innerWidth < 800){
          newWidth = window.innerWidth
          console.log(newWidth)
      }
      const scaleX = newWidth / initialCanvasWidth;

      // Scale each object
      canvas.forEachObject((object) => {
          object.left *= scaleX;
          object.scaleX *= scaleX;
          object.top *= scaleX;
          object.scaleY *= scaleX;
          object.setCoords();
      });

      // Update canvas dimensions
      canvas.setWidth(newWidth);
      canvas.setHeight(initialCanvasHeight * scaleX);
      canvas.renderAll();
      canvas.calcOffset()


    calculateGrid()
    drawGrid()


    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();

  }


let initialX, initialY;

// Function to add text


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleSelection(event) {
  const activeObject = canvas.getActiveObject()


  let options = {};

  console.log(activeObject.type)

  switch (activeObject.type) {
    case 'textbox':
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

  let div =
  `
  <h1 id = 'controls-title'> ${capitalize(activeObject.type)} </h1>
  `


  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    let opt = '';

    switch (option.type) {
      case 'range':

        console.log(activeObject)
        opt = `
        <div id = 'option-${option.id}' class="option option-${option.type}}">
          <label> ${option.label} </label>
          <input id = 'input-${option.id}' class = 'input range' value='${Math.round(activeObject[option.id])}' type="range" min="${option.min}" max="${option.max}" oninput="applyStyles(canvas)">
        </div>
        `;
        break;

      case 'number':
        opt = `
        <div id = 'option-${option.id}' class="option option-${option.type} option-${option.id}">
          <label> ${option.label} </label>
          <input id = 'input-${option.id}' step ='${option.step}' class = 'input number' value='${Math.round(activeObject[option.id])}' type="number" min="${option.min}" max="${option.max}" oninput="applyStyles(canvas)">
        </div>
        `;
        break;

      case 'dropdown':
        opt = `
        <div id = 'option-${option.id}' class="option option-${option.type} option-${option.id}">
          <label> ${option.label} </label>
          <select id = 'input-${option.prop}' class = 'input dropdown' onchange="applyStyles(canvas)">
        `

        for (let i=0; i<option.options.length; i++) {
          let o = option.options[i];

          console.log(o)

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

      default:
        break;
    }

    div += opt;
  }



  div +=
  `
  <div id = 'option-link' class="option option-link">
    <label> Link </label>
    <input id = 'input-link' class = 'input range' value = '${activeObject.link}' placeholder='Enter URL here...' type="text" oninput="applyStyles(canvas)">
  </div>

  <button id="delete" class = 'red' onclick = "deleteObject()"> Delete </button>
  `


  console.log(PANEL)
  PANEL.innerHTML = div;


  switch (activeObject.type) {
    case 'textbox':
      break;
    case 'image':
      Id('input-width').value = Math.round(activeObject.width * activeObject.scaleX)
      Id('input-height').value = Math.round(activeObject.height * activeObject.scaleY)
      break;
    case 'video':
      break;
    default:
      break;
  }

}



function Class(id){
  return document.getElementsByClassName(id)
}




canvas.on('selection:created', () => {

  console.log(canvas.getActiveObject().fontSize)

  Id('panel').classList.add('active')

});

canvas.on('selection:cleared', () => {

  Id('panel').classList.remove('active')

});


canvas.on('selection:created', handleSelection);
canvas.on('selection:updated', handleSelection);




/////

canvas.wrapperEl.addEventListener('dragover', function(e) {
  e.preventDefault();
  Id('canvas').style.opacity = 0.3
}, false);

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
    saveCanvasToSupabase()
  }
  saveCanvasToSupabase()
}, false);




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

  canvas.forEachObject((object) => {
    // Calculate the bottom edge position for each object.
    const objBottomEdge = object.top + object.height * object.scaleY;

    // Update maxHeight if this object is lower.
    if (objBottomEdge > maxHeight) {
      maxHeight = objBottomEdge;
    }
  });

  // Add 30px to maxHeight and update canvas height.
  canvas.setHeight(maxHeight + 100);

  // Update canvas dimensions on the actual HTML element
  canvas.calcOffset();
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
return function () {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func.apply(this, arguments);
  }, wait);
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



/*
  // Get the floating options div
  const floatingOptions = document.getElementById('floatingOptions');

  // Add a mouse event to the canvas to show the floating options div
  canvas.on('selection:created', moveControls);
  canvas.on('selection:updated', moveControls);
  canvas.on('object:moving', moveControls);
  Id('container').addEventListener('scroll', moveControls);


  function moveControls(event){
    const activeObject = canvas.getActiveObject()

    if (activeObject){
      CONTROLS.style.left = `${activeObject.left - 10}px`;
      CONTROLS.style.top = `${activeObject.top - Id('container').scrollTop - 20}px`;
    }
  }
  */




  canvas.on('mouse:out', function(event) {

    //CONTROLS.style.opacity = '0'
  })


  $: for (let i=0; i<document.getElementsByClassName('input').innerHTML; i++){
    let option = document.getElementsByClassName('input')[i]

    option.addEventListener('change', function(e){
      applyStyles(canvas)
    })
  }


  // Add text on button click
  document.getElementById('addText').addEventListener('click', ()=> {
    //addText(10,10);

    MODE = 'text'
  });

   // Add text on button click
   document.getElementById('addRect').addEventListener('click', ()=> {

    MODE = 'rect'
  });

  document.getElementById('addCircle').addEventListener('click', ()=> {

    MODE = 'circle'
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

    // Draw new grid
    xArr.forEach(x => {
        const line = new fabric.Path(`M ${x}, 0 V ${canvas.height}`, {
            stroke: '#fdfdfd',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        gridLines.push(line); // Populate gridLines array
    });

    yArr.forEach(y => {
        const line = new fabric.Path(`M 0, ${y} H ${canvas.width}`, {
            stroke: '#fdfdfd',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        gridLines.push(line); // Populate gridLines array
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
      { label: 'Font', id: 'fontFamily', type: 'dropdown', prop: 'fontFamily', value: activeObject.fontFamily, options: ['Arial', 'Newsreader', 'Helvetica', 'Times New Roman', 'Courier New'] },
      { label: 'Color', id: 'fill', type: 'color', prop: 'fill', value: activeObject.fill },
      { label: 'Letter Spacing', id: 'charSpacing', prop: 'charSpacing', type: 'range', value: activeObject.charSpacing || 0, min: -50, max: 50 },
      { label: 'Font Size', id: 'fontSize', type: 'number', step: 1, prop: 'fontSize', value: activeObject.fontSize || 20, min: 5, max: 100 },
      { label: 'Text Align', id: 'textAlign', type: 'dropdown', prop: 'textAlign', value: activeObject.textAlign, options: ['left', 'center', 'right', 'justify'] },
      { label: 'Font Weight', id: 'fontWeight', type: 'number', step: 100,prop: 'fontWeight', value: activeObject.fontWeight || 500, min: 100, max: 900 },
      { label: 'Font Style', id: 'fontStyle', type: 'dropdown', prop: 'textAlign', value: activeObject.fonStyle, options: ['normal', 'italic', 'oblique'] },
     /*
      { label: 'Underline', id: 'underline', type: 'checkbox', prop: 'underline', value: activeObject.underline },
      { label: 'Strikethrough', id: 'linethrough', type: 'checkbox', prop: 'linethrough', value: activeObject.linethrough },
      */
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
    {
      label: 'Width',
      id: 'width',
      type: 'number',
      value: activeObject.width * activeObject.scaleX,
    },
    {
      label: 'Height',
      id: 'height',
      type: 'number',
      value: activeObject.height * activeObject.scaleY,
    },
    {
      label: 'Angle',
      id: 'angle',
      type: 'number',
      value: activeObject.angle
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




window.addEventListener('keyup', e => {
  switch (e.code){
    case 'Backspace':


      //deleteObject()
      break;
    default:
      break;
  }
})


   canvas.on('selection:cleared', function() {
    saveCanvasToSupabase()
  });



////////////////////////////// LISTENERS //////////////////////////////

/*

  canvas.on('selection:cleared', function() {
    let panel = document.getElementById('controls');
    panel.innerHTML = '';
    $selectedType = null;
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

  canvas.on('object:moving', function(event) {
    const obj = event.target;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const buffer = 30; // distance from edge to start expanding canvas

    // Extend Canvas Height
    if ((obj.top + obj.height) > (canvasHeight - buffer)) {
      canvas.setHeight(canvasHeight + buffer);
    }
  });


////////

  async function saveCanvasToSupabase() {
    // Serialize the current canvas state
    removeGrid()
    const canv = canvas.toJSON(['link', 'depth']);
    const json = JSON.stringify(canv);
    calculateGrid()
    drawGrid()

    // Save to Supabase
    const { data: d, error } = await supabaseClient
        .from('pages')
        .upsert([
            {
              id: data.id,
              title: title,
              content: json
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

    console.log(url)
    console.log(blob)

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

});

</script>

