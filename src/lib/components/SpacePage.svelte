<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import Notes from '$lib/components/Notes.svelte';
    import { fly } from 'svelte/transition';

    export let data;
    export let page = false;

    onMount(() => {
          adjustTextareaHeight(document.getElementById('title'))
          adjustTextareaHeight(document.getElementById('body'))
          adjustTextareaHeight(document.getElementById('description'))

          window.onresize = () => {
            adjustTextareaHeight(document.getElementById('title'))
            adjustTextareaHeight(document.getElementById('body'))
            adjustTextareaHeight(document.getElementById('description'))
          }
    })

    console.log(data)

    async function handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (!file) return;

      const { data: uploadedFile, error: uploadError } = await supabaseClient.storage
        .from('images')
        .upload(`space/${data.id}/${field}/${file.name}`, file);

      if (!uploadError) {
        data[field] = supabaseClient.storage
          .from('images')
          .getPublicUrl(`space/${data.id}/${field}/${file.name}`).data.publicUrl;

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
          secondary: data.secondary
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
  </script>

  <!-- HTML -->

<div id="app" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>

    <!-- Banner -->
    <div id="banner-container" class = 'container' style="background-image: url({data.banner})" >
      <div id="banner" style="background-image: url({data.banner})" loading="lazy"></div>
      {#if !page}
        <label id = 'banner-upload-container' class = 'upload-container'>
          <input
          type="file"
          id="banner-upload"
          accept="image/*"
          on:change={(event) => handleFileUploadThrottled(event, 'banner')}
          />
          Upload File
        </label>
      {/if}
    </div>


    <div class = 'flex'>

    <!-- Mast -->
    <div class="mast">

      <div class = 'carousel'>
        {#if !page}

        <div id="icon-container" class = 'container'>
          <img id="icon" src={data.icon} alt="Scrollable Icon" />

            <label id = 'icon-upload-container' class = 'upload-container'>
            <input
              type="file"
              id="icon-upload"
              accept="image/*"
              on:change={(event) => handleFileUploadThrottled(event, 'icon')}
            />
            Upload File
            </label>

        </div>
        {/if}

        <div id="cover-container" class = 'container'>
          <img id="cover" src={data.cover} alt="Banner Image" />
          {#if !page}
            <label id = 'cover-upload-container' class = 'upload-container'>
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              on:change={(event) => handleFileUploadThrottled(event, 'cover')}
            />
            Upload File
            </label>
          {/if}
        </div>

      </div>

      <div class="expo">
        <textarea id="title" bind:value={data.title}
                placeholder="Untitled Space"
                on:change={updateSpace}
                on:input|preventDefault={adjustTextareaHeightEvent}></textarea>
        <textarea id="subtitle" bind:value={data.subtitle}
                  placeholder="A place for my awesome stuff"
                  on:change={updateSpace}
                  on:input|preventDefault={adjustTextareaHeightEvent}></textarea>
      </div>


      <div class = 'secs'>

        <div class = 'sec'>

          <h1> Color </h1>

          <div class = 'pill'>
            <div class = 'c' style='background:{data.color}'></div>
            <input id = 'color' type ='text' bind:value={data.color}>
          </div>

          <div class = 'pill'>
            <div class = 'c' style='background:{data.secondary}'></div>
            <input id = 'secondary' type ='text' bind:value={data.secondary}>
          </div>

        </div>

        <div class = 'sec'>
          <h1> Description </h1>
          <textarea id = 'description'
          bind:value={data.description}
                placeholder="An Awesome Novel"
                on:change={updateSpace}
                on:input|preventDefault={adjustTextareaHeightEvent}></textarea>
        </div>


      </div>


    </div>

    <!-- Scroll -->
    <div class="scroll" in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
      <h1 class="header"> Chapters </h1>
      <Notes {data} page = {page} icon={data.icon} />
    </div>

</div>
</div>


<style>

  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');


      #app{
          min-height:100vh;
          padding: 50px;
          height: 200px;
          overflow-y: scroll;
          position: relative;
          background: #121212;
          color: white;
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
          margin-top: 40px;

      }

      .sec h1{
        font-weight: 600;
        font-size: 14px;
        margin: 10px 0;
      }

      .sec p{
        font-weight: 400;
        font-size: 14px;
        color: rgba(0,0,0,0.3);
      }

      .flex{
        display: flex;
        gap: 60px;
        margin-top: 130px;
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


      /* Icon */

      #icon-container{
        position: relative;
        transition: 0.1s ease;
        cursor: pointer;
        width: 150px;
        height: 150px;
        background: black;
        border-radius: 10px;
      }

      #icon-container .upload-container{
        top: 50px;
        left: 10px;
      }

      #icon-container:hover #icon{
        filter: brightness(50%);
      }


      #icon-container:hover .upload-container{
        opacity: 1;
      }

      /* Banner */

      #banner-container:hover #banner{
        filter: brightness(50%);
      }


      #banner-container:hover #banner-upload-container{
        opacity: 1;
      }


      #banner-container{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw !important;
        height: 250px;
      }

      #banner {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 250px;

        transition: 0.2s ease;
        background-size: cover;
        background-position: center;
      }

      #banner-upload{
        display: none;
      }

      #banner-upload-container{
        position: absolute;
        bottom: 30px;
        right: -30px;
        opacity: 0;
      }

      /* Icon */

      #icon-upload{
        display: none;
      }

      #icon{
        position: absolute;
          height: 140px;
          border-radius: 10px;
          margin-bottom: 5px;
          z-index: 2;
          transition: 0.2s ease;
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
          font-family: 'Libre Baskerville', 'Manrope', 'Inter', sans-serif;
          font-size: 60px;
          font-weight: 800;
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
        margin-top: 50px;
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

