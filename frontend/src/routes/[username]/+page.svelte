<script>
    export let data
    console.log(data.props.user)
    const user = data.props.user

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
        <li class="text-md text-center leading-5 text-slate-600"><b>{5}</b> <br> posts</li>
        <li class="text-md text-center leading-5 text-slate-600"><b>{5}</b> <br> followers</li>
        <li class="text-md text-center leading-5 text-slate-600"><b>{5}</b> <br> following</li>
    </ul>
</div>
<hr>

<FooterNav/>

<style>
    .profile-pic {
        clip-path: circle();
    }
</style>

