<div id = 'app'>

  <div id="floatingOptions">
      <button id="addTextOption">Add Text</button>
      <button id="addImageOption">Add Image</button>
      <button id="addVideoOption">Add Video</button>
  </div>


  <div id = 'controls'></div>

  <div id = 'container'>
      <div id = 'bar'>
        <input id = 'title' bind:value = {title} placeholder = 'Untitled Page'>

        <div id = 'buttons'>
          <h3 id = 'saved'> Saving... </h3>
          <button id = 'url'> Copy Link </button>
        </div>

      </div>
      <canvas id = 'canvas'></canvas>
  </div>


  <div id = 'panel'>

      <div id = 'buttons'>
          <button id="addText"> T </button>
          <button id="addImage"> I </button>
          <button id="addVideo"> V </button>
          <button id="addButton"> B </button>
          <button id="downloadJSON"> Download </button>
           <button id="upload"> Upload </button>
            <button id="delete" class = 'red'> Delete </button>
      </div>


      <div id = 'headers'> Text </div>

      <!-- Control panel UI elements -->

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
      background: white;
  }

  ::-webkit-scrollbar-thumb{
      background: rgba(black, 0.4);
  }

  :global(#app){
      width: calc(100vw - 240px);
      height: 100vh;
      overflow: hidden !important;
      background: white;
  }

  #url{
    box-shadow: none;
    padding: 10px 20px;
    border-radius: 40px;
    font-weight: 500;
  }

  #canvas{
      height: 100vh;
      width: calc(100vw - 400px);
      background: white;
      flex-shrink: 0;
  }

  #floatingOptions{
      position: absolute;
      opacity: 0;
  }

  #title{
    letter-spacing: -0.4px;
  }

  #delete{
    background: red;
  }

  #panel{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 10px;
      right: 10px;
      height: calc(100vh - 20px);
      border-radius: 10px;
      width: 60px;
      background: rgba(rgb(255, 0, 102), 0.1);
      background: #f0f0f0;

      #buttons{
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 30px;

          button{
            width: 30px;
          }
      }

  }

  #controls{
        display: flex;
        gap: 15px;
        padding: 15px;
        font-size: 12px;
        position: absolute;
        border-radius: 10px;
        top: 0;
        left: 0;
        background: #f0f0f0;
        transition: opacity 0.3s ease;
        z-index: 4;
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
      width: calc(100vw - 320px);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;

      #bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        input{
          font-size: 20px;
          font-weight: 700;
        }

        #buttons{
          display: flex;
          align-items: center;
          gap: 20px;


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
import {writable} from 'svelte/store'
import icon from '$lib/img/x.svg'
export let data

let title = data.title
const selectedType = writable(null);

let fonts = ['Arial', 'Times New Roman', 'Courier New'];
  let selectedFont = 'Arial'; // Default
  let fontSize = 16; // Default
  let letterSpacing = 0; // Default
  let justification = 'left'; // Default
  let fontWeight = 'normal'; // Default


  function applyStyles(canvas) {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.set({
        'fontFamily': selectedFont,
        'fontSize': fontSize,
        'letterSpacing': letterSpacing,
        'textAlign': justification,
        'fontWeight': fontWeight
      });
      canvas.renderAll();
    }
  }



  function Id(e){
    return document.getElementById(e)
  }



