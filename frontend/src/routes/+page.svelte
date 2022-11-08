<script>
    import {onMount} from 'svelte';
    import {getFeed} from '$lib/api.js';
    import FeedList from "$lib/FeedList.svelte";
    import UsersList from "$lib/UsersList.svelte";

    let feed = null
    let loading = true
    let loadLastTen = false

    onMount(async () => {
        feed = await getFeed();
        loading = false
        if (feed.length === 0) {
            loadLastTen = true
        }
    });
</script>


{#if loading}
    <p class="text-center text-3xl text-slate-500 py-20">
        Loading ...
    </p>
{:else}
    <FeedList posts={feed}/>
{/if}

{#if !loading && loadLastTen}
    <UsersList/>
{/if}