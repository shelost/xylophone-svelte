<div id = 'app'>

    <div id = 'bar'>

        <h2 id = 'title'>

            {#if $folder}
                {$folder.name}
             {:else}
                {data.title}
             {/if}
        </h2>


        {#await $folder}

        {:then $folder}

            {#if $folder}

                <div id = 'pages' data-sveltekit-reload>

                    {#each $folder.objects as page}


                        {#if page}

                            <a href = '/p/{page.id}' >
                                <h2 class:active = {page.id == data.id}>
                                    {page.title}
                                </h2>
                            </a>

                            {/if}



                    {/each}

                </div>
v
            {/if}

        {/await}


        {#await $user}

        {:then $user}

            {#if $user}

                <div id = 'profile'>
                    <img src = '{$user.pfp}' alt = 'pfp'>
                    <h2 id = 'name'> {$user.full_name} </h2>
                </div>

          {/if}

        {/await}
    </div>

  <canvas id = 'canvas'></canvas>


  <a href = 'https://capsule.pw'>
    <div id = 'banner'>
        <img src = {Arachne} >
        <h1> Made with Arachne </h1>
      </div>
    </a>


    <h1 id = 'link'> Hello </h1>

</div>



<style lang='scss'>

    #link{
        color: white;
        position: fixed;
        top: 10px;
        left: 10px;
        transition: 0.2s ease;
        background: rgba(black, 0.8);
        padding: 10px 15px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
    }



    ::-webkit-scrollbar{
        width: 0px;
        height: 0;
        background: white;
    }

    ::-webkit-scrollbar-thumb{
        background: rgba(black, 0.4);
    }

    #app{
        width: 100vw;
        height: 100vh;

        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: center !important;
    }



    #canvas{
        height: 100vh;
        width: 100vw;

        border-radius: 10px;
        flex-shrink: 0;

        transition: 0.2s ease;

        //box-shadow: 0 30px 90px rgba(black, 0.1);
    }

    #floatingOptions{
        position: absolute;
        opacity: 0;
    }

    #banner{
      position: fixed;
      bottom: 0px;
      left: 0px;
      padding: 12px 15px 10px 12px;
      background: #f0f0f0;
      background: #ff004d;
      color: white;
      border-radius: 0 10px 0 0;
      letter-spacing: -0.3px;
      font-size: 13px;
      font-weight: 600;
      transform: translateY(30px);
      opacity: 0;
      width: fit-content;
      transition: 0.2s ease;

      display: flex;
      gap: 8px;

      img{
        width: 13px;
        filter: brightness(500%);
      }

      animation: float 0.3s ease-in-out 0s forwards;
    }

    @keyframes float{
      from{
        opacity: 0;
        transform: translateY(30px);
      }
      to{
        opacity: 1;
        transform: translateY(0px);
      }


    }


    #panel{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 240px;
        background: rgba(black, 0.05);

        #buttons{
            gap: 20px;
            margin: 30px;

        }

        #controls{
            label{
                font-size: 12px !important;
                display: flex;
                flex-direction: column;
            }
            #fontFamily{
                background: white;
            }
            input{
                background: white;
                padding: 5px;
            }
        }
    }

    .active{
        opacity: 1;
    }

    #container {
        flex-grow: 1;
        width: calc(100vw - 480px);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-y: scroll;



    }


    #bar{
        padding: 10px 16px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 3;

        display: flex;
        justify-content: center;



    #pages{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }




        #title{
            position: fixed;
            top: 10px;
            left: 15px;

        }

        h2{
            font-size: 13px;
            font-weight: 500;
            letter-spacing: -0.3px;
            transition: 0.2s ease;
            opacity: 0.4;

            &.active{
                opacity: 1;
            }

            &:hover{
                opacity: 1;
            }
        }


        #profile{
            position: fixed;
            top: 10px;
            right: 15px;


            display: flex;
            align-items: center;
            gap: 10px;

            img{
                height: 16px;
                border-radius: 5px;
            }


        }

    }



    @media screen and (max-width: 800px){

        #container{
            width: 100vw;
        }

        #canvas{
            width: 80vw;
        }

        #banner{
            left: 10px;
            bottom: 10px;
            width: calc(100vw - 20px);
            border-radius: 50px;
        }
    }

</style>


<svelte:head>
	<title> {data.title} </title>
	<meta name="description" content="Explore Scrollable - your final reading app. Find all the classics in a scrollable form, get the recent releases, and subscribe to our updates!" />
    <link rel = 'icon' href = '{X}'>

</svelte:head>


<script>

import {onMount} from 'svelte'
import {writable} from 'svelte/store'
import {fabric} from 'fabric'
import {supabaseClient} from '$lib/db'
import X from '$lib/img/favicon.svg'
export let data;

import Arachne from '$lib/img/octagon.svg'

import {pages} from '$lib/utils/store'


const user = writable(null)

const folder = writable(null)




async function fetchPages(){

const {data: d, error} = await supabaseClient.from('pages').select('*').eq('user_id', data.user_id).order('index', { ascending: true });

if (!error){
	pages.set(d)
}else{
	console.log('Error fetching pages:' + error)
}
}


