<div id = 'app'>

  <canvas id = 'canvas'></canvas>


  <a href = 'https://capsule.pw'>
    <div id = 'banner'>
        <img src = {Arachne} >
        <h1> Made with Arachne </h1>
      </div>
    </a>


    <h1 id = 'link'> Hello </h1>

</div>



<style lang='scss'>

    #link{
        color: white;
        position: fixed;
        top: 10px;
        left: 10px;
        transition: 0.2s ease;
        background: rgba(black, 0.8);
        padding: 10px 15px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
    }


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

    }

    #canvas{
        height: 100vh;
        width: 100vw;

        border-radius: 10px;
        flex-shrink: 0;

        transition: 0.2s ease;

        //box-shadow: 0 30px 90px rgba(black, 0.1);
    }

    #floatingOptions{
        position: absolute;
        opacity: 0;
    }

    #banner{
      position: fixed;
      bottom: 0px;
      left: 0px;
      padding: 12px 15px 12px 12px;
      background: #f0f0f0;
      background: #ff004d;
      color: white;
      border-radius: 0 15px 0 0;
      letter-spacing: -0.3px;
      font-size: 13px;
      font-weight: 600;
      transform: translateY(30px);
      opacity: 0;
      width: fit-content;
      transition: 0.2s ease;

      display: flex;
      gap: 8px;

      img{
        width: 13px;
        filter: brightness(500%);
      }

      animation: float 0.3s ease-in-out 0s forwards;
    }

    @keyframes float{
      from{
        opacity: 0;
        transform: translateY(30px);
      }
      to{
        opacity: 1;
        transform: translateY(0px);
      }


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

        #banner{
            left: 10px;
            bottom: 10px;
            width: calc(100vw - 20px);
            border-radius: 50px;
        }
    }

</style>


<svelte:head>
	<title> {data.title} </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
	<link rel="icon" href={X} />
</svelte:head>


<script>

import {onMount} from 'svelte'
import {fabric} from 'fabric'
import {supabaseClient} from '$lib/db'
import X from '$lib/img/favicon.svg'
export let data;

import Arachne from '$lib/img/octagon.svg'

onMount(()=> {



    let isScrolling = false;  // Flag to check if scrolling is active
let scrollInterval;  // Store the interval ID

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {  // Check if the pressed key is spacebar
    e.preventDefault();  // Prevent default spacebar action (page jump)

    if (isScrolling) {
      clearInterval(scrollInterval);  // Stop the auto-scrolling
    } else {
      scrollInterval = setInterval(function() {
        let currentScrollPos = document.querySelector('#app').scrollTop;
        document.querySelector('#app').scrollTop = currentScrollPos + 0.75;  // Adjust '1' to change scroll speed
      }, 10);  // Adjust '30' to make scrolling faster or slower
    }
    isScrolling = !isScrolling;  // Toggle the flag
  }
});






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


    let panelWidth = 400
    let newWidth = window.innerWidth - panelWidth;
    if (window.innerWidth < 800){
      newWidth = window.innerWidth
    }
    let scaleX = newWidth / data.iwidth * 0.9;

    resizeCanvas()


    document.getElementById('app').style.background = data.color

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

        canvas.renderAll();
        canvas.calcOffset();





    if (window.innerWidth < 800) {
        canvas.setWidth(window.innerWidth);

    }else{
        canvas.setWidth(window.innerWidth - panelWidth);
    }
    canvas.setHeight(window.innerHeight)




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


    canvas.getObjects().forEach(object => {
        object.originalTop = object.top;
    });




    // Apply parallax effect based on the depth and scroll amount
    function applyParallaxEffect() {



        let scrollAmount = document.getElementById('app').scrollTop;

            canvas.forEachObject(object => {
                // Assuming default depth is 0 if not specified
                let depth = object.depth || 0;

                // Calculate the parallax shift. The '0.2' is the factor which
                // determines how "fast" depth 1 objects move relative to the canvas.
                let parallaxShift = 0.2 * depth * scrollAmount;

                // Depth 0 objects should move with the canvas, so we subtract the scroll amount
                let newTopPosition = object.originalTop + parallaxShift - scrollAmount;

                // Set the new top position for the object

                object.set('top', newTopPosition);
            });

            canvas.renderAll(); // Refresh the canvas to reflect the changes
            canvas.calcOffset()
    }

    // Listen for the scroll event on the #app element
    document.getElementById('app').addEventListener('scroll', applyParallaxEffect);



        //resizeCanvas()
    },function(o,object){

        if (object){
            object.set({
                lockMovementX: true,
                lockMovementY: true,
                hasControls: false,
                hasBorders: false,
                selectable: true,
                editable: false,
                easing: fabric.util.ease.easeInOut
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





//// PARALLAX ////


// Store original top positions for all objects once the window has loaded







    //// RESIZE ////


    window.addEventListener('resize', debounce(() => {
        panelWidth = 240
        newWidth = window.innerWidth - panelWidth;

        if (window.innerWidth < 800){
            newWidth = window.innerWidth
        }
        scaleX = newWidth / canvas.getWidth()

        console.log(scaleX)

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
        //canvas.setHeight(initialCanvasHeight * scaleX);
        canvas.renderAll();
        canvas.calcOffset()

        resizeCanvas()


    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();


    // Re-render the canvas
    canvas.renderAll();
}))




canvas.on('mouse:up', function (options) {
  if (options.target) {
    // Check if the clicked object has an externalLink attribute

    if (options.target.link) {
      // Open the external link
      window.location = options.target.link
    }
  }
});


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

let originalTops = {};
let originalScales = {};



canvas.on('mouse:over', function(e) {

    let target = e.target;

    if (e.target){
        // Store the original top position and scale
        originalTops[target] = target.top;
        originalScales[target] = { x: target.scaleX, y: target.scaleY };

        target.animate('opacity', 0.8, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });


        if (e.target.link && e.target.link != 'undefined'){
            document.getElementById('link').innerHTML = e.target.link
            document.getElementById('link').style.left = e.e.screenX + 'px'
            document.getElementById('link').style.top = e.e.screenY - 120 + 'px'
            document.getElementById('link').style.opacity = 1
    }

    }




   /*
    // Animate the scale
    target.animate('scaleX', originalScales[target].x * 1.02, {
        duration: 100,
        onChange: canvas.renderAll.bind(canvas)
    });
    target.animate('scaleY', originalScales[target].y * 1.02, {
        duration: 100,
        onChange: canvas.renderAll.bind(canvas)
    });
    */
});

canvas.on('mouse:out', function(e) {
    let target = e.target;


    // Return to the original top position
    if (originalTops[target]) {
        target.animate('opacity', 1, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });
    }

    document.getElementById('link').style.opacity = 0

    /*
    // Return to the original scale
    if (originalScales[target]) {
        target.animate('scaleX', originalScales[target].x, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });
        target.animate('scaleY', originalScales[target].y, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });
    }
    */
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

