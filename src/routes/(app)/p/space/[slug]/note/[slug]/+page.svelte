<script lang="ts">
  import { supabaseClient } from '$lib/db';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  import AnimatedElement from '$lib/components/AnimatedElement.svelte';
  export let data;

  let updatedTitle = data.title;
  let updatedBody = data.body;

  let scrolled = 0

  let OPTIONS = {
    justify: 'center',
    font_size: 16,
    spacing: 20,
    speed: 1,
    simplify: 0
  }

  let summ = 1;

  let elems = writable([])
  let space = getSpace()
  let title = null

  let next = {}
  let prev = {}
  let notes = writable([])

  let scrolling = false

  async function setElems(){
    let updatedElems = []

    for (let i=0; i<ELEMS.length; i++){
      let E = ELEMS[i]

      $elems.push({ type: 'p', content: E });
    }
  }

  async function updateOptions(){

  }

  async function updateScrolled(){

    const { data: user, error } = await supabaseClient
      .from('user_data')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (!error) {

      let obj = {
        chapter_id: data.id,
        chapter_num: data.index+1,
        chapter_title: data.title,
        scroll: scrolled
      }

      if (user.progress[space.title]){
        user.progress[space.title][data.index+1] = obj
      }else{
        user.progress[space.title] = {progress: []}
        user.progress[space.title][data.index+1] = obj
      }

    } else {
      console.error('Error fetching space', error);
    }
  }

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

  async function fetchNotes(){

    try {
      const { data: n, error: e1 } = await supabaseClient
        .from('notes')
        .select('*')
        .eq('space_id', data.space_id)


      if (!e1) {
        notes.set(n.sort((a,b) => {return a.index - b.index}))

      }else{
      }

    }catch{

      console.error('error')
    }
  }

  fetchNotes()

  async function getAdjacentNotes(){

    for (let i=0; i<$notes.length; i++){

      let note = $notes[i]

      console.log(note)

      if (note.index == data.index+1){
        next = note
      }

      if (note.index == data.index-1){
        prev = note
      }
    }
  }


  var isPlaying = false;

      function togglePlay() {
        isPlaying ? audio.pause() : audio.play();


        for (let i=0; i<Class('wave').length; i++){
          let wave = Class('wave')[i]

          isPlaying ? wave.classList.add('paused') : wave.classList.remove('paused')
        }

      };

      let clicked = false
      let speed = 1

      let timer = 100

      /*
      setTimeout(() => {
        setInterval(() => {
          updateScrolled()
        }, 1000);
      }, 5000);

      */

  onMount(() => {
    try{
      getAdjacentNotes()
    }catch{
      console.log('oops')
    }

    const ELEMS = data.body.split('\n');

  for (let i=0; i<ELEMS.length; i++){
      let E = ELEMS[i]

      $elems.push({ type: 'p', content: E });
    }

    let scrolldelay



    function toggleChapters(){
      Id('right').classList.toggle('active')

    }

    setTimeout(() => {

      Id('menu').onclick = toggleChapters

      let audio = Id("audio")

      audio.onplaying = function() {
        isPlaying = true;
      };
      audio.onpause = function() {
        isPlaying = false;
      };

      const s = Id('scrollable')
      let scroll = Id('scrollable')
      let progress = Id('progress')

      Id('canvas').height = Id('scrollable').scrollHeight -10000

      console.log( Id('scrollable').scrollHeight)

      let canvas = Id('canvas')
      let ctx = canvas.getContext('2d')

      scroll.onscroll = () => {
          scrolled = scroll.scrollTop / scroll.scrollHeight
      }

      Id('fab').onclick = () => {
        scrolling = !scrolling
        pageScroll()
      }

      window.onkeyup = e => {
        if (e.code == 'Space'){
          scrolling = !scrolling
          pageScroll()
        }
      }

      function pageScroll() {
        if (scrolling){
          scroll.scrollBy(0,OPTIONS.speed);
          scrolldelay = setTimeout(pageScroll,10);
        }
      }

      let loop = () => {
        for (let i=0; i<Class('next').length; i++){
          let btn = Class('next')[i]
          btn.onclick = () => {
            console.log(next.id)
            if (next.id){
              window.location.href = next.id
            }else{
              btn.disabled = true
            }
          }
        }

        for (let i=0; i<Class('prev').length; i++){
          let btn = Class('prev')[i]
          if (data.index > 0){
              btn.onclick = () => {
              if (prev.id){
                window.location.href = prev.id
              }
            }
          }else{
            btn.disabled = true
          }
        }

        if (window.innerWidth > 800){
          progress.style.width = Math.ceil((scroll.scrollTop / scroll.scrollHeight) * (window.innerWidth)) + 'px'
        }else{
          progress.style.width = Math.ceil((scroll.scrollTop / scroll.scrollHeight) * (window.innerWidth)) + 'px'
        }
        window.requestAnimationFrame(loop)
      }
      window.requestAnimationFrame(loop)
    }, 1500);
  })


  $: for (let i=0; i<Class('elem').length; i++){
    let elem = Class('elem')[i]
    elem.onclick = () => {
      console.log(elem)
    }
  }


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
    if (typeof window === 'undefined') {
        return []; // Return an empty array in non-browser environments
    }
      return document.getElementsByClassName(id)
  }


