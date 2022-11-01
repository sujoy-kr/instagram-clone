<script>
    import {postAPost} from "$lib/api.js";
    import {goto} from "$app/navigation";

    const handlePost = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            await postAPost(data);
            goto(`/${window.localStorage.getItem("username")}`);
        } catch (error) {
            console.log(error);
        }

    }
</script>

<div class="flex justify-center p-4">
    <form method="post" on:submit={handlePost} enctype="multipart/form-data"
          class="p-4 text-center rounded-md shadow-md bg-white max-w-fit">
        <input type="file" name="image" class="block mb-4" required/>

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