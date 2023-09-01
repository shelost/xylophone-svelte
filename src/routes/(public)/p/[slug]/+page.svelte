<div id = 'app'>

  <canvas id = 'canvas'></canvas>

</div>



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
        width: 100vw;
        height: 100vh;

        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: center !important;
    }


    .canvas-container{
        height: 100vh;
        width: calc(100vw - 480px) !important;
        margin-top: 0px;
        flex-shrink: 0;
        border: 5px solid red;

    }

    #canvas{
        height: 100vh;
        width: 100vw;
        //margin-top: 30px;

        border-radius: 10px;
        flex-shrink: 0;

        padding-bottom: 30px !important;

        //box-shadow: 0 30px 90px rgba(black, 0.1);
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
            top: 0;
            left: 240px;
            width: calc(100vw - 480px);
            z-index: 3;
            background: #f0f0f0;
            display: none;
            input{
                font-size: 18px;
                font-weight: 600;
            }
        }
    }


    @media screen and (max-width: 800px){

        #container{
            width: 100vw;
        }

        #canvas{
            width: 80vw;
        }
    }

</style>


<svelte:head>
	<title> Xylophone | Build Freely </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={X} />
</svelte:head>


<script>

import {onMount} from 'svelte'
import {fabric} from 'fabric'
import {supabaseClient} from '$lib/db'
import X from '$lib/img/x.svg'
export let data;

onMount(()=> {
    // Initialize fabric.js canvas
    let xArr = Array.from({length: 40}, (_, i) => i * 40);
    let yArr = Array.from({length: 40}, (_, i) => i * 40);
    let gridLines = [];

    let initialCanvasWidth = window.innerWidth - 300;  // Initial canvas width, 250 is the panel width
    let initialCanvasHeight = window.innerHeight;  // Initial canvas height

    let canvas = new fabric.Canvas('canvas', {
        width: initialCanvasWidth,
        height: initialCanvasHeight,
    });


    let panelWidth = 240;
    let newWidth = window.innerWidth - panelWidth;
    if (window.innerWidth < 800){
      newWidth = window.innerWidth
    }
    let scaleX = newWidth / initialCanvasWidth;


    canvas.loadFromJSON(data.content, function() {
        canvas.renderAll();
        canvas.calcOffset();

        canvas.forEachObject((object) => {
            object.left *= scaleX;
            object.scaleX *= scaleX;
            object.top *= scaleX;
            object.scaleY *= scaleX;
            object.setCoords();
        });

        resizeCanvas()
    },function(o,object){

      if (object.type === 'i-text') {
        object.set({
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false,
            selectable: true,
            editable: true
        });
    } else {
        object.set({
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false,
            selectable: true
        });
    }

    })



    canvas.on('selection:created', function(event) {
    const activeObject = event.target;
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set({
            lockMovementX: true,
            lockMovementY: true,
            editable: true  // Allow editing/highlighting
        });
    }
});




    window.addEventListener('scroll', () => {
      canvas.calcOffset()
    })
    window.addEventListener('resize', debounce(() => {
        panelWidth = 250;
        newWidth = window.innerWidth - panelWidth;

        if (window.innerWidth < 800){
            newWidth = window.innerWidth
        }
        scaleX = newWidth / initialCanvasWidth;

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


    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();


    // Re-render the canvas
    canvas.renderAll();
}))



let initialX, initialY;

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
  canvas.setHeight(maxHeight + 30);

  // Update canvas dimensions on the actual HTML element
  canvas.calcOffset();
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


canvas.on('mouse:over', function(e) {
    console.log(e)
    e.target.set('opacity', '0.85');
    canvas.renderAll();
});



canvas.on('mouse:out', function(e) {
    console.log(e)
    e.target.set('opacity', '1');
    canvas.renderAll();
});




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
        gridLines.push(line); // Populate gridLines array


    });

    yArr.forEach(y => {
        const line = new fabric.Path(`M 0, ${y} H ${canvas.width}`, {
            stroke: '#eee',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        gridLines.push(line); // Populate gridLines array
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
}


})

</script>

