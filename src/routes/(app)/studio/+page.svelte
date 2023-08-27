<div id = 'buttons'>
    <button id="addText">Add Text</button>
    <button id="addImage">Add Image</button>
    <button id="addVideo">Add Video</button>
    <button id="downloadJSON">Download </button>
</div>



<div id="floatingOptions">
    <button id="addTextOption">Add Text</button>
    <button id="addImageOption">Add Image</button>
    <button id="addVideoOption">Add Video</button>
</div>



<div id = 'container'>
<canvas id = 'canvas'></canvas>
</div>


<div id = 'controls'>
<div id = 'title'> Text </div>
</div>




<style lang='scss'>

    #canvas{
        height: 100vh;
        width: calc(100vw - 400px);
        background: white;
    }

    #floatingOptions{
        position: absolute;
        opacity: 0;
    }

    #buttons{
        position: fixed;
        top: 20px;
        right: 260px;
        z-index: 3;
    }

    .active{
        opacity: 1;
    }

</style>





<script>


import {onMount} from 'svelte'
import {fabric} from 'fabric'


onMount(()=> {
    // Initialize fabric.js canvas
const canvas = new fabric.Canvas('canvas', {
  width: window.innerWidth - 400,
  height: window.innerHeight
});

canvas.setDimensions({width: window.innerWidth - 400, height:  window.innerHeight}, {cssOnly: true});

canvas.renderAll()
canvas.calcOffset();

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
    editable: true
  });
  canvas.add(text);
 // canvas.setActiveObject(text);

}

// Function to add image
function addImage(x,y) {
  fabric.Image.fromURL('https://ncvoplbawcrefpsplcue.supabase.co/storage/v1/object/public/images/space/the-prince/icon/shelost_a_vector_scene_from_common_sense_by_thomas_paine_simpl_40d7bd6a-1e44-4fc1-b301-df7c459974b4.png', function(image) {
    image.set({
      left: x,
      top: y,
      scaleX: 0.2,
      scaleY: 0.2
    });
    canvas.add(image);
  });
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
    scaleY: 0.2
  });
  canvas.add(video);
  video.getElement().play();
}



// Get the floating options div
const floatingOptions = document.getElementById('floatingOptions');

// Add a mouse event to the canvas to show the floating options div
canvas.on('mouse:down', function(event) {
  const pointer = canvas.getPointer(event.e);

  floatingOptions.style.left = `${pointer.x}px`;
  floatingOptions.style.top = `${pointer.y}px`;
  floatingOptions.classList.add('active')
});




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


const xArr = Array.from({length: 40}, (_, i) => i * 40);
const yArr = Array.from({length: 40}, (_, i) => i * 40);

// Draw the grid on the canvas
xArr.forEach(x => {
  canvas.add(new fabric.Path(`M ${x}, 0 V ${canvas.height}`, {
    stroke: '#eee',
    selectable: false
  }));
});
yArr.forEach(y => {
  canvas.add(new fabric.Path(`M 0, ${y} H ${canvas.width}`, {
    stroke: '#eee',
    selectable: false
  }));
});

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


////




function textTemplate(activeObject) {
  const options = [
    { label: 'Font', id: 'fontFamily', type: 'text', value: activeObject.fontFamily },
    { label: 'Color', id: 'fontColor', type: 'color', value: activeObject.fill },
    { label: 'Letter Spacing', id: 'letterSpacing', type: 'number', value: activeObject.letterSpacing || 0 },
    { label: 'Line Height', id: 'lineHeight', type: 'number', value: activeObject.lineHeight || 1 }
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
    // Future cases for other types like 'image', 'video'
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
      activeObject.set({ [option.id]: input.type === 'number' ? parseFloat(input.value) : input.value });
      canvas.renderAll();
    });
  });
}


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
  const buffer = 200; // distance from edge to start expanding canvas

  /*
  // Extend Canvas Width
  if ((obj.left + obj.width) > (canvasWidth - buffer)) {
    canvas.setWidth(canvasWidth + buffer);
  }
  */

  // Extend Canvas Height
  if ((obj.top + obj.height) > (canvasHeight - buffer)) {
    canvas.setHeight(canvasHeight + buffer);
  }

  // Redraw the grid, if you need to
  // ... (your grid drawing code here)




});

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


function downloadCanvasAsJSON() {
  // Serialize the canvas to JSON
  const json = JSON.stringify(canvas.toJSON());

  // Create a Blob from the JSON string
  const blob = new Blob([json], { type: 'application/json' });

  // Create an anchor element and set its attributes
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
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

})

</script>

