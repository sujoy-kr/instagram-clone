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
    <h1 class="text-center p-4 text-2xl text-slate-500">No posts found. Follow some users to get started.</h1>
{/if}