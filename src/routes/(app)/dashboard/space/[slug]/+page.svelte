<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let data;

    let notes = writable([]);
    let showModal = false; // Control the visibility of the modal
    let noteToEdit = { id: null, title: '', body: '' }; // Store the note to be edited

    // Fetch the notes on mount
    onMount(async () => {
      const { data: n , error } = await supabaseClient
        .from('notes')
        .select('*')
        .eq('space_id', data.id);
      if (!error) {
        notes.set(n);
      } else {
        console.error('Error fetching user_data:', error);
      }
    });

    // Function to open the modal with a specific note to edit
    function editNote(note) {
      noteToEdit = { ...note };
      showModal = true;
    }

    // Function to save a note (either new or edited)
    async function saveNote() {
      if (noteToEdit.id) {
        const { data, error } = await supabaseClient
          .from('notes')
          .update({
            title: noteToEdit.title,
            body: noteToEdit.body
          })
          .eq('id', noteToEdit.id);
      } else {
        const { data, error } = await supabaseClient
          .from('notes')
          .insert([{
            title: noteToEdit.title,
            body: noteToEdit.body,
            space_id: data.id
          }]);
      }
      showModal = false;
      noteToEdit = { id: null, title: '', body: '' };
    }

    // Auto-save when the noteToEdit data changes
    $: {
      if (noteToEdit.id || noteToEdit.title || noteToEdit.body) {
        saveNote();
      }
    }

    // Function to add new note
    function newNote() {
      noteToEdit = { id: null, title: '', body: '' };
      showModal = true;
    }
  </script>




<div id = 'app' style = 'background: {data.color}'>
    <div class = 'mast'>
        <img class = 'icon' src = {data.icon} alt = 'icon'>
        <div class = 'expo'>
            <input class = 'title' type = 'text' value = {data.title} placeholder = 'Untitled Space'>
            <input class = 'subtitle' type = 'text' value = {data.subtitle} placeholder = 'A place for my awesome stuff'>
        </div>
    </div>

    <h1 class = 'header'> Notes </h1>

    {#each $notes as note}

      <div class= "add_note note">
          <button on:click={() => (showModal = false)}>Close</button>
          <input bind:value={noteToEdit.title} placeholder="Note Title">
          <textarea bind:value={noteToEdit.body} placeholder="Note Body"></textarea>
          <button on:click={newNote}>Add Note</button>
      </div>`

      <a href = 'dashboard/space/{data.id}/note/{note.id}'>
          <div class = 'note'>
              <div class = 'note_expo'>
                  <h1 class = 'note_title'> {note.title} </h1>
                  <p class = 'note_subtitle'> {note.body} </p>
              </div>
          </div>
      </a>

        <button on:click={() => editNote(note)}>Edit</button>

    {/each}

    <!-- Add the following to your component's markup -->




</div>



<style>

    #app{
        min-height: calc(100vh - 60px);
        padding: 50px;
    }

    /* Note */

    .note{
        width: 300px;
        background: white;
        border-radius: 15px;
        color: black;
        border: 4px solid white;
		box-shadow: inset -5px -30px 30px rgba(0,0,0,0.03), 0px 40px 80px rgba(0,0,0,0.1);
        padding: 20px;
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
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        margin-bottom: 50px;
    }

    input{
        background: none;
        border: none;
        outline: none;
    }

    input:focus{
        border: none;
        outline: none;
    }

    .icon{
        height: 60px;
        border-radius: 5px;
    }

    .title{
        font-size: 22px;
        font-weight: 700;
        height: 30px;
        margin-bottom: 5px;
    }

    .subtitle{
        font-size: 16px;
        font-weight: 400;
        height: 24px;
    }


</style>

