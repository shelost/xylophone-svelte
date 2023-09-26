<script>
  export let active = false;
  export let confirmText = "Confirm";
  export let closeText = "Close";
  export let header = "Are you sure?"
  export let message = "Are you sure?";
  export let onConfirm = null;
  export let onClose = null;

  import {fly} from 'svelte/transition'
</script>

<div class="modal" class:active  in:fly={{duration: 300 }} out:fly={{duration: 300 }}>
  <div class="modal-content" in:fly={{ y: 50, duration: 300 }} out:fly={{ y: 50, duration: 300 }}>
      <h1> {header} </h1>
      <p>{message}</p>
      <button class = 'confirm' on:click={onConfirm}>{confirmText}</button>
      <button class = 'close' on:click={onClose}>{closeText}</button>
  </div>
</div>

<style lang="scss">

  .modal {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.7);
      z-index: 1000 !important;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease;
      opacity: 0;
      visibility: hidden;

      .modal-content {
          background: white;
          width: 400px;
          padding: 20px;
          border-radius: 15px;
          text-align: center;
      }

      &.active {
        opacity: 1;
        visibility: visible;

      }
  }



  h1{
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
  }

  p{
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.3px;
    color: rgba(black, 0.4);
    margin: 15px;
    margin-bottom: 35px;
  }

  button{
    width: 100%;

    &.confirm{
      &:hover{
        background: #e90042;
      }
    }

    &.close{
      margin-top: 5px;
      background: none;
      box-shadow: none;
      color: #ff004d;
      transition: 0.2s ease;
      &:hover{
        background: rgba(#ff004d, 0.1);
      }
    }
  }


</style>
