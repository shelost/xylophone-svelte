<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    export let data;
    export let page = false;

    let updatedTitle = data.title;
    let updatedBody = data.body;
    let simplified = data.simplified

    let site = writable([])

    onMount(() => {
      adjustTextareaHeight(document.getElementById('note-title'))
        adjustTextareaHeight(document.getElementById('note-body'))

       setTimeout(() => {
          const s = Id('scrollable')

          let scroll = Id('app')
          let progress = Id('progress')

          let loop = () => {
              progress.style.width = Math.ceil((scroll.scrollTop / scroll.scrollHeight) * window.innerWidth) + 'px'
              window.requestAnimationFrame(loop)
          }
          window.requestAnimationFrame(loop)
       }, 2000);
    })

    async function updateNote() {

      const { data: updatedData, error } = await supabaseClient
        .from('notes')
        .update({
          title: updatedTitle,
          body: updatedBody,
          simplified: simplified
        })
        .eq('id', data.id);

        console.log('hey')

      if (!error) {
        console.log('Note updated successfully:', updatedData);
        // Navigate back to the note list page or any other desired location
      } else {
        console.error('Error updating note:', error);
      }
    }

    // Function to adjust the height of textarea elements
    // Function to adjust the height of textarea elements
    function adjustTextareaHeight(div) {

        if (div){
            const textarea = div
            textarea.style.height = '0px'
            textarea.style.height = Math.ceil(textarea.scrollHeight) + 'px'; // Adjust rows based on content
            console.log(textarea)
            console.log(textarea.style.height)
        }
    }

    function adjustTextareaHeightEvent(event) {

      console.log(event)
        const textarea = event.target
        textarea.style.height = '0px'
        textarea.style.height = Math.ceil(textarea.scrollHeight) + 'px'; // Adjust rows based on content
        console.log(textarea)
        console.log(textarea.style.height)
    }

    function Id(id){
        return document.getElementById(id)
    }

    function Tag(id){
        return document.getElementsByTagName(id)
    }


</script>



<div id = 'app'>


<section id = 'scroll' in:fly="{{ y: 200, duration: 500, delay: 200 }}" style="overflow-y: auto;">


    <textarea
        id="note-title"
        bind:value={updatedTitle}
        placeholder="Untitled Article"
        on:input={updateNote}
        on:input={adjustTextareaHeightEvent}
    ></textarea>


    <div id = 'areas'>

      <textarea
        id="note-body"
        bind:value={updatedBody}
        placeholder="Start typing here..."
        on:input={updateNote}
        on:input={adjustTextareaHeightEvent}
      ></textarea>

      <textarea
        id="note-body"
        bind:value={simplified}
        placeholder="Start typing here..."
        on:input={updateNote}
        on:input={adjustTextareaHeightEvent}
      ></textarea>

    </div>


</section>

</div>

<div id = 'bar'>
    <div id = 'progress'></div>
</div>

<style>


    #app{
        overflow: visible;
        background: white;
    }

    #buttons{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button{
        background: rgba(0,0,0,0.05);
        color: black;
        font-weight: 600;
        box-shadow: none;
        border-radius: 8px;
    }

    button:hover{
        background: rgba(0,0,0,0.1);
    }


    #scrollable .elem{
        background: red;
        padding: 20px;
        box-shadow: 0px 10px 30px rgba(0,0,0,0.3);
    }

    #app{
        padding-bottom: 100px;
        overflow-y: hidden;
    }

    #title{
        font-size: 22px;
        font-weight: 700;
    }


    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow: visible;
      margin: auto;
    }



  #areas{
    display: flex;
    width: 100%;
  }

    #bar{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 10px;
        width: 100vw;
        background: #f0f0f0;
    }

    #progress{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 10px;
        width: 10px;
        background: rgb(255, 0, 115);
    }

    #buttons {
      width: 800px;
      max-width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
    }


    #note-title {
      width: 800px;
      max-width: 90%;
      font-size: 28px;
      font-weight: 700;
      border: none;
      outline: none;
      padding: 10px;
      margin: 30px 0 0 0;
      letter-spacing: -0.4px;
      line-height: 105%;
      resize: none; /* Disable resizing for better control over textarea height */
      overflow-y: hidden; /* Hide vertical scrollbar */
      flex-shrink: 0;

    }

    #note-body {
      flex: 1;
      border: none;
      padding: none;
      resize: none; /* Disable resizing for better control over textarea height */
      overflow-y: hidden;
    }

    textarea:focus {
      @apply ring-0;
    }
  </style>
