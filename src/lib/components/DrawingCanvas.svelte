<!--
  <script lang="ts">
    import { onMount } from 'svelte';
    import { fabric } from 'fabric';
    import Pressure from 'pressure';

    let  canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#ffffff',
        isDrawingMode: true,
      });
    let currentColor = '#000000';
    let brushSize = 5;
    let isErasing = false;
    let layers = [];
    let currentLayer = null;

    function setupCanvas() {
      canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#ffffff',
        isDrawingMode: true,
      });
      canvas.freeDrawingBrush.width = brushSize;

      Pressure.set('#canvas', {
        change: (force) => {
          if (canvas.isDrawingMode) {
            canvas.freeDrawingBrush.width = brushSize * force;
          }
        },
      });
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
      const layer = new fabric.Canvas('layer-' + layers.length, {
        backgroundColor: 'transparent',
        preserveObjectStacking: true,
      });
      layers.push(layer);
      currentLayer = layer;
      canvas.add(layer);
    }

    onMount(() => {
      setupCanvas();
      addLayer();
    });
</script>

<style>
    .canvas-container {
      position: relative;
    }

    .canvas {
      border: 1px solid #ccc;
    }

    .layer {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
</style>

<div class="canvas-container">
    <canvas id="canvas" class="canvas"></canvas>
    {#each layers as layer}
      <canvas id="layer-{index}" class="layer"></canvas>
    {/each}
</div>

-->
