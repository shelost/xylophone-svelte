<div id = 'app'>

    <div id="floatingOptions">
        <button id="addTextOption">Add Text</button>
        <button id="addImageOption">Add Image</button>
        <button id="addVideoOption">Add Video</button>
    </div>

    <div id = 'container'>
        <div id = 'bar'>
            <input id = 'title' bind:value={title} placeholder = 'Untitled'>


            <div>
                {#if saved}
                    <h3> Saved </h3>
                {:else}
                    <h3> Saving... </h3>
                {/if}
            </div>
        </div>
        <canvas id = 'canvas'></canvas>
    </div>

    <div id = 'panel'>

        <div id = 'buttons'>
            <button id="addText">Add Text</button>
            <button id="addImage">Add Image</button>
            <button id="addVideo">Add Video</button>
            <button id="downloadJSON">Download </button>
             <button id="upload"> Upload </button>
        </div>

        <div id = 'header'> Text </div>

        <div id = 'controls'>
        </div>
    </div>

</div>



<style lang='scss'>

    ::-webkit-scrollbar{
        width: 3px;
        height: 0;
        background: white;
    }

    ::-webkit-scrollbar-thumb{
        background: rgba(black, 0.4);
    }

    #app{
        width: calc(100vw - 240px);
        height: 100vh;
        overflow: hidden !important;
    }

    #canvas{
        height: 100vh;
        width: calc(100vw - 480px);
        background: white;
        margin-top: 50px;
        flex-shrink: 0;
        display: block;
        z-index: 10 !important;
    }

    #floatingOptions{
        position: absolute;
        opacity: 0;
    }


    #panel{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 240px;
        background: rgba(black, 0.05);

        #buttons{
            gap: 20px;
            margin: 30px;
        }

        #controls{
            label{
                font-size: 12px !important;
                display: flex;
                flex-direction: column;
            }
            #fontFamily{
                background: white;
            }
            input{
                background: white;
                padding: 5px;
            }
        }
    }

    .active{
        opacity: 1;
    }

    #container {
        flex-grow: 1;
        width: calc(100vw - 480px);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-y: scroll;

        #bar{
            padding: 5px;
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: 0;
            left: 240px;
            width: calc(100vw - 480px);
            z-index: 3;
            background: #f0f0f0;
            input{
                font-size: 18px;
                font-weight: 600;
            }
            h3{
                font-size: 12px;
                font-weight: 500;
                background: rgba(black, .1);
                padding: 8px 16px;
                border-radius: 30px;
                margin-right: 5px;
            }
        }
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
export let data;

let title = data.title
let color = data.color
let saved = false

