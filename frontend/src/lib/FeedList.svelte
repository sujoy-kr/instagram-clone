<script>
    import FeedDetails from "$lib/FeedDetails.svelte";

    export let posts = []
</script>

{#if posts.length === 0}
    <p class="text-center text-3xl text-slate-500 py-20">Loading ...</p>
{:else}

    <ul class="max-w-lg mx-auto py-8">
        {#each posts as post}
            <li>
                <FeedDetails {post}/>
            </li>
        {/each}
    </ul>

{/if}