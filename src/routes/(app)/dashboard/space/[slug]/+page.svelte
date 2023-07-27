<script lang="ts">
  import { supabaseClient } from '$lib/db';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Notes from '$lib/components/Notes.svelte'

  export let data;

  let notes = writable([]);
  let noteToEdit = { id: null, title: '', body: '' }; // Store the note to be edited



</script>



<div id = 'app' style='background-color:{data.color}'>
  <div id = 'banner'></div>
  <div class="mast">

      <img id="icon" style='border: 5px solid {data.color}' src={data.icon} alt="icon">
      <div class="expo">
        <input class="title" type="text" value={data.title} placeholder="Untitled Space">
        <input class="subtitle" type="text" value={data.subtitle} placeholder="A place for my awesome stuff">
      </div>
  </div>

  <div class = 'scroll'>

    <h1 class="header">Notes</h1>

    <Notes {data}/>

  </div>

</div>




<style>

    #app{
        min-height: calc(100vh - 60px);
        padding: 50px;
        padding-bottom: 100px !important;
        overflow-y: scroll;
        position: relative;
    }

    /* Note */

    .notes{
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      height: 300px;
    }

    .note{
        width: 300px;
        background: white;
        border-radius: 8px;
        color: black;
		    box-shadow: inset -5px -30px 30px rgba(0,0,0,0.02), 0px 40px 80px rgba(0,0,0,0.05);
        padding: 25px;
        transform: none;
        transition: 0.2s ease;
    }

    .note:hover{
        transform: translateY(-5px);
    }

    .note h1{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .note p{
        font-size: 14px;
        letter-spacing: -0.2px;
        line-height: 140%;
    }

    .header{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 24px;
    }


    /* Space */

    .mast{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
        margin-bottom: 50px;
        position: relative;
    }

    #banner{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 150px;
      background-color: red;
      z-index: 0;
    }

    #icon{
        height: 140px;
        border-radius: 15px;
        margin-bottom: 5px;
        z-index: 2;
    }

    .expo{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 5px;
    }



    input{
        background: none;
        border: none;
        outline: none;
        padding: 0;

    }

    input:focus{
        border: none;
        outline: none;
        padding: 0;
        @apply ring-0;
    }



    .title{
        font-family: 'Manrope', 'Inter', sans-serif;
        font-size: 60px;
        font-weight: 800;
        margin-bottom: 20px;
        margin-top: 10px;
        letter-spacing: -2px;
        line-height: 80%;
        height: 54px;
    }

    .subtitle{
        font-size: 20px;
        font-weight: 400;
        height: 24px;
        letter-spacing: -0.2px;
        width: 100%;
    }


</style>

