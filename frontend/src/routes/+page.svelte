<script>
    import {onMount} from 'svelte';
    import {getFeed} from '$lib/api.js';
    import FeedList from "$lib/FeedList.svelte";
    import UsersList from "$lib/UsersList.svelte";
    import PopNotification from "$lib/shared/PopNotification.svelte";

    let feed = null
    let loading = true
    let loadLastTen = false

    let notification = ''
    let isError = true

    const handleNotification = (message, errorStatus = true) => {
        notification = message
        isError = errorStatus
        setTimeout(() => {
            notification = ''
            isError = true
        }, 3000)
    }

    onMount(async () => {
        try {
            feed = await getFeed();
            loading = false
        } catch (e) {
            handleNotification('Error loading feed')
        }
        if (feed.length === 0) {
            loadLastTen = true
        }
    });
</script>


<PopNotification message={notification} isError={isError}/>
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