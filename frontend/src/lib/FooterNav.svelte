<script>
	import NavItems from '$lib/NavItems.svelte';
    
    $: outerWidth = 0
</script>

<svelte:window bind:outerWidth />

{#if outerWidth < 601}
    <div class="footer-nav">
        <NavItems />
    </div>
{/if}

<style>
    .footer-nav {
        position: fixed;
        bottom:0;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>