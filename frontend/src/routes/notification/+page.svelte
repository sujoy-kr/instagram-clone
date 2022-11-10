<script>
    import {getNotifications} from "$lib/api.js";
    import {onMount} from "svelte";
    import {baseUrl} from "$lib/config.js";

    let notifications = []

    onMount(
        async () => {
            notifications = await getNotifications()
        }
    )

</script>

{#if notifications.length > 0}
    <ul class="p-4">
        {#each notifications as notification}
            <li
                    class="flex rounded-md p-2 gap-3 items-center w-72 m-auto cursor-pointer">
                <img class="profile-pic" src={notification.image? `${baseUrl}/${notification.image}`: '../shrek.jpg'}>
                <div>
                    <h3
                            class="text-sm">
                        <span class="font-semibold tracking-wide">{notification.notification.split(' ')[0]}</span>
                        {notification.notification.substr(notification.notification.indexOf(" ") + 1)}
                    </h3>
                </div>
            </li>
        {/each}
    </ul>

{/if}

<style>
    .profile-pic {
        clip-path: circle();
        object-fit: cover;
        height: 50px;
        width: 50px;
    }
</style>