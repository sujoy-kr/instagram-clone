<script>
    import '../app.css';
    import '../global.css'

    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';


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
<slot/>
