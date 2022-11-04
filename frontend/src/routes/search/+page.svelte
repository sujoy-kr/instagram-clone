<script>
    import {onMount} from 'svelte'
    import {getSearchedUser} from "$lib/api.js";
    import UserDetails from "$lib/shared/UserDetails.svelte";

    $: search = ''
    $: users = []
    $: loading = true

    onMount(
        async () => {
            const urlParams = new URLSearchParams(window.location.search)
            search = urlParams.get('search')

            if (search) {
                users = await getSearchedUser(search)
            }
            loading = false
        }
    )
</script>

{#if loading}
    <p class="text-center text-3xl text-slate-500 py-20">
        Loading ...
    </p>
{:else if users.length > 0}
    <ul class="py-4">
        {#each users as user}
            <UserDetails user={user}/>
        {/each}
    </ul>
{/if}

{#if !loading && users.length === 0}
    <p class="text-center text-3xl text-slate-500 py-20">
        No users found
    </p>
{/if}