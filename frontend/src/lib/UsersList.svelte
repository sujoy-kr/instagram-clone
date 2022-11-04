<script>
    import {onMount} from "svelte";
    import {getLastTenUsers} from '$lib/api.js'
    import UserDetails from '$lib/shared/UserDetails.svelte'

    let users = []
    onMount(
        async () => {
            users = await getLastTenUsers()
        }
    )

</script>

{#if users.length > 0}
    <h1 class="text-center mb-4 text-2xl text-slate-500">People you may know:</h1>
    {#each users as user}
        <ul>
            <UserDetails user={user}/>
        </ul>
    {/each}
{/if}