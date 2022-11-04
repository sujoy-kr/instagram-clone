<script>
    import {baseUrl} from '$lib/config.js'
    import {page} from '$app/stores'
    import {userByUsername, toggleFollow} from '$lib/api.js'
    import {goto} from '$app/navigation';
    import {onMount} from "svelte";

    // gets the username from the URL
    $: params = $page.params
    $: username = params.username

    $: user_id = null

    let loading = true

    // get user data and track loading state
    $: user = null
    const trackUsernameChange = async (username) => {
        try {
            user = await userByUsername(username)
            console.log(user)
            loading = false
        } catch (e) {
            loading = false
            user = null
        }
    }
    $: trackUsernameChange(username)

    // follow/unfollow user
    let followingStatus = false

    $: if (user && user.followers) {
        followingStatus = user.followers.includes(+user_id)
        console.log(followingStatus)
    }

    const handleFollowToggle = async () => {
        try {
            await toggleFollow(user.username)
            user = await userByUsername(username)
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }

    onMount(async () => {
        user_id = localStorage.getItem('user_id')
    })


</script>

{#if loading}
    <p class="text-center text-3xl text-slate-500 py-20">
        Loading ...
    </p>

{:else if user && !loading}
    <div class="flex container items-center m-auto px-4 py-8 gap-4">
        <figure class="w-28">
            <img class="profile-pic" src={user.image? `${baseUrl}/${user.image}`:"/shrek.jpg"} alt="{user.name}">
        </figure>
        <div class="namebio w-96">
            <h1 class="text-xl mb-2">{user.username} <span class="text-sm text-slate-400">({user.name})</span></h1>

            {#if user.bio}
                <p class="text-sm text-slate-600">{user.bio}</p>
            {/if}

            {#if user.username === window.localStorage.getItem('username')}
                <button on:click={()=> goto('/editprofile')} class="editprofile text-sm py-1 mt-2 px-4">Edit
                    profile
                </button>
            {/if}
            {#if user.username !== window.localStorage.getItem('username')}
                <button on:click={handleFollowToggle}
                        class:btnRed={followingStatus}
                        class="followBtn text-sm py-1 mt-2 px-4">{ followingStatus ? 'Unfollow' : 'Follow' }
                </button>
            {/if}
        </div>
    </div>
    <div>
        <hr>
        <ul class="flex justify-center p-4 gap-12">
            <li class="text-md text-center leading-5 text-slate-600"><b>{user.posts ? user.posts.length : 0}</b> <br>
                posts
            </li>
            <li class="text-md text-center leading-5 text-slate-600"><b>{user.followers ? user.followers.length : 0}</b>
                <br>
                followers
            </li>
            <li class="text-md text-center leading-5 text-slate-600">
                <b>{user.followings ? user.followings.length : 0}</b>
                <br>
                following
            </li>
        </ul>
    </div>
    <hr>
    <div class="flex flex-wrap max-w-4xl px-2 py-4 m-auto">
        {#if user.posts}
            {#each user.posts as post}
                <figure class="img-container p-1.5">
                    <img class="each-img m-auto" src="{baseUrl}/{post.url}" alt="{user.name}">
                </figure>
            {/each}
        {/if}
    </div>
{:else}
    <p class="text-center text-3xl text-slate-600 pt-20 pb-2">¯\_(ツ)_/¯</p>
    <p class="text-center text-8xl font-semibold text-slate-600">404</p>
    <p class="text-center text-2xl text-slate-600 pb-20">Page Not Found</p>
{/if}


<style>
    .profile-pic {
        object-fit: cover;
        height: 100px !important;
        width: 100px !important;
        clip-path: circle();
    }

    .followBtn {
        background-color: #0095f6;
        color: white;
        width: 120px;
        border-radius: 3px;
        margin-top: 1rem;
    }

    .btnRed {
        background-color: #ed4956;
    }

    .img-container {
        flex: 0 0 33.33333333%;
    }

    .each-img {
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }

    .editprofile {
        border: 1px solid rgb(219, 219, 219);
        border-radius: 3px;
        margin-top: 1rem;
    }

    @media only screen and (max-width: 600px) {
        .namebio {
            width: 200px;
        }

        .namebio h1 {
            font-size: 16px;
            margin-bottom: 0;
        }

        .namebio h1 span {
            font-size: 12px;
        }

        .editprofile {
            margin-top: .25rem;
        }
    }


</style>

