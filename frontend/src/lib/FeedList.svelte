<script>
    import FeedDetails from "$lib/FeedDetails.svelte";

    export let posts = []
</script>

{#if posts.length === 0}
    <p class="text-center text-3xl text-slate-500 py-12">Loading ...</p>
{:else}

    <ul class="max-w-lg m-auto">
        {#each posts as post}
            <li>
                <FeedDetails {post}/>
            </li>
        {/each}
    </ul>

{/if}