async function fetchFolder(){

    const {data: d, error} = await supabaseClient.from('folders').select('*').eq('id', data.folder_id).single()

    if (!error){
        folder.set(d)

        $: if ($folder){
                $folder.objects = []

                $folder.pages = $folder.pages.filter(function(item, pos) {
                    return $folder.pages.indexOf(item) == pos;
                })


                $folder.pages = $folder.pages.filter(function(item, pos) {
                    return $folder.pages.indexOf(item) == pos;
                })




                $folder.pages.forEach(page => {


                    let object = $pages.find(x => x.id == page)
                    $folder.objects.push(object)

                })

            }

        setTimeout(()=> {


        },500)


    }else{
        console.error('error fetching folder: ' + folder)
    }
}




try{
    fetchPages()
fetchFolder()


}catch (e){
    console.error(e)
}


onMount(()=> {


let isScrolling = false;  // Flag to check if scrolling is active
let scrollInterval;  // Store the interval ID

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {  // Check if the pressed key is spacebar
    e.preventDefault();  // Prevent default spacebar action (page jump)

    if (isScrolling) {
      clearInterval(scrollInterval);  // Stop the auto-scrolling
    } else {
      scrollInterval = setInterval(function() {
        let currentScrollPos = document.querySelector('#app').scrollTop;
        document.querySelector('#app').scrollTop = currentScrollPos + 0.75;  // Adjust '1' to change scroll speed
      }, 10);  // Adjust '30' to make scrolling faster or slower
    }
    isScrolling = !isScrolling;  // Toggle the flag
  }

});



    let initialCanvasWidth = window.innerWidth;  // Initial canvas width, 250 is the panel width
    let initialCanvasHeight = window.innerHeight;  // Initial canvas height

    let canvas = new fabric.Canvas('canvas', {
        width: initialCanvasWidth,
        height: initialCanvasHeight,
        renderOnAddRemove: false
    });


    let panelWidth = 260
    let newWidth = window.innerWidth - panelWidth;
    if (window.innerWidth < 800){
      newWidth = window.innerWidth
    }

    canvas.setWidth(newWidth)
    let scaleX = newWidth / data.iwidth

    resizeCanvas()




///


const loadCanvasFromSupabase = async () => {
    if (!data.content) {
        return;
    }

    // Ensure that the user has an active session
    const session = data.session;

    if (!session) {
        return;
    }
    // Use the session's access token in headers for authorization
    const headers = {
        'Authorization': `Bearer ${session.access_token}`
    };

    const { data: fileData, error } = await supabaseClient.storage.from('fabric')
        .download(data.content, { headers });  // Provide headers as options

    if (error) {
        console.error('Error downloading the file:', error);
        return;
    }

    // Convert blob data to JSON string
    const blobToText = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(blob);
        });
    };

    try {
        const fileText = await blobToText(fileData);
        const fileJson = JSON.parse(fileText);
 // Load the parsed data into the canvas
 canvas.loadFromJSON(fileJson, () => {

            const canvasCenterX = canvas.width / 2;

            canvas.getObjects().forEach((object) => {
                if (object.xPercent !== undefined) {
                    const newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX) / 2;
                    object.set('left', newLeftPos);
                    //object.set('top', object.originalTop)
                }

            });


            applyParallaxEffect();
            canvas.setHeight(data.height);
            //document.getElementById('app').style.height = data.height + 'px'

            document.getElementById('bar').style.background = data.color
            canvas.setBackgroundColor(data.color);
            canvas.renderAll();



        }, function (o, object) {

            object.selectable = false
        });

    } catch (parseError) {
        console.error('Error parsing the blob data:', parseError);
    }
};



loadCanvasFromSupabase()

///





async function fetchUser(){
    const { data : k, error: e} = await supabaseClient
        .from('users') // Update the table name to 'profiles'
        .select('*') // Fetch all columns for the active user
        .eq('id', data.user_id) // Use the user.id to fetch data for the active user
		.single()
    if (!e) {
        user.set(k)
        console.log(k)
    } else {
        console.error('Error fetching user data:', e);
    }
}

fetchUser()