onMount(()=> {
    // Initialize fabric.js canvas


    let xArr = Array.from({length: 40}, (_, i) => i * 40);
    let yArr = Array.from({length: 40}, (_, i) => i * 40);
    let gridLines = [];


    let initialCanvasWidth = window.innerWidth - 480;  // Initial canvas width, 250 is the panel width
    let initialCanvasHeight = window.innerHeight;  // Initial canvas height

    let canvas = new fabric.Canvas('canvas', {
        width: initialCanvasWidth,
        height: initialCanvasHeight,
    });




        /*


    setTimeout(() => {


        canvas.loadFromJSON(data.content, function() {
        canvas.renderAll();
        canvas.calcOffset();
        calculateGrid()
        drawGrid()


    },function(o,object){
    })

    }, 500);

    */


    window.addEventListener('resize', debounce(() => {
        const panelWidth = 250;
        let newWidth = window.innerWidth - panelWidth;

        if (window.innerWidth < 800){
            newWidth = window.innerWidth
        }

       console.log(window.innerWidth)
       console.log(newWidth)

        const scaleX = newWidth / initialCanvasWidth;
        initialCanvasWidth = newWidth

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
        canvas.calcOffset();

    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();


}));


canvas.on('after:render', function(){ canvas.calcOffset(); });




var started = false;
var x = 0;
var y = 0;
var width = 0;
var height = 0;

let initialX, initialY;

// Function to add text
function addText(x,y) {
  const text = new fabric.IText('Hello World!', {
    left: x,
    top: y,
    fontFamily: 'Inter',
    fill: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    editable: true,
    selectable: true
  });
  canvas.add(text);
    canvas.setActiveObject(text);

}

// Function to add image
function addImage(x,y) {
  fabric.Image.fromURL('https://ncvoplbawcrefpsplcue.supabase.co/storage/v1/object/public/images/space/the-prince/icon/shelost_a_vector_scene_from_common_sense_by_thomas_paine_simpl_40d7bd6a-1e44-4fc1-b301-df7c459974b4.png', function(image) {
    image.set({
      left: x,
      top: y,
      scaleX: 0.2,
      scaleY: 0.2,
      selectable: true
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
    selectable: true
  });
  canvas.add(video);
  video.getElement().play();
}


/*

// Get the floating options div
const floatingOptions = document.getElementById('floatingOptions');


// Add a mouse event to the canvas to show the floating options div
canvas.on('mouse:down', function(event) {
  const pointer = canvas.getPointer(event.e);

  floatingOptions.style.left = `${pointer.x}px`;
  floatingOptions.style.top = `${pointer.y}px`;
  floatingOptions.classList.add('active')
});
*/


/*


// Add click events to your floating options buttons
document.getElementById('addTextOption').addEventListener('click', function() {
  const rect = floatingOptions.getBoundingClientRect();
  addText(rect.left, rect.top);
  floatingOptions.classList.remove('active')
});

document.getElementById('addImageOption').addEventListener('click', function() {
  const rect = floatingOptions.getBoundingClientRect();
  addImage(rect.left, rect.top);
  floatingOptions.classList.remove('active')
});

document.getElementById('addVideoOption').addEventListener('click', function() {
  const rect = floatingOptions.getBoundingClientRect();
  addVideo(rect.left, rect.top);
  floatingOptions.classList.remove('active')
});
*/





// Add text on button click
document.getElementById('addText').addEventListener('click', ()=> {
    addText(10,10);
});

// Add image on button click
document.getElementById('addImage').addEventListener('click', () => {
    addImage(10,10);
});

// Add video on button click
document.getElementById('addVideo').addEventListener('click', () => {
    addText(10,10);
});



canvas.on('text:editing:entered', (textObject) => {
  // calculate canvas offset and textObject offset and scroll to this position

})




/////




calculateGrid()
    drawGrid()





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
            stroke: '#eee',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        line.set('selectable', false);
        gridLines.push(line); // Populate gridLines array


    });

    yArr.forEach(y => {
        const line = new fabric.Path(`M 0, ${y} H ${canvas.width}`, {
            stroke: '#eee',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        line.set('selectable', false);
        gridLines.push(line); // Populate gridLines array
    });

    }


// Snapping function when object is moving
canvas.on('object:moving', function(event) {

    console.log(event)
    saved = false
    const obj = event.target;
    const closestX = findClosest(obj.left, xArr);
    const closestY = findClosest(obj.top, yArr);
    obj.set({
        left: closestX,
        top: closestY
    }).setCoords();  // Update object's coordinates
    canvas.calcOffset();
});


// Find the closest value in an array to a given number




function findClosest(num, arr) {
        return arr.reduce((prev, curr) =>
            Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
        );
}



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



function applyFilter(image, filterName) {
  switch (filterName) {
    case 'normal':
      image.filters = [];
      break;
    case 'invert':
      image.filters = [new fabric.Image.filters.Invert()];
      break;
    case 'monochrome':
      image.filters = [new fabric.Image.filters.BlackWhite()];
      break;
    default:
      break;
  }
  image.applyFilters();
  canvas.renderAll();
}


/*

canvas.on('selection:created', function(event) {
  const activeObject = canvas.getActiveObject();

  console.log(event)
  console.log(activeObject)
  if (activeObject) {
    populatePanel(activeObject);
  }
});

canvas.on('selection:cleared', function() {
  let panel = document.getElementById('controls');
  panel.innerHTML = '';
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

canvas.on('object:moving', function(event) {
  const obj = event.target;
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const buffer = 100; // distance from edge to start expanding canvas

  // Extend Canvas Height
  if ((obj.top + obj.height) > (canvasHeight - buffer)) {
    canvas.setHeight(canvasHeight + buffer);
  }

  calculateGrid()
  removeGrid()
  drawGrid()

});
*/

/*
document.addEventListener('wheel', function(event) {
  const delta = Math.sign(event.deltaY);
  // Scrolling down
  if (delta > 0) {
    // Move canvas up
    canvas.viewportTransform[5] += 10; // 10 is the amount to move, you can adjust
  } else {
    // Move canvas down
    canvas.viewportTransform[5] -= 10;
  }
  canvas.requestRenderAll();
});
*/


////////


async function saveCanvasToSupabase() {
    // Serialize the current canvas state

    removeGrid()
    const canvasState = JSON.stringify(canvas);
    calculateGrid()
    drawGrid()

    console.log(data)
    // Save to Supabase
    const { data: d, error } = await supabaseClient
        .from('pages')
        .upsert([
            {
                id: data.id,
                title: title,
                content: canvasState,
                color: color
            }
        ]);

    if (!error) {
        saved = true
        console.log('Canvas saved successfully: ', data);
    } else {
        console.error('Error saving canvas: ', error);

    }
}


function downloadCanvasAsJSON() {
  // Serialize the canvas to JSON
  const json = JSON.stringify(canvas.toJSON());

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
document.getElementById('downloadJSON').addEventListener('click', downloadCanvasAsJSON);
document.getElementById('upload').addEventListener('click', saveCanvasToSupabase);
document.getElementById('title').addEventListener('input', saveCanvasToSupabase);

})

</script>

