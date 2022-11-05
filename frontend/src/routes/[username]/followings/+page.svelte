<script>
    import {onMount} from "svelte";
    import {getFollowings} from '$lib/api.js'
    import UserDetails from '$lib/shared/UserDetails.svelte'
    import {page} from "$app/stores";

    $: params = $page.params
    $: username = params.username
    $: loading = true

    let users = []
    onMount(
        async () => {
            users = await getFollowings(username)
            loading = false
        }
    )
</script>

{#if loading}
    <p class="text-center text-3xl text-slate-500 py-20">
        Loading ...
    </p>
{:else if users.length > 0}
    <h1 class="text-center pt-4 mb-4 text-2xl text-slate-500">{username}'s followings:</h1>
    <ul>
        {#each users as user}
            <UserDetails user={user}/>
        {/each}
    </ul>
{/if}

{#if !loading && users.length === 0}
    <p class="text-center text-3xl text-slate-500 py-20">
        {username} is not following anyone yet.
    </p>
{/if}