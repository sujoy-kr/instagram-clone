<script>
    import {onMount} from 'svelte'

    $: search = ''
    onMount(
        async () => {
            const urlParams = new URLSearchParams(window.location.search);
            search = urlParams.get('search');
        }
    )
    $: console.log(search)
</script>


<p>hello</p>