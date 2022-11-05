<script>
    export let post = {}
    import {baseUrl} from '$lib/config.js'
</script>

<figure class="bg-white rounded-sm overflow-hidden mb-8">
    <div class="flex p-3 items-center gap-4">
        <img class="profile-pic" src={post.owner.image? `${baseUrl}/${post.owner.image}`:"/shrek.jpg"}
             alt="{post.owner.username}">
        <a href="/{post.owner.username}" class="text-sm">{post.owner.username}</a>
    </div>
    <img class="" src="{baseUrl}/{post.url}" alt={post.owner.username}/>
    {#if post.title}
        <figcaption class="p-2">
            <p class="text-sm"><a class="font-semibold tracking-wide" href="/{post.owner.username}">
                {post.owner.username}
            </a>
                {post.title}
            </p>
        </figcaption>
    {/if}
</figure>

<style>
    .profile-pic {
        clip-path: circle();
        object-fit: cover;
        height: 40px;
        width: 40px;
    }

    figure {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
</style>