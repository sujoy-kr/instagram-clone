<script>
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import {baseUrl} from '$lib/config.js';
    import {io} from "socket.io-client"
    import {getMessages} from '$lib/api.js';

    $: messages = []
    $: loading = true

    // gets the username from the URL
    $: params = $page.params
    $: receiverUsername = params.username

    $: currentMessage = ''
    $: token = ''
    $: senderUsername = ''
    $: socket = null

    onMount(async () => {
        let reqForMessages = await getMessages(receiverUsername)
        messages = reqForMessages
        loading = false

        senderUsername = localStorage.getItem('username') || ''
        token = localStorage.getItem('token') || ''

        if (senderUsername === receiverUsername) {
            await goto('/chat')
        }

        if (token) {
            socket = io.connect(baseUrl, {
                query: {
                    token
                }
            })

            socket.on('connect', () => {
                console.log('websocket connected')
            })

            socket.on('message', (data) => {
                if (messages.length > 0) {
                    messages = [...messages, data]
                } else {
                    messages = [data]
                }
            })
        }
    })

    const handleMessage = () => {
        if (currentMessage && senderUsername && receiverUsername) {
            const message = {
                senderUsername,
                receiverUsername,
                message: currentMessage
            }

            const res = socket.emit('message', message)

            if (res.connected) {
                if (messages.length > 0) {
                    messages = [...messages, message]
                } else {
                    messages = [message]
                }
            }

            currentMessage = ''
        }
    }
</script>

<div class="h-16 p-4 flex items-center gap-4 fixed top-0 username-goback">
    <button class="cursor-pointer" on:click={() => goto('/inbox')}>
        <svg aria-label="Back" class="_ab6- -rotate-90" color="#262626" fill="#262626" height="24" role="img"
             viewBox="0 0 24 24"
             width="24">
            <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
        </svg>
    </button>
    <h1 on:click={() => goto(`/${receiverUsername}`)}
        class="cursor-pointer font-semibold text-sm tracking-wider">{receiverUsername}</h1>
</div>

<div class="p-8 m-auto">

    {#if loading}
        <h1 class="text-center mb-4 text-2xl text-slate-500">
            Loading ...
        </h1>

    {:else if messages.length > 0 && !loading}
        <ul>
            {#each messages as message}
                <li class:myText={message.senderUsername === senderUsername}
                    class="message px-4 p-2.5 mb-4 w-fit text-slate-600 text-sm overflow-hidden">{message.message}</li>
            {/each}
        </ul>
    {:else}
        <h1 class="text-center mb-4 text-2xl text-slate-500">
            Make the first move!
        </h1>
    {/if}
</div>
<form on:submit|preventDefault={handleMessage} class="flex justify-between message-form h-16">
    <input class="w-full focus:outline-none text-sm px-3 py-2" type="text" placeholder="Message..."
           required
           bind:value={currentMessage}
           name="message">
    <button class:postBtnActive={currentMessage}
            class="text-sm text-blue-200 ease-in-out transition font-semibold tracking-wider px-3 py-2">Send
    </button>
</form>

<style>

    .username-goback {
        border-bottom: 1px solid rgba(183, 195, 208, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #FAFAFA;
        z-index: 9999999;
    }

    .message-form {
        border-top: 1px solid rgba(183, 195, 208, 0.5);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #FAFAFA;
        z-index: 9999999;
    }

    .message-form input {
        background-color: #FAFAFA;
    }

    .postBtnActive {
        color: #63A6F7;
    }

    .message {
        border-radius: 25px;
        max-width: 200px;
        word-wrap: break-word;
        border: 1px solid #E0E7EF;
    }

    .myText {
        background-color: rgb(239, 239, 239);
        align-self: flex-end;
        border: none;
        margin-left: auto;
    }

</style>