<script>
    import {page} from '$app/stores'
    import {getPostById} from '$lib/api.js'
    import FeedDetails from "$lib/FeedDetails.svelte";

    $: params = $page.params
    $: id = params.id

    let loading = true

    $: post = null
    const trackingIdChange = async (id) => {
        try {
            post = await getPostById(id)
            loading = false
        } catch (e) {
            post = null
            loading = false
        }
    }
    $: trackingIdChange(id)

</script>

{#if loading}
    <p class="text-center text-3xl text-slate-500 py-20">
        Loading ...
    </p>

{:else if post && !loading}
    <ul class="max-w-lg mx-auto py-8">
        <li>
            <FeedDetails {post} full={true}/>
        </li>
    </ul>
{:else}
    <p class="text-center text-3xl text-slate-600 pt-20 pb-2">¯\_(ツ)_/¯</p>
    <p class="text-center text-8xl font-semibold text-slate-600">404</p>
    <p class="text-center text-2xl text-slate-600 pb-20">Post Not Found</p>
{/if}
