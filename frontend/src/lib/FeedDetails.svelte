<script>
    export let post = {}
    import {baseUrl} from '$lib/config.js'
</script>

<figure class="bg-white rounded-md overflow-hidden mb-8">
    <div class="flex p-3 items-center gap-4">
        <img class="w-10 profile-pic" src="./shrek.jpg" alt="">
        <p class="text-sm">{post.owner.username}</p>
    </div>
    <img class="" src="{baseUrl}/{post.url}" alt={post.owner.username}/>
</figure>

<style>
    .profile-pic {
        clip-path: circle();
    }

    figure {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
</style>