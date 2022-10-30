<script>
    import NavItems from '$lib/shared/NavItems.svelte';

    $: outerWidth = 0
</script>

<svelte:window bind:outerWidth/>

{#if outerWidth < 701}
    <div class="footer-nav">
        <NavItems/>
    </div>
{/if}

<style>
    .footer-nav {
        z-index: 9999;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>