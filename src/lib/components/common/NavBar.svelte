<!-- DrawingCanvas.svelte -->
<script lang="js">

	import {onMount} from 'svelte';

	// Define brush types and their properties
	const BRUSHES = {
	  PEN: { name: 'Pen', sizeFactor: 1, clippingMask: false },
	  PENCIL: { name: 'Pencil', sizeFactor: 0.5, clippingMask: false },
	  PAINT: { name: 'Paint', sizeFactor: 2, clippingMask: false },
	  AIRBRUSH: { name: 'Airbrush', sizeFactor: 3, clippingMask: true },
	};

	// Drawing state
	let drawing = false;
	let context;
	let previousX;
	let previousY;
	let pressure = 1; // Default pressure value (0 to 1)
	let currentBrush = BRUSHES.PEN; // Default brush type
	let currentColor = '#000000'; // Default color (black)
	let brushSize = 5; // Default brush size

	// Layers state for each brush type
	const layers = Object.fromEntries(Object.values(BRUSHES).map((brush) => [brush, []]));
	const activeLayerIndexMap = new Map(Object.values(BRUSHES).map((brush) => [brush, 0]));

	// Active layer state
	let activeLayer;

	// Set up the canvas after the component is mounted
	onMount(() => {
	  const canvas = document.getElementById('drawingCanvas');
	  context = canvas.getContext('2d');

	  // Add the initial drawing layers for each brush type (you can add more as needed)
	  Object.values(BRUSHES).forEach((brush) => layers[brush].push({ context, clippingMask: brush.clippingMask }));
	  setActiveLayer(currentBrush, activeLayerIndexMap.get(currentBrush));
	});

	// Handle mouse/touch events to draw on the canvas
	function handleStart(event) {
	  drawing = true;
	  const { offsetX, offsetY } = event;
	  previousX = offsetX;
	  previousY = offsetY;
	  pressure = event.pressure || 1; // Get the pressure value (if supported)
	}

	function handleMove(event) {
	  if (drawing) {
		const { offsetX, offsetY } = event;
		pressure = event.pressure || 1; // Update pressure value (if supported)
		drawLine(previousX, previousY, offsetX, offsetY, pressure, currentBrush, currentColor);
		previousX = offsetX;
		previousY = offsetY;
	  }
	}

	function handleEnd() {
	  drawing = false;
	}

	// Draw a line between two points on the active layer
	function drawLine(startX, startY, endX, endY, pressure, brushType, color) {
	  const layer = activeLayer.context;
	  const lineWidth = calculateLineWidth(pressure, brushType);

	  if (activeLayer.clippingMask) {
		// Apply airbrush as a clipping mask
		layer.globalCompositeOperation = 'destination-in';
	  } else {
		// Set paint strokes to "source-over" mode
		layer.globalCompositeOperation = 'source-over';
	  }

	  layer.beginPath();
	  layer.moveTo(startX, startY);
	  layer.lineTo(endX, endY);
	  layer.lineWidth = lineWidth;
	  layer.lineCap = 'round';
	  layer.strokeStyle = color;
	  layer.stroke();
	  layer.closePath();

	  // Restore the globalCompositeOperation to the default mode
	  layer.globalCompositeOperation = 'source-over';
	}

	// Calculate line width based on pressure, brush type, and brush size
	function calculateLineWidth(pressure, brushType) {
	  return pressure * brushSize * brushType.sizeFactor;
	}

	// Get the active layer for a given brush type
	function getActiveLayer(brushType, layerIndex) {
	  return layers[brushType][layerIndex];
	}

	// Set the active layer
	function setActiveLayer(brushType, layerIndex) {
	  activeLayer = layers[brushType][layerIndex];
	}

	// Create a new layer for the current brush type
	function addNewLayer() {
	  const layerArray = layers[currentBrush];
	  const newLayerCanvas = document.createElement('canvas');
	  newLayerCanvas.width = context.canvas.width;
	  newLayerCanvas.height = context.canvas.height;
	  const newLayer = { context: newLayerCanvas.getContext('2d'), clippingMask: currentBrush.clippingMask };
	  layerArray.push(newLayer);
	  activeLayerIndexMap.set(currentBrush, layerArray.length - 1);
	  setActiveLayer(currentBrush, layerArray.length - 1);
	}

	// Clear the active layer for the current brush type
	function clearActiveLayer() {
	  const layer = activeLayer.context;
	  layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
	}

	// Handle color change from the color picker
	function handleColorChange(event) {
	  currentColor = event.target.value;
	}

	// Handle brush size change from the slider
	function handleBrushSizeChange(event) {
	  brushSize = +event.target.value; // Convert the value to a number
	}

	// Handle the layer selection change
	function handleLayerChange(event) {
	  const { value } = event.target;
	  const [brushType, layerIndex] = value.split(',');
	  setActiveLayer(brushType, Number(layerIndex));
	}
  </script>

  <div>
	<canvas
	  id="drawingCanvas"
	  width="800"
	  height="600"
	  style="border: 1px solid black;"
	  on:mousedown={handleStart}
	  on:touchstart={handleStart}
	  on:mousemove={handleMove}
	  on:touchmove={handleMove}
	  on:mouseup={handleEnd}
	  on:touchend={handleEnd}
	></canvas>

	<!-- Color picker -->
	<input type="color" bind:value={currentColor} on:change={handleColorChange} />

	<!-- Brush size slider -->
	<label>
	  Brush Size:
	  <input type="range" min="1" max="50" step="1" bind:value={brushSize} on:input={handleBrushSizeChange} />
	  {brushSize}
	</label>

	<!-- Layer selector -->
	<select value={`${currentBrush},${activeLayerIndexMap.get(currentBrush)}`} on:change={handleLayerChange}>
	  {#each layers[currentBrush] as layer, index}
		<option value={`${currentBrush},${index}`}>Layer {index + 1}</option>
	  {/each}
	</select>
  </div>

  <button on:click={clearActiveLayer}>Clear Active Layer</button>
  <button on:click={addNewLayer}>Add New Layer</button>

  <!-- Brush selection buttons -->
  {#each Object.values(BRUSHES) as brush}
	<button on:click={() => { currentBrush = brush; setActiveLayer(currentBrush, activeLayerIndexMap.get(currentBrush)); }}>
	  {brush.name}
	</button>
  {/each}
