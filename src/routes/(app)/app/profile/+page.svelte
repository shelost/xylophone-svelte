<script lang="ts">
    import type { PageData } from './$types';
    import { supabaseClient } from '$lib/db';
    import { onMount } from 'svelte';
    import icon from '$lib/img/favicon.svg'
    import { pages } from '$lib/utils/store';
    import { fly } from 'svelte/transition'
    import V from '$lib/img/verified.svg'
    import ThreeDotMenu from '$lib/components/ThreeDotMenu.svelte';

    export let data: PageData;
    let { profile } = data;
    let editMode = false;
    let imageFile: File;

    let loading = false; // Loading indicator for the Save button
    let usernameError: string | null = null;

    async function checkUsername() {
        if (profile.username) {
            const { data, error } = await supabaseClient
                .from('users')
                .select('username')
                .eq('username', profile.username)
                .neq('id', profile.id); // Don't select the current user's username

            if (error) {
                usernameError = "Error checking username.";
            } else if (data && data.length > 0) {
                usernameError = "This username is already taken.";
            } else {
                usernameError = null;
            }
        }
    }


   // Assuming supabaseClient is initialized somewhere above
async function fileExistsInSupabase(filePath) {
    const { error } = await supabaseClient.storage.from('images').download(filePath);
    return !error;
}

async function getImageUrlFromSupabase(filePath) {

    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
}

