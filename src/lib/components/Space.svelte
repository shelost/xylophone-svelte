<script>
    export let space;

    export let page = false;
</script>



{#if page}

<a class = 'space_a' href='p/space/{space.id}'>
    <div class = 'container'>
        <div class = 'background' style='background-image: url({space.cover})'></div>
        <div class='space' >

            <div class='space_expo'>
                <h1> Enter </h1>
            </div>
        </div>
    </div>
</a>

{:else}
<a class = 'space_a' href='dashboard/space/{space.id}'>
    <div class = 'container'>
        <div class = 'background' style='background-image: url({space.cover})'></div>
        <div class='space' >
            <div class='space_expo'>
                <h1> Enter </h1>
            </div>
        </div>
    </div>
</a>
{/if}


<style>

    .background{
        display: block;
        width: 300px;
        height: 500px;
        background-size: cover;
        background-position: center center;
        transition: 0.2s ease;
        box-shadow: 0px 20px 50px rgba(0,0,0, 0.1);
        border-radius: 20px;
    }

    .background:hover{
        transform: translateY(-10px);
    }

    .container{
        height: 400px;
        width: 300px;
        background: white;
        border-radius: 15px;
        position: relative;
    }

    .space{
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
        width: 300px;
        height: 500px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: 0.2s ease;
        text-align: center;
        opacity: 0;
    }

    .space_expo h1{
        font-size: 22px;
        line-height: 120px;
        width: 120px;
        height: 120px;
        text-align: center;
        border-radius: 70px;

        background: rgba(255,255,255,0.2);
        border: 2px solid rgba(255,255,255,0.3);
    }

    .space:hover{
        background: rgba(0,0,0,0.8);
        opacity: 1;
        font-weight: 600;
    }


    a:hover{
        text-decoration: none;
    }

    .space_icon{
        height: 100px;
        border-radius: 10px;
        box-shadow: 0px 15px 40px rgba(0,0,0,0.1);
        background: none;
        transition: 0.2s ease;
    }

    .space_title{
        font-family: 'Manrope', 'Inter', sans-serif;
        font-size: 18px;
        line-height: 110%;
        width: 95%;
        font-weight: 800;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 10px;
        text-align: center;
    }

    .space_subtitle{


        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.05px;
        margin: auto;

        color: rgba(255,255,255, 0.8);
    }
 </style>