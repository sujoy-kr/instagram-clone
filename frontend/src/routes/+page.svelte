<script>
    import FooterNav from '../lib/FooterNav.svelte';
    import Navbar from '../lib/shared/Navbar.svelte';
    import UserStore from '../stores/UserStore.js'
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';

    $: userToken = $UserStore.token;

    onMount(() => {
        if (!userToken) {
            goto('/login');
        }
    });
</script>

<Navbar/>
<FooterNav/>