</script>




<section  style='background: {space.color}'>

<div class = 'app' style='background: {space.color}'>

{#if data}
  {#await space}

  <div id = 'loading'>
    <div class="lds-ripple"><div></div><div></div></div>
    <h1> Loading... </h1>
  </div>


  {:then space}


    <div id = 'col' class = 'col'  style='background: {space.color} !important;'>



      <a href = '../'>
        <div id = 'back'>
          <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10.5L16 21L16 0L0 10.5Z" fill="white"/>
          </svg>
          <h3>
          Back
          </h3>
        </div>
      </a>


      <div id = 'mast'>
        <div id = 'hero'>
          <img id = 'icon' src = {space.icon} alt = 'Scrollable Icon'>
          <h1> {space.title} </h1>
          <h2> {space.subtitle} </h2>
        </div>
      </div>


      <div id = 'options'>

        <div class = 'option'>
          <p> Music </p>
        <div id = 'music' on:click={togglePlay}>
          <audio id="audio" controls autoplay>
            <source src="{space.music}" id="src" />
          </audio>
          <div class = 'flex'>
            <div id = 'waveform'>
              <div class="wave wave1">
              </div>
              <div class="wave wave2">
              </div>
              <div class="wave wave3">
              </div>
            </div>
            <h3 id ='music_title'> {space.music_title} </h3>
          </div>
        </div>
      </div>


         <div class = 'option'>
          <p> Justify </p>
          <select id = 'justify' bind:value={OPTIONS.justify}>
            <option value = 'left'> Left </option>
            <option value = 'center'> Center </option>
            <option value = 'right'> Right </option>
          </select>
        </div>

        <div class = 'option'>
          <p> Font Size </p>
          <div class="slide_container">
            <input type="range" min="10" max="60" bind:value={OPTIONS.font_size} class="slider" id="size">
          </div>
        </div>


        <div class = 'option'>
          <p> Spacing </p>
          <div class="slide_container">
            <input type="range" min="0" max="100" bind:value={OPTIONS.spacing} class="slider" id="spacing">
          </div>
        </div>


        <div class = 'option'>
          <p> Speed </p>
          <div class="slide_container">
            <input type="range" min="0.5" max="5" step ='0.1' bind:value={OPTIONS.speed} class="slider" id="speed">
          </div>
        </div>


        <!--
        <div class = 'option'>
          <p> Simplify </p>
          <div class="slide_container">
            <input type="range" min="0" max="3"  bind:value={OPTIONS.simplify} class="slider" id="simplify">
          </div>
        </div>
        -->

      </div>
    </div>


    <div id = 'center'  style='background: {space.color} !important;'>

      <section id = 'scroll' style="overflow-y: auto;">


        <div id = 'scrollable'>

          <canvas id = 'canvas'></canvas>


          <img id = 'mastx' class = 'mobile' src = {space.mast} alt = 'Mast Image'>

          <img id = 'coverx' class = 'desktop' src = {space.cover} alt = 'Cover Image'>


          <h2 id = 'chapter_num'> CHAPTER {data.index+ 1} </h2>
          <h1 id = 'chapter_title'> {data.title} </h1>

          {#each $elems as elem}
            <div class = 'elem' style='margin-top:{OPTIONS.spacing}px'>

            <AnimatedElement options= {OPTIONS} text={elem.content} color={space.secondary}></AnimatedElement>
          </div>
          {/each}

          <!--
          <div id = 'footer'>
            <button class = 'cta next'> Next </button>
          </div>
          -->

        </div>
      </section>

    </div>


  <div id = 'right'  style='background: {space.color} !important;'>

    <h2> Chapters </h2>
    <div id = 'chapters'>
      {#each $notes as note}
        <a href = '{note.id}'>

          {#if note.id == data.id}
          <div class = 'chapter active'>
            <h1> {note.title}  </h1>
          </div>
          {:else}
          <div class = 'chapter'>
            <h1> {note.title} </h1>
          </div>
          {/if}
        </a>

      {/each}
    </div>
  </div>

  <div id = 'fab'>

    {#if scrolling}

    <svg id = 'ps' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="21" y="12" width="19" height="75" rx="9.5" fill="white"/>
      <rect x="61" y="12" width="19" height="75" rx="9.5" fill="white"/>
    </svg>

    {:else}

    <svg id = 'pl' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.7778 45.9586L25.1537 11.7179C22.0306 9.76019 18 12.0372 18 15.7593V84.2407C18 87.9628 22.0306 90.2398 25.1537 88.2821L79.7778 54.0414C82.7407 52.1841 82.7407 47.8159 79.7778 45.9586Z" fill="white"/>
    </svg>

    {/if}

  </div>

  {/await}


  <div id = 'buttons'>

    <a href = '../'>
      <div id = 'back'>
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10.5L16 21L16 0L0 10.5Z" fill="white"/>
        </svg>
        <h3>
        Back
        </h3>
      </div>
    </a>

    <div id = 'nav' class = 'flex'>
      <button class = 'nav prev'>
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10.5L16 21L16 0L0 10.5Z" fill="white"/>
        </svg>
      </button>
      <button id = 'menu'>
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 10.5L0 0V21L16 10.5Z" fill="white"/>
        </svg>
      </button>
      <button class = 'nav next'>
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 10.5L0 0V21L16 10.5Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>


{/if}


<div id = 'bar'>
  <div id = 'progress'></div>
</div>

</div>

</section>


<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

  ::-webkit-scrollbar{
    width: 5px;
    height: 0;
  }

  ::-webkit-scrollbar-thumb{
    width: 5px;
    background: black;
  }


  .chapter{
    color: rgba(black, 0.4);
    padding: 15px;
    font-size: 14px;
    margin: -5px 10px;
    border-radius: 5px;
    transition: 0.2s ease;

    &:hover{
      color: black;
    }

    &.active{
      color: black;
      background: white;
     box-shadow: 0px 20px 30px rgba(black, 0.05);
    }
  }

  #chapter_num{
    color: black;
    text-align: center;
    margin-bottom: -20px;
    margin-top: 50px;
    letter-spacing: 5px;
    font-family: 'Inter', sans-serif;
    color: rgba(black, 0.3);
  }

  .slide_container {
    width: 200px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: black;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.2px;
    font-weight: 500;
    padding: 20px 0;


    .slider {
     // -webkit-appearance: none;
      width: 240px !important;
      height: 10px;
      border-radius: 100px;
      background: rgba(white, 0.8) !important;
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 10px;
      height: 20px;
      border-radius: 30px;
      border: 2px solid white;
      background: rgba(white, 0.5);
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      background: #04AA6D;
      cursor: pointer;
    }

}

  #tabs{
    display: flex;
    color: black;
    gap: 10px;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.2px;
    padding: 15px 10px;
    align-items: center;
  }

  .tab{
    padding: 10px 15px;
    border-radius: 5px;
  }

  #play{
    height: 25px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #play svg{
    height: 15px;
    width: 15px;
  }

  #play svg path{
    fill: black;
  }

  #play svg rect{
    fill: black;
  }

  #footer{
    padding-bottom: 0px;
  }

  #fab{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 275px;
    bottom: 50px;
    background: #FF003D;
    width: 70px;
    height: 70px;
    border-radius: 500px;
    z-index: 5;
    box-shadow: 0x 20px 60px rgba(0,0,0,0.6);
    transition: 0.2s ease;
    cursor: pointer;

    svg{
      width: 40px;
      height: 40px;
    }
  }

  #fab:hover{
    background: #e3002a;
  }

  #fab svg{
    height: 36px;
    width: 36px;
  }



  :root {
    --m: 2;
    --wavefreq: calc(100ms * var(--m));
  }

  #music{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: black;
    width: fit-content;
    border-radius: 5px;
    gap: 20px;
    padding: 10px 15px;
    width: 200px;
    box-shadow: 0px 20px 40px rgba(0,0,0,0.1);
    z-index: 5;
    margin-top: 10px;
    margin-bottom: 20px;
    transition: 0.2s ease;
    color: white;
    cursor: pointer;
    &:hover{
      opacity: 0.7;
    }
  }

  #play{
    background: white;
    cursor: pointer;
    color: black;
    padding: 0 15px;
    border-radius: 50px;
  }

  #music_title{
    font-size: 11px;
  }

  .flex{
    display: flex;
    align-items: center;
    gap: 15px;
  }
  #audio{
    display: none;
  }

  #wiki{
    display: flex;
    background: white;
    padding: 15px;
    color: black;
    gap: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    width: 200px;

    img{
      height: 24px;
    }

    h2{
      font-size: 14px;
    }
  }

  #waveform {
    display: flex;
    gap: 5px;

    .wave{
      animation: waveform var(--wavefreq)
                ease-in-out infinite
                forwards;
      background-color: white;
      border-radius: 15px;
      width: 5px;
      height: 8px;
      background: #0074ff;

      &.paused{
        animation: none !important;
        transform: none !important;
        background: yellow !important;
        border: 5px solid green;
      }
    }
    .wave1 {
      --wavefreq: calc(200ms * var(--m));
      &.paused{
        --wavefreq: 0 !important;
      }
    }
    .wave2 {
      --wavefreq: calc(300ms * var(--m));
    }
    .wave3 {
      --wavefreq: calc(400ms * var(--m));
    }
  }



  @keyframes waveform {
  0% {
    transform: scaleY(.5);
  }
  50% {
    transform: scaleY(1.5);
  }
  100% {
    transform: scaleY(.5);
  }
}




  /* Loader */

  .lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid black;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}


