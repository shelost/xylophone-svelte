
<script lang="ts">
  import { supabaseClient } from '$lib/db';
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import Notes from '$lib/components/Notes.svelte';
  import { fly } from 'svelte/transition';

  export let data;

  onMount(() => {
        adjustTextareaHeight(document.getElementById('title'))
        adjustTextareaHeight(document.getElementById('subtitle'))
        adjustTextareaHeight(document.getElementById('description'))

        window.onresize = () => {
          adjustTextareaHeight(document.getElementById('title'))
          adjustTextareaHeight(document.getElementById('subtitle'))
          adjustTextareaHeight(document.getElementById('description'))
        }
  })

  async function handleFileUpload(event, field) {
    const file = event.target.files[0];
    if (!file) return;

    const { data: uploadedFile, error: uploadError } = await supabaseClient.storage
      .from('images')
      .upload(`space/${data.slug}/${field}/${file.name}`, file);

    if (!uploadError) {
      data[field] = supabaseClient.storage
        .from('images')
        .getPublicUrl(`space/${data.slug}/${field}/${file.name}`).data.publicUrl;

      const { data: updatedData, error: updateError } = await supabaseClient
        .from('spaces')
        .update({ [field]: data[field] })
        .eq('id', data.id);

      updateSpace();

      if (!updateError) {
        console.log(`${field} updated successfully:`, updatedData);
      } else {
        console.error(`Error updating ${field}:`, updateError);
      }
    } else if (uploadError.statusCode == '409') {
      data[field] = supabaseClient.storage
        .from('images')
        .getPublicUrl(`space/${data.id}/${field}/${file.name}`).data.publicUrl;

      const { data: updatedData, error: updateError } = await supabaseClient
        .from('spaces')
        .update({ [field]: data[field] })
        .eq('id', data.id);

      updateSpace();
    } else {
      console.error('Error uploading file:', uploadError);
    }
  }

  async function updateSpace() {

    if (data.title != null){
      data.slug = data.title.toLowerCase().split(' ').join('-')
    }

    const { data: updatedData, error } = await supabaseClient
      .from('spaces')
      .update({
        title: data.title,
        subtitle: data.subtitle,
        icon: data.icon,
        cover: data.cover,
        banner: data.banner,
        description: data.description,
        color: data.color,
        secondary: data.secondary,
        music: data.music,
        slug: data.slug,
        music_title: data.music_title
      })
      .eq('id', data.id);


    if (!error) {
      console.log('Space updated successfully:', updatedData);
    } else {
      console.error('Error updating space:', error);
    }
  }
     // Function to adjust the height of textarea elements
    function adjustTextareaHeight(div) {

      const textarea = div

      if (div){
        textarea.style.height = '0px'
        textarea.style.height = Math.ceil(textarea.scrollHeight) + 'px'; // Adjust rows based on content

      }

    }

    function adjustTextareaHeightEvent(event) {

      if (data.title != null){
        data.slug = data.title.toLowerCase().split(' ').join('-')
        updateSpace()
      }

      const textarea = event.target
      textarea.style.height = '0px'
      textarea.style.height = Math.ceil(textarea.scrollHeight) + 'px'; // Adjust rows based on content
    }


  // Throttle the file upload function to avoid rapid calls
  import { throttle } from 'lodash';
  const handleFileUploadThrottled = throttle(handleFileUpload, 1000);

  // Clean up the throttle function on component destruction
  onDestroy(() => {
    handleFileUploadThrottled.cancel();
  });

  async function handleMusicUpload(event) {
    var files = event.target.files;
    let file = files[0]
    const { data: uploadedFile, error: uploadError } = await supabaseClient.storage
      .from('music')
      .upload(`${file.name}`, file);


      data.music = supabaseClient.storage
        .from('music')
        .getPublicUrl(`${file.name}`).data.publicUrl;

      data.music_title = file.name

      const { data: updatedData, error: updateError } = await supabaseClient
        .from('spaces')
        .update({ music: data.music, music_title: data.music_title })
        .eq('id', data.id);

      updateSpace();

      if (!updateError) {

        document.getElementById('src').src = data.music

        console.log(`Music updated successfully:`, updatedData);
      } else {
        console.error(`Error updating music:`, updateError);
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

let added = false


</script>


<!-- HTML -->


<div id="app" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>

<div id = 'bar'>

  <a href = '../../home'>
    <div id = 'back'></div>
    <h2> Back </h2>
  </a>

    <div id = 'settings'>
      Settings
    </div>
  </div>

  <img id="banner" src={data.banner} alt="Space Banner" />

  <div class = 'flex'>

  <!-- Mast -->
  <div class="mast">

     <!-- Banner -->

     <img id="icon" src={data.icon} alt="Scrollable Icon" />


    <div class="expo">
      <textarea id="title" bind:value={data.title}
              placeholder="Untitled Space"
              on:change={updateSpace}
              on:input|preventDefault={adjustTextareaHeightEvent} disabled></textarea>
      <textarea id="subtitle" bind:value={data.subtitle}
                placeholder="A place for my awesome stuff"
                on:change={updateSpace}
                on:input|preventDefault={adjustTextareaHeightEvent} disabled></textarea>

                <!--


              {#if added}
                <button id = 'remove' class = 'corner'> Remove </button>
            {:else}
                <button id = 'add' class = 'corner'> + Add  </button>
            {/if}
            -->

    </div>


    <div class = 'secs'>


      <div class = 'sec'>
        <h1> Description </h1>
        <textarea id = 'description'
            bind:value={data.description}
            placeholder="An Awesome Novel"
            on:change={updateSpace}
            on:input|preventDefault={adjustTextareaHeightEvent} disabled></textarea>
      </div>

      <!--
      <button id = 'start'> Begin Reading </button>
      -->

    </div>

  </div>

  <!-- Scroll -->
  <div class="scroll" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
    <h1 class="header"> Chapters </h1>
    <Notes {data} page = {true} icon={data.icon} />
  </div>




</div>
</div>


<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');


#app{
  min-height:100vh;
  padding: 50px;
  height: 200px;
  overflow-y: scroll;
  position: relative;
  background: white;
  color: black;
}


#start{
  background: #ffce00;
  color: black;
  border-radius: 100px;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.3px;
  margin-top: 50px;
  box-shadow: none;

  &:hover{
    background: #ffc000;
  }
}

.carousel{
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: flex-end !important;
}

.header{
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
}

.sec{
  h1{
    font-weight: 600;
    font-size: 14px;
    margin: 10px 0;
  }

  p{
    font-weight: 400;
    font-size: 14px;
    color: rgba(0,0,0,0.3);
  }
}

.flex{
  display: flex;
  gap: 60px;
}

.pill{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
.c{
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.3);
}

    /* Space */

    .mast{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
        margin-bottom: 50px;
        width: 540px;
        position: relative;
        flex-shrink: 0;
    }

    #bar{
      position: fixed;
      z-index: 5;
      top: 0;
      left: 240px;
      width: calc(100vw - 240px);
      height: 50px;
      padding: 0 15px;
      background: black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 300;
      color: white;
      display: none;
    }


    #banner-container .upload-container{
      bottom: 20px;
      right: 100px;
      z-index: 9 !important;
    }


    /* Cover */

    #cover-container{
      position: relative;
      transition: 0.1s ease;
      cursor: pointer;
      width: 150px;
      height: 150px;
    }

    #cover-container .upload-container{
      top: 50px;
      left: 10px;
    }

    #cover-container:hover #cover{
      filter: brightness(50%);
    }

    #cover-container:hover .upload-container{
      opacity: 1;
    }

    #cover-upload{
      display: none;
    }

    #cover-container:hover #cover{
      filter: brightness(50%);
    }

    #cover{
      height: 150px;
      border-radius: 10px;
    }

    #cover-container:hover .upload-container{
      opacity: 1;
    }

    #banner {
      position: absolute;
      top: 40px;
      left: 0px;
      width: 100vw;
      height: 250px;
      transition: 0.2s ease;
      display: none;
    }

    #icon{
      width: 200px;
      border-radius: 15px;

    }

    .expo{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 5px;
    }

    .upload-container{
      position: absolute;
      border: 1px solid white;
      background: white;
      color: black;
      display: inline-block;
      width: 120px;
      height: 35px;
      line-height: 35px;
      cursor: pointer;
      opacity: 0;
      z-index: 10 !important;
      border-radius: 5px;
      text-align: center;
      transition: 0.2s ease;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.2px;
    }

    textarea{
      background: none;
      border: none;
      outline: none;
      padding: 0;
      border: none;
      padding: none;
      resize: none; /* Disable resizing for better control over textarea height */
      overflow-y: hidden; /* Hide vertical scrollbar */
      flex-shrink: 0;
    }

    textarea:focus{
        border: none;
        outline: none;
        padding: 0;
        @apply ring-0;
    }

    #title{
        font-family: 'Manrope', 'Inter', sans-serif;
        font-size: 60px;
        font-weight: 900;
        margin-bottom: 20px;
        margin-top: 30px;
        letter-spacing: -2.5px;
        line-height: 100%;
        height: 54px;
        width: 100%;
    }

    #description{
      font-size: 14px;
        font-weight: 400;
        height: 24px;
        letter-spacing: -0.2px;
        width: 500px;
        line-height: 140%;
        color: rgba(0,0,0,0.4);
    }

    #subtitle{
        font-size: 20px;
        font-weight: 400;
        height: 24px;
        letter-spacing: -0.2px;
        width: 100%;
    }

    .scroll{
      flex: 1 !important;
    }

    .secs{
      margin-top: 30px;
    }


@media screen and (max-width: 800px){

  #banner-container{
    height: 200px;
  }

  #banner{
    height: 200px;
  }

  .scroll{
    margin-top: -100px;
  }

  #app{
    padding: 30px;
  }

  .flex{
    flex-direction: column;
  }

  .mast{
    width: 90vw;
  }

  #title{
    width: 90vw;
    font-size: 40px;
    line-height: 120%;
  }

  .mast{
    margin-top: -40px;
  }

  .secs{
    width: 90vw;
  }

  #description{
    width: 85vw;
  }

  #banner{
    width: 100vw;
  }

}

</style>