function applyParallaxEffect() {


    let scrollAmount = document.getElementById('app').scrollTop;

        canvas.forEachObject(object => {
            // Assuming default depth is 0 if not specified
            let depth = object.depth || 0;

            // Calculate the parallax shift. The '0.2' is the factor which
            // determines how "fast" depth 1 objects move relative to the canvas.
            let parallaxShift = 0.3 * depth * scrollAmount;

            // Depth 0 objects should move with the canvas, so we subtract the scroll amount
            let newTopPosition = object.originalTop + parallaxShift - scrollAmount;

            // Set the new top position for the object

            object.set('top', newTopPosition);
        });

        canvas.renderAll(); // Refresh the canvas to reflect the changes
        canvas.calcOffset()
    }

    // Listen for the scroll event on the #app element
    document.getElementById('app').addEventListener('scroll', applyParallaxEffect);

    document.getElementById('app').style.background = data.color

    /*
    canvas.loadFromJSON(data.content, function() {
        canvas.renderAll();
        canvas.calcOffset();



        canvas.forEachObject((object) => {
            object.left *= scaleX;
            object.scaleX *= scaleX;
            object.top *= scaleX;
            object.scaleY *= scaleX;
            object.setCoords();
        });

        canvas.renderAll();
        canvas.calcOffset();


    if (window.innerWidth < 800) {
        canvas.setWidth(window.innerWidth);

    }else{
        canvas.setWidth(window.innerWidth - panelWidth);
    }
    canvas.setHeight(window.innerHeight)




    let maxHeight = 0;

    canvas.forEachObject((object) => {
    // Calculate the bottom edge position for each object.
    const objBottomEdge = object.top + object.height * object.scaleY;

    // Update maxHeight if this object is lower.
    if (objBottomEdge > maxHeight) {
        maxHeight = objBottomEdge;
    }
    });

    // Add 30px to maxHeight and update canvas height.
    canvas.setHeight(maxHeight + 30);

    // Update canvas dimensions on the actual HTML element
    canvas.calcOffset();


    canvas.getObjects().forEach(object => {
        object.originalTop = object.top;
    });




    // Apply parallax effect based on the depth and scroll amount

        //resizeCanvas()
    },function(o,object){

        if (object){
            object.set({
                lockMovementX: true,
                lockMovementY: true,
                hasControls: false,
                hasBorders: false,
                selectable: true,
                editable: false,
                easing: fabric.util.ease.easeInOut
            });
        }


    })
    */


    canvas.on('selection:created', function(event) {
        const activeObject = event.target;
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set({
                lockMovementX: true,
                lockMovementY: true,
                editable: true  // Allow editing/highlighting
            });
        }
    });




//// PARALLAX ////

/*

window.addEventListener('resize', debounce(() => {
        panelWidth = 260
        newWidth = window.innerWidth - panelWidth;

        if (window.innerWidth < 800){
            newWidth = window.innerWidth
        }
        scaleX = newWidth / canvas.getWidth()

        // Scale each object
        canvas.forEachObject((object) => {
            object.left *= scaleX;
            object.scaleX *= scaleX;
            object.top *= scaleX;
            object.scaleY *= scaleX;
            object.setCoords();
        });

        // Update canvas dimensions
        canvas.setWidth(newWidth);
        //canvas.setHeight(initialCanvasHeight * scaleX);
        canvas.renderAll();
        canvas.calcOffset()

        resizeCanvas()


    // Update initial dimensions
    initialCanvasWidth = newWidth;
    initialCanvasHeight = canvas.getHeight();


    // Re-render the canvas
    canvas.renderAll();
}))


*/


/*

window.addEventListener('resize', unifiedResize)

function unifiedResize(newContainerWidth = window.innerWidth - panelWidth) {




    const canvasCenterX = canvas.width/2
    // Adjust position relative to the canvas width change.
    const newLeftPos = canvasCenterX + object.xPercent * canvas.width - (object.width * object.scaleX)/2

    object.left = newLeftPos
    object.setCoords();



    canvas.clipTo = function(ctx) {
        ctx.rect(0, 0, newWidth, canvas.getHeight());
        ctx.clip();
    };

    canvas.setWidth(newWidth);


    canvas.renderAll();
    canvas.calcOffset();
}
*/





canvas.on('mouse:up', function (options) {
  if (options.target) {
    // Check if the clicked object has an externalLink attribute

    if (options.target.link) {
      // Open the external link
      window.location = options.target.link
    }
  }
});



function resizeCanvas() {
  let maxHeight = 0;

  canvas.forEachObject((object) => {
    // Calculate the bottom edge position for each object.
    const objBottomEdge = object.top + object.height * object.scaleY;

    // Update maxHeight if this object is lower.
    if (objBottomEdge > maxHeight) {
      maxHeight = objBottomEdge;
    }
  });

  // Add 30px to maxHeight and update canvas height.
 //canvas.setHeight(maxHeight + 30);

  // Update canvas dimensions on the actual HTML element
  canvas.calcOffset();
}

function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}

let originalTops = {};
let originalScales = {};



canvas.on('mouse:over', function(e) {

    let target = e.target;

    if (e.target){
        // Store the original top position and scale
        originalTops[target] = target.top;
        originalScales[target] = { x: target.scaleX, y: target.scaleY };

        target.animate('opacity', 0.8, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });


        if (e.target.link && e.target.link != 'undefined'){
            document.getElementById('link').innerHTML = e.target.link
            document.getElementById('link').style.left = e.e.screenX + 'px'
            document.getElementById('link').style.top = e.e.screenY - 120 + 'px'
            document.getElementById('link').style.opacity = 1
    }
    }

});


canvas.on('mouse:out', function(e) {
    let target = e.target;


    // Return to the original top position
    if (originalTops[target]) {
        target.animate('opacity', 1, {
            duration: 100,
            onChange: canvas.renderAll.bind(canvas)
        });
    }

    document.getElementById('link').style.opacity = 0
});



})

</script>

