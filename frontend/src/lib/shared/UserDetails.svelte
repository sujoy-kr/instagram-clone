<script>
    export let user
    import {baseUrl} from '$lib/config.js'
    import {goto} from '$app/navigation';
</script>

<li on:click={() => {goto(`/${user.username}`)}}
    class="flex shadow rounded-md p-4 gap-4 w-72 bg-white mb-4 m-auto cursor-pointer">
    <img class="profile-pic" src={user.image? `${baseUrl}/${user.image}`: './shrek.jpg'} alt="{user.name}">
    <div>
        <h3 class="text-md">{user.username}</h3>
        <p class="text-sm text-slate-500">{user.name}</p>
    </div>
</li>

<style>
    .profile-pic {
        clip-path: circle();
        object-fit: cover;
        height: 50px;
        width: 50px;
    }
</style>