<script>
    import {baseUrl} from '$lib/config.js'
    import Navbar from '$lib/Navbar.svelte';
    import FooterNav from '$lib/FooterNav.svelte';
    import {page} from '$app/stores'
    import {userByUsername} from '$lib/api.js'

    $: params = $page.params
    $: username = params.username

    $: user = null
    const trackUsernameChange = async (username) => {
        try {
            user = await userByUsername(username)
        } catch (e) {
            user = null
        }
    }

    $: trackUsernameChange(username)


</script>

<Navbar/>

{#if user}
    <div class="flex container items-center m-auto px-4 py-8 gap-8">
        <figure class="">
            <img class="profile-pic" src={user.image? `${baseUrl}/${user.image}`:"/shrek.jpg"} alt="{user.name}">
        </figure>
        <div>
            <h1 class="text-xl">{user.username} <span class="text-sm text-slate-400">({user.name})</span></h1>

            {#if user.bio}
                <p class="text-sm text-slate-600 my-2">{user.bio}</p>
            {/if}
        </div>
        <div>

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

<FooterNav/>

<style>
    .profile-pic {
        object-fit: cover;
        height: 100px;
        width: 100px;
        /*width: 100%;*/
        clip-path: circle();
    }

    .img-container {
        flex: 0 0 33.33333333%;
    }

    .each-img {
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }
</style>

