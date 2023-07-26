<script lang="ts">
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Modal from '$lib/components/Modal.svelte'

    export let data;


    let notes = writable([]);
    let showModal = false; // Control the visibility of the modal
    let noteToEdit = { id: null, title: '', body: '' }; // Store the note to be edited

    async function fetchNotes(){

        const { data: n , error } = await supabaseClient
            .from('notes')
            .select('*')
            .eq('space_id', data.id);
        if (!error) {
            notes.set(n);
        } else {
            console.error('Error fetching user_data:', error);
        }
    }

    // Fetch the notes on mount
    onMount(fetchNotes);

    // Function to open the modal with a specific note to edit
    function editNote(note) {
      noteToEdit = { ...note };
      showModal = true;
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

    ////
    async function saveNote() {
        console.log('yo')


            if (noteToEdit.id) {
                const { data, error } = await supabaseClient
                    .from('notes')
                    .update({
                        title: noteToEdit.title,
                        body: noteToEdit.body
                    })
                    .eq('id', noteToEdit.id);
            } else {
                const { data : d, error } = await supabaseClient
                    .from('notes')
                    .insert([
                        {
                            title: noteToEdit.title,
                            body: noteToEdit.body,
                            space_id: data.id
                        }
                    ]);
            }
    }


    function updateNote(){
        showModal = false
        noteToEdit = { id: null, title: '', body: '' };
        fetchNotes()
    }

    let title = ''
    let body = ''
    let id = crypto.randomUUID()

    async function addNote(){

        if (title.length > 0 && body.length > 0){
            const { data : d, error } = await supabaseClient
                    .from('notes')
                    .insert([
                        {
                            id: id,
                            title: title,
                            body: body,
                            space_id: data.id,
                            user_id: data.user_id,
                            status: 'active',
                        }
                    ]);

            if (!error){
                fetchNotes()
                title = ''
                body = ''
                id = crypto.randomUUID()
            }else{
                console.log(error)
            }
        }else{
           alert('Please enter content!')
        }
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

    <h1 class = 'header'> Tasks </h1>

    <div class = 'tasks'>

    </div>

    <h1 class = 'header'> Notes </h1>

    <div class = 'notes'>

        <div id = 'add' class = 'note'>
            <div class = 'note_expo'>
                <input id = 'title_input' class = 'note_title' placeholder = 'My New Note' bind:value={title}>
                <textarea id = 'body_input' class = 'note_body' placeholder = "This is what's on my mind..." bind:value={body}></textarea>
            </div>
            <button id = 'add_btn' on:click={() => addNote()}> Add Note </button>
        </div>

        {#each $notes as note}
            <div class = 'note' on:click={() => editNote(note)}>
                <div class = 'note_expo'>
                    <h1 class = 'note_title'> {note.title} </h1>
                    <p class = 'note_body'> {note.body} </p>
                </div>
            </div>
        {/each}
    </div>

</div>

    <!-- Add/Edit note modal -->
    {#if showModal}
        <div class = 'container'>
            <div class="modal">

            <input bind:value={noteToEdit.title} placeholder="Note Title">
            <textarea bind:value={noteToEdit.body} placeholder="Note Body"></textarea>

            <button on:click={updateNote}> Done </button>
            </div>
        </div>
    {/if}




<style>


    #app{
        min-height: calc(100vh - 60px);
        width: 100vw;
        height: 100vh;
        padding: 50px;
        overflow-x: hidden;
        overflow-y: scroll !important;
    }

    ::-webkit-scrollbar{
        display: none;
    }

    .container{
        background: rgba(0,0,0,0.7);
        z-index: 5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .modal{
        background: white;
        z-index: 5;
        position: fixed;
        width: 800px;
        max-width: 90vw;
        border-radius: 15px;
        padding: 25px;
    }

    .modal input{
        font-size: 20px;
        font-weight: 600;
        border: none;
    }

    .modal textarea{
        border: none;
        height: 250px;
    }

    /* Note */

    .notes{
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        overflow: visible;
        padding: 0px;
        padding-bottom: 50px;
    }

    #add{
        width: 300px;
        height: 200px;
        border-radius: 15px;
        background: white;
        box-shadow: inset -5px -30px 30px rgba(0,0,0,0.03), 0px 40px 80px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-weight: 500;
        letter-spacing: -0.2px;
        transition: 0.2s ease;
        cursor: pointer;
    }

    #title_input{
        padding: 0;
    }

    #body_input{
        border: none;
        padding: 0;
        font-weight: 300;
        font-size: 14px;

    }

    #add_btn{
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 3 !important;
    }

    .note{
        width: 300px;
        height: 200px;
        background: white;
        border-radius: 10px;
        color: black;
        /*border: 4px solid white;*/
		box-shadow: inset -5px -30px 30px rgba(0,0,0,0.03), 0px 40px 80px rgba(0,0,0,0.05);
        padding: 25px;
        transform: none;
        transition: 0.2s ease;
        flex-shrink: 0;
    }

    .note:hover{
        transform: translateY(-5px);
    }

    .note_title{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .note_body{
        font-size: 12px;
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

