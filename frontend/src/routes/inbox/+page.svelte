<script>
    import {getInbox} from '$lib/api.js'
    import {onMount} from 'svelte'
    import {goto} from "$app/navigation";
    import {baseUrl} from "$lib/config.js";

    $: inbox = []
    $: loading = true
    onMount(async () => {
        inbox = await getInbox()
        loading = false
    })
</script>

<div class="p-4">

    {#if loading}
        <h1 class="text-center mb-2 text-2xl text-slate-500">
            Loading ...
        </h1>

    {:else if inbox.length > 0 && !loading}
        <!--        <h1 class="text-center mb-2 text-2xl text-slate-500">-->
        <!--            Inbox:-->
        <!--        </h1>-->
        <ul>
            {#each inbox as user}
                <li on:click={() => {goto(`/${user.username}/message`)}}
                    class="flex rounded-md p-2 gap-4 w-72 m-auto cursor-pointer">
                    <img class="profile-pic" src={user.image? `${baseUrl}/${user.image}`: '../shrek.jpg'}
                         alt="{user.name}">
                    <div>
                        <h3 class="text-md">{user.username}</h3>
                        <p class="text-sm text-slate-400">{user.lastMessage}</p>
                    </div>
                </li>

            {/each}
        </ul>
    {:else}
        <h1 class="text-center mb-2 text-2xl text-slate-500">
            No messages yet
        </h1>
    {/if}
</div>

<style>
    .profile-pic {
        clip-path: circle();
        object-fit: cover;
        height: 50px;
        width: 50px;
    }
</style>