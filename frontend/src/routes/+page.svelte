<script>
    import FooterNav from '$lib/FooterNav.svelte';
    import Navbar from '$lib/Navbar.svelte';
    import {onMount} from 'svelte';
    import {getFeed} from '$lib/api.js';
    import FeedList from "$lib/FeedList.svelte";

    let feed = []

    onMount(async () => {
        feed = await getFeed();
    });


</script>


<Navbar/>
<FeedList posts={feed}/>
<FooterNav/>
