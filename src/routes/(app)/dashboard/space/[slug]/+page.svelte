<script lang="ts">
  import { supabaseClient } from '$lib/db';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Notes from '$lib/components/Notes.svelte';
  import { fly } from 'svelte/transition';
  export let data;

  async function handleFileUpload(event, field) {

    const file = event.target.files[0];
    if (!file) return;

    // Upload the file to Supabase Storage
    const { data: uploadedFile, error : uploadError } = await supabaseClient.storage
      .from('images')
      .upload(`space/${data.id}/${field}/${file.name}`, file);

    if (!uploadError) {
      // Update the data object with the file's metadata
      data[field] =  supabaseClient.storage
          .from('images')
          .getPublicUrl(`space/${data.id}/${field}/${file.name}`).data.publicUrl


      // Update the "spaces" table with the file's metadata
      const { data: updatedData, error: updateError } = await supabaseClient
        .from('spaces')
        .update({ [field]: data[field] })
        .eq('id', data.id);


        updateSpace()

      if (!updateError) {
        console.log(`${field} updated successfully:`, updatedData);
      } else {
        console.error(`Error updating ${field}:`, updateError);
      }

    } else if (uploadError.statusCode == '409'){

        data[field] =  supabaseClient.storage
            .from('images')
            .getPublicUrl(`space/${data.id}/${field}/${file.name}`).data.publicUrl

        const { data: updatedData, error: updateError } = await supabaseClient
          .from('spaces')
          .update({ [field]: data[field] })
          .eq('id', data.id);

        updateSpace()
    }else{
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
        banner: data.banner,
      })
      .eq('id', data.id);

    if (!error) {
      console.log('Space updated successfully:', updatedData);
      console.log(data)
    } else {
      console.error('Error updating space:', error);
    }
  }

</script>





<!-- HTML -->

<div id = 'app' in:fly={{ x: -200, duration: 300, delay: 300 }}
out:fly={{ x: 200, duration: 300 }}>

  <!---->

  <div id = 'banner' style= 'background-image: url({data.banner})'></div>

  <input
    type="file"
    id="banner-upload"
    accept="image/*"
    on:change={(event) => handleFileUpload(event, 'banner')}
  />

  <div class="mast">

      <div id = 'icon-container'>
        <img id="icon" style='border: 5px solid white' src={data.icon} alt="icon">

        <input
          type="file"
          id="icon-upload"
          accept="image/*"
          on:change={(event) => handleFileUpload(event, 'icon')}
        />

      </div>

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



<!-- Styles -->

<style>

    #app{
        min-height: calc(100vh - 60px);
        padding: 50px;
        padding-bottom: 100px !important;
        height: 200px;
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

    #banner {
        position: absolute;
        top: -0px;
        left: -0px;
        width: 100vw;
        height: 150px;
        background-color: red;
        z-index: 0;

        background-size: cover;
        background-position: center;
    }

    #icon-container{
      position: relative;
      transition: 0.1s ease;
      cursor: pointer;
      width: 300px;
      height: 300px;
    }


    #icon-container:hover{
      filter: brightness(50%);
    }


    #icon-container:hover #icon-upload{
      opacity: 1;
    }

    #icon-upload{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 250px;
    }


    #icon{
        height: 140px;
        border-radius: 15px;
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
        margin-top: -150px;
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

