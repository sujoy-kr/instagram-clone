<script>
    import {scale} from 'svelte/transition';

    export let message = ''
    export let isError = false
</script>

{#if message !== ''}
    <div in:scale out:scale class:isError={isError}
         class="bg-green-500 text-lg font-semibold tracking-wide w-full text-center max-w-xl text-white rounded-sm fixed errorBox">
        {message}
    </div>
{/if}

<style>
    .errorBox {
        top: 80px;
        /*margin: 0 10px;*/
        left: 50%;
        text-align: center;
        padding: 10px 20px;
        transform: translateX(-50%);
        z-index: 99999;
    }

    .isError {
        background-color: #F23D61;
    }
</style>