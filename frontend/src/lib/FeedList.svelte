<script>
    import FeedDetails from "$lib/FeedDetails.svelte";

    export let posts = []
</script>

{#if posts.length > 0}
    <ul class="max-w-lg mx-auto py-8">
        {#each posts as post}
            <li>
                <FeedDetails {post}/>
            </li>
        {/each}
    </ul>
{:else}
    <p class="text-center text-3xl text-slate-500 py-20 px-4">
        No posts found. Follow some users to get started.
    </p>
{/if}