async function uploadToSupabase(file) {
    const filePath = `profiles/${profile.id}/${file.name}`;

    if (await fileExistsInSupabase(filePath)) {
        console.log('File already exists in Supabase. Skipping upload.');
        return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
    }

    const { error } = await supabaseClient.storage.from('images').upload(filePath, file);
    if (error) {
        console.error('Error uploading file:', error);
        return null;
    }
    return `https://daiyycuunubdakrxtztl.supabase.co/storage/v1/object/public/images/${filePath}`;
}


    let bannerImageFile = null;

    async function updateProfile() {
        try {
            let profileFilePath = null;
            let bannerFilePath = null;

            if (imageFile) {
                profileFilePath = await uploadToSupabase(imageFile);
                if (!profileFilePath) {
                    console.error('Error processing profile image file.');
                    return;
                }
            }

            if (bannerImageFile) {
                bannerFilePath = await uploadToSupabase(bannerImageFile);
                if (!bannerFilePath) {
                    console.error('Error processing banner image file.');
                    return;
                }
            }

            const { error: profileUpdateError } = await supabaseClient
                .from('users')
                .update({
                    pfp: profileFilePath || profile.pfp,
                    banner: bannerFilePath || profile.banner,
                    full_name: profile.full_name,
                    username: profile.username
                })
                .eq('id', profile.id);

            if (profileUpdateError) {
                console.error('Error updating profile:', profileUpdateError);
            } else {
                console.log('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    }

    function handleProfilePictureChange(event) {
        imageFile = event.target.files[0];
    }

    function handleBannerPictureChange(event) {
        bannerImageFile = event.target.files[0];
    }



    function resizeObjectsToCanvas(canvas, originalWidth, targetWidth) {
		const scaleX = targetWidth / originalWidth


		canvas.forEachObject((obj: any) => {
			const left = obj.left || 0;
			const top = obj.top || 0;

			obj.scaleX *= scaleX
			obj.scaleY *= scaleX
			obj.left *= scaleX
			obj.top *= scaleX

			if (obj.xPercent !== undefined) {
                const newLeftPos = canvas.width/2 + obj.xPercent * canvas.width - (obj.width * obj.scaleX) / 2;
                obj.set('left', newLeftPos);
            }

			obj.setCoords(); // Refresh object coordinates after updates
		});
		canvas.renderAll();
	}



	async function loadCanvas(page, canvas) {
		if (!page.content) {
			return;
		}

		// Ensure that the user has an active session
		const session = data.session

		// Use the session's access token in headers for authorization
		const headers = {
			'Authorization': `Bearer ${session.access_token}`
		};

		const { data: fileData, error } = await supabaseClient.storage.from('fabric')
			.download(page.content, { headers });  // Provide headers as options

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


			// Log the parsed data for confirmation


			// Load the parsed data into the canvas
			canvas.loadFromJSON(fileJson, () => {
				resizeObjectsToCanvas(canvas, page.iwidth, 300);
				canvas.renderAll();
			}, (o, object, error) => {

                if (object){
                    object.set({
                        selectable: false
                    })
                }

			});



		} catch (parseError) {
			console.error('Error parsing the blob data:', parseError);
		}
	}



    onMount(() => {
        for (let i=0; i<$pages.length; i++){
			let page = $pages[i];

			let canvas = new fabric.Canvas(document.getElementById(`canvas-${page.id}`), {
				width: 260,
				height: 220,
				renderOnAddRemove: false
			});


			if (page.content){
				loadCanvas(page, canvas);
			}

            setTimeout(() => {
                if (page.content){
                    loadCanvas(page, canvas);
                }
            }, 200);
		}
    });

</script>

<section in:fly={{ y: 50, duration: 300}} out:fly={{ y:-50, duration: 300 }}>

    {#if editMode}
        <form on:submit|preventDefault="{updateProfile}" class="flex flex-col gap-2">
            <!-- Profile Picture Upload -->
            <div class="field">
                <label for="profile_picture" class="label">Profile Picture</label>
                <input
                    type="file"
                    id="profile_picture"
                    accept="image/*"
                    on:change="{updateProfile}"
                    on:change="{handleProfilePictureChange}"
                />
                {#if profile.pfp}
                    <img src={profile.pfp} alt="Preview" class="image-preview" />
                {/if}
            </div>


            <!-- Banner Image Upload -->
            <div class="field">
                <label for="banner_picture" class="label">Banner</label>
                <input
                    type="file"
                    id="banner_picture"
                    accept="image/*"
                    on:change="{handleBannerPictureChange}"
                />
                {#if profile.banner}
                    <img src={profile.banner} alt="Preview" class="image-preview" />
                {/if}
            </div>


            <!-- Full name field -->
            <div class="field">

                <label for="full_name" class="label"> Full Name </label>
                <input
                    id="full_name"
                    name="full_name"
                    class="input"
                    type="text"
                    bind:value="{profile.full_name}"
                    required
                />
            </div>


            <!-- Username field -->
            <div class="field">

                <label for="username" class="label">Username</label>
                <input
                    id="username"
                    name="username"
                    class="input"
                    type="text"
                    bind:value="{profile.username}"
                    on:input="{checkUsername}"
                    required
                />
                {#if usernameError}
                    <p class="error-text">{usernameError}</p> <!-- Display any username errors -->
                {/if}
            </div>

             <!-- Full name field -->
             <div class="field">

                <label for="bio" class="label"> Bio </label>
                <textarea
                    id="bio"
                    name="bio"
                    class="input"
                    type="text"
                    bind:value="{profile.bio}"
                    required
                ></textarea>
            </div>




            <!-- Save button -->
            <div class="mx-auto">
                <button type="submit" class="btn btn-filled-primary" on:click={() => {editMode = false; updateProfile()}}  disabled={loading || usernameError}>Save</button>
            </div>
        </form>
    {:else}

    <div id = 'banner' style='background-image: url({profile.banner})' in:fly={{ y: 50, duration: 300, delay: 0}}> </div>

        <div id = 'mast'>

            <img class="image-preview" src={profile.pfp} alt="Profile Picture"  in:fly={{ y: 50, duration: 300, delay: 50}}/>
            <div id = 'name'  in:fly={{ y: 50, duration: 300, delay: 100}}>
                <h2>{profile.full_name}</h2>
                <img src = '{V}' alt = 'verified'>
            </div>

            <h3 in:fly={{ y: 50, duration: 300, delay: 150}}>@{profile.username}</h3>

            <p  in:fly={{ y: 50, duration: 300, delay: 200}}>{profile.bio}</p>


            <div id = 'buttons'>
                <button id = 'create' in:fly={{ y: 50, duration: 300, delay: 250}}> + Create Page </button>
                <button on:click={() => editMode = true}  in:fly={{ y: 50, duration: 300, delay: 200}}>Edit Profile</button>
            </div>

        </div>


    {/if}


    {#await $pages}

	<div id = 'loading'>
		<div class="lds-ripple"><div></div><div></div></div>
		<h1> Loading... </h1>
	</div>

{:then}

	<div id = 'pages' in:fly={{ y: 50, duration: 300}} out:fly={{ x: 200, duration: 300 }}>

		{#each $pages as page, i}

			{#if page.content}
                <div class='page' id='{page.id}' in:fly={{ y: 50, duration: 300, delay: 200+50*i}}>
                    <a href='/app/page/{page.id}'>
                        <div class = 'container' style='background: {page.color}'>
                            <canvas id='canvas-{page.id}' class='canvas'></canvas>
                            <div class = 'gradient'></div>
                        </div>
                    </a>

                    <div class = 'expo'>
                        <div class = 'title'>
                            <h1> {page.title} </h1>
                            <h2> Page </h2>
                        </div>


                        <ThreeDotMenu options={[
                            {
                            label: 'Delete',
                            action: () => deleteModalActive = true
                            },
                            {
                            label: 'Preview',
                            action: () => window.open(`/p/${page.id}`, '_blank')
                            }
                        ]} />
                    </div>


                    {#if page.user}
                    <div class = 'user'>
                        <img src = {page.user.pfp} >
                        <p> {page.user.full_name} </p>
                    </div>
                    {/if}
                </div>
			{/if}
		{/each}


	</div>

{/await}


</section>


<svelte:head>
	<title> Profile </title>
	<meta name="description" content="Arachne is a different kind of dev." />
	<link rel ='icon' href='{icon}'>
</svelte:head>



<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');



section {
    padding: 15px;
    margin-left: 240px;
    height: 100vh;
    overflow-y: scroll;
    font-family: Onest, Inter, sans-serif;
}

#banner{
    width: 100%;
    height: 280px;
    border-radius: 12px;
    background-size: cover;
    background-position: center center;
}

#mast{
    margin-top: -100px;
    margin-left: 20px;
    line-height: 1.3;

    .image-preview{
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        //box-shadow: 0px 20px 50px rgba(black, 0.2);
        margin-bottom: 24px;
    }

    h2{
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.3px;
    }

    h3{
        font-size: 16px;
        letter-spacing: -0.1px;
        font-weight: 500;
        color: rgba(black, 0.4);
        margin-bottom: 20px;
    }

    p{
        font-size: 14px;
        letter-spacing: -0.2px;
        font-weight: 500;
        color: rgba(black, 0.8);
        margin-bottom: 20px;
    }

    #name{
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 5px;

        img{
            height: 18px;
            margin-top: 1px;
        }
    }


    #buttons{
        display: flex;
        gap: 10px;

        button{
            font-size: 13px !important;
            box-shadow: none;
            background: #f0f0f0;
            color: black;
            &:hover{
                background: #e0e0e0;
            }
        }

        #create{
            background: #ff004d;
            color: white;
            &:hover{
                background: #e7002e;
            }
        }
    }
}

#title{
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
}

form {
    margin-top: 40px;
}

.field {
    margin: 10px 0;
}




#pages{
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		margin-top: 40px;

        .page{

			background: white;
			padding: 5px;
			border-radius: 5px;

			//box-shadow: 0px 0px 50px rgba(black, 0.08);
			padding-bottom: 10px;
			transition: 0.2s ease;
			cursor: pointer;

			.user{
				display: flex;
				align-items: center;
				padding: 6px 12px 6px 8px;
				gap: 8px;
				margin: 2px;
				margin-top: 12px;
				background: rgba(black, 0.05);
				width: fit-content;
				border-radius: 10px;


				img{
					height: 15px;
					border-radius: 20px;
				}
				p{
					font-size: 12px;
					font-weight: 500;
					letter-spacing: -0.3px;
					color: rgba(black, 0.8);
				}
			}

			.container{
				border-radius: 12px;
				background-image: linear-gradient(to bottom right, rgba(white, 0.9), rgba(white, 0.5)) !important;
				//box-shadow: -10px 15px 30px rgba(black, 0.08);
				padding: 1px;
				transition: 0.2s ease;
				position: relative;
				overflow: hidden;


				.gradient{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 50%;
					z-index: 3;
					//background-image: linear-gradient(190deg, rgba(white, 0.5), rgba(white, 0), rgba(white, 0));
				}

				&:hover{

					canvas{
						transform: scale(1.1);
					}

				}


			}

			canvas{
				border-radius: 10px;
				transition: 0.2s ease;

				transition: 0.2s ease;
				cursor: pointer !important;
				&:hover{
					//transform: scale(1.05) !important;
				}
			}

			.expo{
				display: flex;
				justify-content: space-between;
				width: 100%;

				.title{
					h1{
						margin-top: 10px;
						margin-left: 2px;
						font-size: 14px;
						font-weight: 600;
						letter-spacing: -0.2px;
						font-family: Onest, Inter, sans-serif;
					}

					h2{
						margin-top: 2px;
						margin-left: 2.2px;
						font-size: 12px;
						font-weight: 500;
						letter-spacing: -0.2px;
						font-family: Onest, Inter, sans-serif;
						color: rgba(black, 0.4);
					}
				}
			}



		}
	}


input {
    background: rgba(black, 0.05) !important;
}

button {
    background: black;
}


.error-text {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
}

// Optional: Style for the disabled Save button
button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

</style>
