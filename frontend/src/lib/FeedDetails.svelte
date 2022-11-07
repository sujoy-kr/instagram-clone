<script>
    export let post = {}
    export let full = false
    import {baseUrl} from '$lib/config.js'
    import {goto} from '$app/navigation'
    import {toggleLike, updatePost} from '$lib/api.js'
    import {onMount} from 'svelte'

    let currentUserId = null;

    onMount(
        async () => {
            currentUserId = window.localStorage.getItem('user_id')
        }
    )

    const handleLike = async () => {
        const {post_id} = post
        const newPost = await toggleLike(post_id)
        post.likes = newPost.likes
    }

    let comment = null
    const handleComment = async () => {
        if (comment) {
            const {post_id} = post
            const newPost = await updatePost(post_id, {comment})
            post.comments = newPost.comments
            comment = null
        }
    }
</script>

<figure class="bg-white rounded-sm overflow-hidden mb-8">
    <div class="flex p-3 items-center gap-3">
        <img class="profile-pic" src={post.owner.image? `${baseUrl}/${post.owner.image}`:"/shrek.jpg"}
             alt="{post.owner.username}">
        <a href="/{post.owner.username}" class="text-sm">{post.owner.username}</a>
    </div>
    <!-- post picture-->
    <img class="cursor-pointer" on:click={() => goto(`/post/${post.post_id}`)}
         src="{baseUrl}/{post.url}"
         alt={post.owner.username}/>
    <div class="flex p-3 gap-4">
        <button on:click={handleLike}>
            {#if post.likes.includes(+currentUserId)}
                <svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img"
                     viewBox="0 0 48 48" width="24">
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
            {:else}
                <svg aria-label="Like" class="_ab6-" color="#262626" fill="#262626" height="24" role="img"
                     viewBox="0 0 24 24"
                     width="24">
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                </svg>
            {/if}

        </button>
        <svg on:click={() => goto(`/post/${post.post_id}`)}
             aria-label="Comment" class="_ab6- cursor-pointer" color="#262626" fill="#262626"
             height="24"
             role="img"
             viewBox="0 0 24 24" width="24">
            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"
                  stroke-linejoin="round" stroke-width="2"></path>
        </svg>
    </div>

    {#if post.likes.length > 0}
        <p class="pb-2 text-sm pt-0 px-3">{post.likes.length} likes</p>
    {/if}

    {#if post.title}
        <figcaption class="pb-2 px-3 pt-0">
            <p class="text-sm"><a class="font-semibold tracking-wide" href="/{post.owner.username}">
                {post.owner.username}
            </a>
                {post.title}
            </p>
        </figcaption>
    {/if}

    {#if post.comments.length > 0}
        <p class="pb-2 pt-0 px-3 text-sm text-slate-400 cursor-pointer"
           on:click={() => goto(`/post/${post.post_id}`)}>{full ? `${post.comments.length}
            comments` : `View all ${post.comments.length}
            comments`}</p>
    {/if}
    <hr>
    <form on:submit|preventDefault={handleComment} class="flex justify-between">
        <input class="w-full focus:outline-none text-sm px-3 py-2" type="text" placeholder="Add a comment..."
               required
               bind:value={comment}
               name="comment">
        <button class:postBtnActive={comment}
                class="text-sm text-blue-200 ease-in-out transition font-semibold tracking-wider px-3 py-2">Post
        </button>
    </form>
    {#if post.comments.length > 0 && full}
        <hr class="mb-2">
        <ul>
            {#each post.comments as comment}
                <li class="p-2 px-4">
                    <p class="text-sm">
                        <a class="font-semibold tracking-wide" href="/{comment.username}">
                            {comment.username}
                        </a>
                        {comment.comment}
                    </p>
                </li>
            {/each}
        </ul>
    {/if}
</figure>

<style>
    .profile-pic {
        clip-path: circle();
        object-fit: cover;
        height: 40px;
        width: 40px;
    }

    .postBtnActive {
        color: #63A6F7;
    }

    figure {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
</style>