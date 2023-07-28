<script lang="ts">
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte';
  import { fabric } from 'fabric';
  import Pressure from 'pressure';

  let canvas;
  let currentColor = '#000000';
  let brushSize = 5;
  let isErasing = false;
  let layers = [];

  onMount(() => {
    setupCanvas();
    addLayer();
  });

  beforeUpdate(() => {
    // Update canvas size on component updates
    canvas.setDimensions({ width: window.innerWidth, height: window.innerHeight });
  });

  afterUpdate(() => {
    // Refresh the canvas to fix rendering issues after updates
    canvas.requestRenderAll();
  });

  onDestroy(() => {
    // Dispose of the canvas and layers when the component is unmounted
    canvas.dispose();
    layers.forEach((layer) => layer.dispose());
  });

  function setupCanvas() {
    canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ffffff',
      isDrawingMode: true,
      containerClass: 'canvas-container', // Class added to the canvas container
    });
    canvas.freeDrawingBrush.width = brushSize;

    Pressure.set('#canvas', {
      change: (force) => {
        if (canvas.isDrawingMode) {
          canvas.freeDrawingBrush.width = brushSize * force;
        }
      },
    });

    // Handle scroll event to create additional layers
    const container = document.querySelector('.canvas-container');
    container.addEventListener('scroll', handleScroll);
  }

  function handleScroll() {
    const container = document.querySelector('.canvas-container');
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      addLayer();
    }
  }

  function toggleEraser() {
    isErasing = !isErasing;
    if (isErasing) {
      canvas.freeDrawingBrush.color = '#ffffff';
    } else {
      canvas.freeDrawingBrush.color = currentColor;
    }
  }

  function setColor(color) {
    currentColor = color;
    if (!isErasing) {
      canvas.freeDrawingBrush.color = currentColor;
    }
  }

  function setBrushSize(size) {
    brushSize = size;
    canvas.freeDrawingBrush.width = brushSize;
  }

  function addLayer() {
    const layer = new fabric.Rect({
      width: window.innerWidth,
      height: window.innerHeight,
      fill: 'transparent',
      stroke: null,
    });
    layers.push(layer);
    canvas.add(layer);
  }
</script>

<style>
  .canvas-container {
    position: relative;
    height: 200vh; /* Set the height of the container to accommodate the canvas */
    overflow: auto; /* Enable vertical scrolling */
  }

  #canvas {
    border: 1px solid #ccc;
  }
</style>

<div class="canvas-container">
  <canvas id="canvas"></canvas>
</div>
