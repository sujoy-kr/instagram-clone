<script>
    import {postAPost} from "$lib/api.js";
    import {goto} from "$app/navigation";

    // for error notification
    import PopNotification from '$lib/shared/PopNotification.svelte'

    let notification = ''
    let isError = true

    const handleNotification = (message, errorStatus = true) => {
        notification = message
        isError = errorStatus
        setTimeout(() => {
            notification = ''
            isError = true
        }, 3000)
    }

    const handlePost = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // check if image exists
        if (data.get('image').size === 0) {
            return handleNotification('Please select an image')

        }

        try {
            const res = await postAPost(data);
            await goto(`/post/${res.post_id}`)
        } catch (error) {
            handleNotification(error.response.data.message)
        }
    }
</script>

<PopNotification message={notification} isError={isError}/>
<div class="flex justify-center p-4">
    <form method="post" on:submit={handlePost} enctype="multipart/form-data"
          class="p-4 text-center rounded-md shadow-md bg-white max-w-fit">
        <input type="text" name="title" class="mb-4 text-sm focus:outline-none rounded-md bg-slate-100 p-2 w-full"
               placeholder="Post title"/>
        <input type="file" name="image" class="block mb-4"/>

        <button
                class="p-2 w-full text-sm bg-blue-500 tracking-wide rounded-md text-white font-semibold"
                type="submit">
            Upload
        </button>
    </form>
</div>

<style>
    input {
        max-width: 250px;
    }
</style>