onMount(()=> {
  // Initialize fabric.js canvas

  const CONTROLS = Id('controls')

  let initialCanvasWidth = window.innerWidth - 320;  // Initial canvas width, 250 is the panel width
  let initialCanvasHeight = window.innerHeight;  // Initial canvas height

  let canvas = new fabric.Canvas('canvas', {
      width: initialCanvasWidth,
      height: initialCanvasHeight,
      renderOnAddRemove: false
  });

  canvas.loadFromJSON(data.content, () => {
      resizeCanvas();
      calculateGrid();
      drawGrid();
      canvas.renderAll();
      canvas.calcOffset();

    },function(o,object){
    })



  window.addEventListener('resize', debounce(() => {
      const panelWidth = 250;
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
  }))


let initialX, initialY;

// Function to add text


function handleSelection(event) {
  const activeObject = canvas.getActiveObject()


  let options = {};

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

  let div = ''


  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    let opt = '';

    switch (option.type) {
      case 'range':
        opt = `
        <div class="option option-range">
          <label> ${option.label} </label>
          <input class = 'range' bind:value=${option.value} type="range" min="${option.min}" max="${option.max}" value="${option.value}" on:input="applyStyles(canvas)">
        </div>
        `;
        break;

      case 'number':
        opt = `
        <div class="option option-number">
          <label> ${option.label} </label>
        </div>
        `;
        break;

      default:
        break;
    }

    div += opt;
  }

  CONTROLS.innerHTML = div;
}

canvas.on('selection:created', handleSelection);
canvas.on('selection:updated', handleSelection);



/////

canvas.wrapperEl.addEventListener('dragover', function(e) {
  e.preventDefault();
}, false);

canvas.wrapperEl.addEventListener('drop', function(e) {
  e.preventDefault();
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




  canvas.on('mouse:out', function(event) {

    //CONTROLS.style.opacity = '0'
  })


  for (let i=0; i<document.getElementsByClassName('option').innerHTML; i++){
    let option = document.getElementsByClassName('option')

    option.addEventListener('change', function(e){
      applyStyles(canvas)
    })
  }


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

  // Add video on button click
  document.getElementById('addButton').addEventListener('click', () => {
    addButton(10,10);
  });

  canvas.on('text:editing:entered', (textObject) => {
  // calculate canvas offset and textObject offset and scroll to this position
  })


  /////


  let xArr = Array.from({length: 40}, (_, i) => i * 40);
  let yArr = Array.from({length: 40}, (_, i) => i * 40);
  let gridLines = [];


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
      { label: 'Font', id: 'fontFamily', type: 'select', value: activeObject.fontFamily, options: ['Arial', 'Helvetica', 'Times New Roman', 'Courier New'] },
      { label: 'Color', id: 'fill', type: 'color', value: activeObject.fill },
      { label: 'Letter Spacing', id: 'charSpacing', type: 'range', value: activeObject.charSpacing || 0, min: -20, max: 10 },
      { label: 'Font Size', id: 'fontSize', type: 'range', value: activeObject.fontSize || 20, min: 5, max: 100 },
      { label: 'Text Align', id: 'textAlign', type: 'dropdown', value: activeObject.textAlign, options: ['left', 'center', 'right', 'justify'] },
      { label: 'Font Weight', id: 'fontWeight', type: 'range', value: activeObject.fontWeight || 500, min: 100, max: 900 },
      { label: 'Bold', id: 'fontWeight', type: 'checkbox', value: activeObject.fontWeight === 'bold' },
      { label: 'Italic', id: 'fontStyle', type: 'checkbox', value: activeObject.fontStyle === 'italic' },
      { label: 'Underline', id: 'underline', type: 'checkbox', value: activeObject.underline },
      { label: 'Strikethrough', id: 'linethrough', type: 'checkbox', value: activeObject.linethrough },
    ];

    return options;
  }

  function buttonTemplate(activeObject) {
    const options = [
      { label: 'Border Radius', id: 'borderRadius', type: 'range', value: activeObject.borderRadius || 0, min: 0, max: 50 },
      { label: 'URL', id: 'buttonUrl', type: 'text', value: activeObject.url || '' },
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


  function deleteObject(){
    canvas.remove(canvas.getActiveObject());
  }



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
    const canvasState = JSON.stringify(canvas);
    calculateGrid()
    drawGrid()

    // Save to Supabase
    const { data: d, error } = await supabaseClient
        .from('pages')
        .upsert([
            {
              id: data.id,
              title: title,
              content: canvasState
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
  document.getElementById('delete').addEventListener('click', deleteObject);
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

