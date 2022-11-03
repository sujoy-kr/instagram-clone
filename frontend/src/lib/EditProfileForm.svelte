<script>
    import {updateAnUser} from "$lib/api.js"
    import {goto} from "$app/navigation";


    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            await updateAnUser(data);
            goto(`/${window.localStorage.getItem("username")}`);
        } catch (error) {
            alert(error);
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        goto('/login')
    }

</script>


<div class="p-4 ">
    <form class="bg-white rounded-md max-w-fit p-4 mx-auto my-4"
          enctype="multipart/form-data"
          on:submit|preventDefault={handleUpdate}>

        <div class="flex flex-col">
            <div class="text-right w-full mb-4">
                <label for="name">Name: </label>
                <input id="name" class="text-sm focus:outline-none rounded-md bg-slate-100 p-2" type="text"
                       name="name"/>
            </div>
            <div class="text-right w-full mb-4">
                <label for="bio">Bio: </label>
                <input id="bio" class="text-sm focus:outline-none rounded-md bg-slate-100 p-2" type="text"
                       name="bio"/>
            </div>
            <div class="text-right w-full mb-4">
                <label for="profilePic">Profile Picture: </label>
                <input id="profilePic" class="text-sm focus:outline-none rounded-md bg-slate-100 p-2" type="file"
                       name="image"/>
            </div>
        </div>
        <div class="text-center mt-4 mb-2">
            <button class="px-8 py-2 text-sm bg-blue-500 tracking-wide rounded-md text-white font-semibold"
                    type="submit">Save
            </button>
        </div>
    </form>
    <div class="text-center mt-4 mb-2">
        <button on:click={handleLogOut}
                class="px-8 py-2 text-sm bg-rose-500 tracking-wide rounded-md text-white font-semibold"
                type="submit">Log out
        </button>
    </div>
</div>


<style>
    form {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    form input {
        width: 250px;
        height: 40px;
        margin-left: 10px;
    }

    .text-right {
        text-align: right;
    }


    @media only screen and (max-width: 500px) {
        .text-right {
            text-align: center;
        }

        form label {
            display: block;
        }

        form input {
            width: 100%;
            margin-left: 0;
        }
    }
</style>