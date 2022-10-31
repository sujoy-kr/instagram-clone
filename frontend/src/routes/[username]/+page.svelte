<script>
    export let data
    // console.log(data.props.user)
    const user = data.props.user
    import {baseUrl} from '$lib/config.js'
    import Navbar from '$lib/Navbar.svelte';
    import FooterNav from '$lib/FooterNav.svelte';
</script>


<Navbar/>
<div class="flex container items-center m-auto px-4 py-8 gap-8">
    <figure class="w-32">
        <img class="w-full profile-pic" src="/shrek.jpg" alt="{user.name}">
    </figure>
    <div>
        <h1 class="text-xl">{user.username}</h1>
        <p class="text-sm text-slate-400">{user.name}</p>
    </div>
</div>
<div>
    <hr>
    <ul class="flex justify-center p-4 gap-12">
        <li class="text-md text-center leading-5 text-slate-600"><b>{user.posts ? user.posts.length : 0}</b> <br> posts
        </li>
        <li class="text-md text-center leading-5 text-slate-600"><b>{user.followers ? user.followers.length : 0}</b>
            <br>
            followers
        </li>
        <li class="text-md text-center leading-5 text-slate-600"><b>{user.followings ? user.followings.length : 0}</b>
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
                <img class="w-full each-img m-auto" src="{baseUrl}/{post.url}" alt="{user.name}">
            </figure>
        {/each}
    {/if}
</div>
<FooterNav/>

<style>
    .profile-pic {
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

