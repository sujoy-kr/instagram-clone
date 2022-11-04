<script>
    import '../app.css';
    import '../global.css'

    import FooterNav from '$lib/FooterNav.svelte'
    import Navbar from '$lib/Navbar.svelte'

    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import {page} from "$app/stores";


    onMount(() => {
        let userToken = window.localStorage.getItem('token');
        if (!userToken) {
            goto('/login');
        }
    });
</script>

<svelte:head>
    <title>Instagram</title>
</svelte:head>

{#if $page.url.pathname !== '/login' && $page.url.pathname !== '/signup'}
    <Navbar/>
    <slot/>
    <FooterNav/>
{:else}
    <slot/>
{/if}