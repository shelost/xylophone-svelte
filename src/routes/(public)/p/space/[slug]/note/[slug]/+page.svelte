<script lang="ts">
  import { supabaseClient } from '$lib/db';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let data;

  let updatedTitle = data.title;
  let updatedBody = data.body;

  let elems = writable([])
  let space = getSpace()
  let title = null

  let next = {}
  let prev = {}

  const ELEMS = data.body.split('\n');

  elems.update((currentElems) => {
      // Update the elems store with new content
      return ELEMS.map((E) => ({
        type: 'p',
        content: E,
      }));
  });

  async function getSpace(){
    const { data: s, error } = await supabaseClient
      .from('spaces')
      .select('*')
      .eq('id', data.space_id)
      .single()

    if (!error) {
      return s
    } else {
      console.error('Error fetching space', error);
    }
  }

  async function getAdjacentNotes(){

    try {

      const { data: n, error: e1 } = await supabaseClient
        .from('notes')
        .select('*')
        .match({ index: data.index+1, space_id: data.space_id })
        .single()

      if (!e1) {
        next = n

        console.log(n, data.index+1)
      }else{
        console.error('failed to fetch next note', e1)
      }

    }catch{

    }

    if (data.index > 0){
      try {
        const { data: p, error: e2 } = await supabaseClient
          .from('notes')
          .select('*')
          .match({ index: data.index-1, space_id: data.space_id })
          .single()

        if (!e2) {
          prev = p
          console.log(p, data.index-1)
        }else{
          console.error('failed to fetch prev note', e2)
        }
      }catch{

      }
    }

  }


  onMount(() => {
    getSpace()
    getAdjacentNotes()
    adjustTextareaHeight(document.getElementById('note-title'))
    adjustTextareaHeight(document.getElementById('note-body'))

    const s = Id('scrollable')
    let scroll = Id('app')
    let progress = Id('progress')


    let loop = () => {
      for (let i=0; i<Class('next').length; i++){
        let btn = Class('next')[i]
        btn.onclick = () => {
          console.log(next.id)
          if (next.id){
            window.location.href = next.id
          }
        }
      }


      for (let i=0; i<Class('prev').length; i++){
        let btn = Class('prev')[i]

        if (data.index > 0){
            btn.onclick = () => {
            console.log(prev.id)
            if (next.id){
              window.location.href = prev.id
            }
          }
        }else{
          btn.disabled = true
        }

      }

      progress.style.width = Math.ceil((scroll.scrollTop / scroll.scrollHeight) * window.innerWidth) + 'px'
      window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)




  })


  async function updateNote() {
    const { data: updatedData, error } = await supabaseClient
      .from('notes')
      .update({
        title: updatedTitle,
        body: updatedBody,
      })
      .eq('id', data.id);
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

  function Class(id){
      return document.getElementsByClassName(id)
  }



</script>


<div id = 'app'>

  <div id = 'buttons'>
    <button class = 'prev'> Prev </button>
    <button class = 'next'> Next </button>
  </div>

<section id = 'scroll' in:fly="{{ y: 200, duration: 500, delay: 200 }}" style="overflow-y: auto;">



{#if data}
  {#await space}

   <h1> Loading... </h1>

  {:then space}




    <div id = 'hero'>
      <!--
      <img src = '{series.icon}' alt = 'icon'>
      -->
      <h1> {space.title} </h1>
      <h2> {data.title} </h2>
    </div>

    <div id = 'scrollable'>


      {#each $elems as elem}
        <div class = 'elem'>
          <p> {elem.content} </p>
        </div>
      {/each}

    </div>

  {/await}

{/if}

</section>


</div>

<div id = 'bar'>
  <div id = 'progress'></div>
</div>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

  :global(#navbar){
    display: none !important;
  }

  button{
    background: white !important;
    color: black !important;
  }

  button:hover{
    opacity: 0.7;
  }

  button:disabled{
    opacity: 0.5;
  }

  #app{
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    color: white;
    font-family: 'Libre Baskerville', sans-serif;
  }

  #buttons{
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    padding: 0 10px;
    width: 100vw !important;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255,255,255,0.1);

    background: #101010;
  }





  button:hover{
      background: rgba(0,0,0,0.1);
  }

  #scroll{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  }

  #hero{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
    margin-bottom: 100px;
    text-align: center;
  }

  #hero h1{
    font-size: 60px !important;
    text-align: center;
    text-justify: center;
    margin: 20px 0;
    line-height: 95% !important;
    font-weight: 600;
    letter-spacing: -0.6px;
    font-family: 'Newsreader', 'Libre Baskerville', sans-serif;
  }

  #hero h2{
    font-size: 18px;
    opacity: 0.5;
  }


  #app{
      height: calc(100vh - 60px);
      width: 100vw !important;
      padding-bottom: 100px;
      overflow-x: hidden;
      overflow-y: scroll;
  }

  #title{
      font-size: 22px;
      font-weight: 700;
  }


  section {
    width: 800px;
    max-width: 100vw;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    margin: auto;
    margin-top: 20px;
  }

  #scrollable{
    margin-top: 50px;
  }

  .elem{
    margin: auto;
    margin-bottom: 150px;
    text-align: center;
    font-weight: 200;
  }


  .elem p{
    font-size: 14px;
    line-height: 200%;
    margin: auto;
    letter-spacing: 0.15px;
    font-weight: 300 !important;
    opacity: 0.7;
    font-family: 'Inter', sans-serif;
  }


  #bar{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 5px;
      width: 100vw;
      background: rgba(255,255,255,0.1);
  }

  #progress{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 5px;
      width: 10px;
      background:white;
  }


  #note-title {
    width: 800px;
    max-width: 90%;
    font-size: 28px;
    font-weight: 700;
    border: none;
    outline: none;
    padding: 10px;
    margin: 30px 0;
    letter-spacing: -0.4px;
    line-height: 105%;
    resize: none; /* Disable resizing for better control over textarea height */
    overflow-y: hidden; /* Hide vertical scrollbar */
    flex-shrink: 0;
  }

  #note-body {
    width: 800px;
    max-width: 90%;
    border: none;
    padding: none;
    resize: none; /* Disable resizing for better control over textarea height */
    overflow-y: hidden; /* Hide vertical scrollbar */
    min-height: 300px;
    flex-shrink: 0;


  }

  textarea:focus {
    @apply ring-0;
  }

  @media screen and (max-width: 800px){


    #hero h1{
      font-size: 50px;
      text-align: center;
      margin: 20px 0;
      line-height: 120%;
      width: 80%;
    }

    .elem{
      width: 80vw !important;
    }

    .elem p{
      width: 100% !important;
    }

    .elem p{

      font-weight: 100;
    }

  }

</style>