#footer{
  padding-bottom: 50px;

}

.cta{
  width: 100%;
  background: black;
  color: white;
  margin-top: 200px;
  margin-bottom: 100px !important;

  &:hover{
    opacity: 0.8;
  }
}

  .nav{
    transform: scale(0.6);
  }

  /* Mast */
  .mast{
    display: flex;
    align-items: center;
    gap: 0px;


  }

  #chapter_title{
    font-size: 36px;
    line-height: 100%;
    font-weight: 800;
    margin: 40px auto;
    margin-bottom: 100px;
    letter-spacing: -0.4px;
    color: black !important;
    text-align: center;
    width: 80%;
  }

  #chapter{
    font-size: 13px;
    color: rgba(255,255,255,0.6);
  }

  button{
    background: black;
    color: white;
  }

  #header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    z-index: 3;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  #loading{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: white;
    color: black;
  }

  button:hover{
    opacity: 0.7;
  }

  button:disabled{
    opacity: 0.5;
  }


  #right{
    position: fixed;
    top: 0px;
    right: 0;
    height: 100vh;
    width: 240px;
    border-radius: 15px;
    overflow-y: scroll;
    box-shadow: 0px -20px 20px rgba(black, 0.1);

    h2{
      font-size: 18px;
      font-weight: 600;
      padding: 20px;
    }
  }


  .col{
    position: fixed;
    top: 0px;
    left: 0;
    height: 100vh;
    width: 240px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;


    #hero{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;
      text-justify: center;
      width: 200px;
      background-size: cover;
      background-position: center center;
      margin: 0;
      margin-top: 20px;
      margin-bottom: 20px;

      img{
        width: 120px;
        max-width: 100vw;
        aspect-ratio: 1;
        border-radius: 10px;
      }

      h1{
        font-size: 22px !important;
        line-height: 95% !important;
        font-weight: 600;
        letter-spacing: -0.6px;
        font-family: 'Inter', sans-serif;
        white-space: pre-wrap;
        text-align: left;
        color: black;
        width: 100%;
        margin: 10px 0;
        margin-top: 30px !important;
      }

      h2{
        font-size: 14px !important;
        text-align: left;
        opacity: 0.5;
        color: black;
        text-align: left;
        width: 100%;
      }
    }

  }


  #back{
    width: 200px;
    margin-top: 25px;

    display: flex;
    align-items: center;
    gap: 4px;

    svg{
      height: 10px;
      path{
        fill: black !important;
      }
    }

    h3{
      font-size: 14px;
      text-align: left;
      font-weight: 500;
      color: black;
    }
  }




  #buttons{
    display: none;
    background: rgb(21, 21, 21);
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 48px;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;

  }

  #options{
    .option{
      align-items: center;
      gap: 10px;

      p{
        font-size: 12px;
        letter-spacing: -0.4px;
        color: rgba(black, 0.5);
      }

      input{
        width: 180px;
        margin: 0;
        background: rgba(white, 0.5) !important;
      }

      select{
        border: none;
        width: 100%;
        border-radius: 5px;
        margin: 10px 0 20px 0;
        padding: 5px 10px;
        font-size: 12px;
        background: rgba(white, 0.5) !important;
      }
    }
  }

  button:hover{
      background: rgba(0,0,0,0.1);
  }


  #head{
    width: calc(100vw - 500px);
  }

  #coverx{
    display: none;
  }


  #center{
      width: calc(100vw - 480px);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 240px;
      overflow: visible;
      z-index: 3;

    #scroll{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100vw - 500px);
      height: calc(100vh - 35px);
      position: fixed;
      top: 0px;
      left: 250px;
      border-radius: 10px;
      overflow-x: hidden;
      overflow-y: scroll;
      box-shadow: 0px 30px 100px rgba(black, 0.2);
      padding: 0;

      #scrollable{
        position: relative;
        border-radius: 0;
        height: 100vw;
        width: calc(100vw - 500px);
        overflow-x: hidden;
        background: white;

        #coverx{
          width: calc(100vw - 480px);
        }

        #canvas{
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100vw - 500px);
        }
      }
    }
  }







  section {
    width: 800px;
    width: 100vw;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    margin: auto;
    margin-top: 20px;
  }


  #bar{
      position: fixed;
      top: 0;
      left: 0;
      height: 5px;
      width: 100vw;
      background: black;
      z-index: 5;
  }

  #progress{
      position: fixed;
      top: 0;
      left: 0;
      height: 5px;
      width: 10px;
      background: #f30833;
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

  .elem{
    padding: 0 50px;
    width: 100%;

    &.highlight{
      background: #ffce00;
    }
  }



  textarea:focus {
    @apply ring-0;
  }

  :global(#navbar){
    display: none !important;
    }

  @media screen and (max-width: 800px){

    :global(#navbar){
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    #right{
      position: fixed;
      height: 90vh;
      width: 100vw;
      top: 95vh;
      left: 0;
      background: yellow;
      z-index: 4 !important;
      transition: 0.2s ease;
    }

    .active{
        background: red;
        top: 10vh !important;
      }


    #mastx{
      width: 100vw;
    }

    #buttons{
      display: flex !important;
      justify-content: space-between;
      align-items: center !important;
      gap: 20px;
      height: 50px;
      width: 100vw !important;
      position: fixed !important;
      left: 0 !important;
      top: calc(100vh - 50px);
      z-index: 5 !important;

      #back{
        margin-bottom: 25px;
        margin-left: 15px;
        gap: 6px;
        svg{
          path{
            fill: white !important;
          }
        }
        h3{
          color: white !important;
          font-weight: 400;
        }
      }

      .flex{
        gap: 0px !important;
      }
    }

    .elem{
      width: 100%;
    }

    #menu{
      color: white;
    }

    #bar{
      left: 0;
      width: 100vw;
    }

    #progress{
      left: 0;
    }

    #head{
      width: 100vw !important;
    }


    #music{
      position: fixed;
      top: 0;
      left: 0;
      display: block;
    }

    #scroll{
      width: 100vw !important;
      height: calc(100vh - 50px) !important;
      top: -20px !important;
      left: 0 !important;
      overflow-x: hidden;
      border-radius: 0 !important;
    }

    #scrollable{
      width: 100vw !important;
      height: calc(100vh - 40px) !important;
      top: 0px !important;
      left: 0 !important;
      padding: 0;
      border-radius: 0 !important;
    }

    #chapter{
      display: none;
    }


    #fab{
      right: 30px !important;
      bottom: 70px;
    }


    #hero h1{
      font-size: 40px !important;
      text-align: center;
      text-justify: center;
      line-height: 120%;
      width: 80%;
      margin-top: 60px;
    }

    .elem{
      width: 100vw;
      transform: translateX(-12px);
    }

    .elem p{
      width: 100% !important;
      font-weight: 100;
      border-radius: 0;
    }
    #app{
      width: 100vw !important;
      overflow-x: hidden;
      border-radius: 0;
    }

    #hero{
      margin-top: -100px;
    }


  }

</style>
