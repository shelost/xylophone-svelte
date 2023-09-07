<!-- Grid.svelte -->
<script>
    export let canvas;



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
            stroke: '#f6f6f6',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        gridLines.push(line); // Populate gridLines array
    });

    yArr.forEach(y => {
        const line = new fabric.Path(`M 0, ${y} H ${canvas.width}`, {
            stroke: '#f6f6f6',
            selectable: false
        });
        canvas.add(line);
        canvas.sendToBack(line);
        gridLines.push(line); // Populate gridLines array
    });


    console.log('yo')


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
    // you might want to call certain functions on component mount
    import { onMount } from 'svelte';
    onMount(() => {
      calculateGrid();
      drawGrid();
    });
  </script>