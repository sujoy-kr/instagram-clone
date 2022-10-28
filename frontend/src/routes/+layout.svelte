<script>
    import '../app.css';
    import '../global.css'


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

<svelte:head>
    <title>Instagram</title>
</svelte:head>
<slot/>
