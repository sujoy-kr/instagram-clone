<script>
    import {postAnUser} from '$lib/api.js'
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

    const userFactory = (username, name, email, password) => {
        return {
            username,
            name,
            email,
            password
        }
    }

    const handleSignIn = async (e) => {
        const formData = new FormData(e.target)
        const {email, name, username, password} = Object.fromEntries(formData.entries())
        if (!email || !name || !username || !password) {
            return handleNotification('Please fill all the fields')
        }
        if (password.length < 8) {
            return handleNotification('Password must be at least 8 characters long')
        }

        const user = userFactory(username, name, email, password)
        try {
            const response = await postAnUser(user)
            window.localStorage.setItem('token', response.token)
            window.localStorage.setItem('username', response.username)
            window.localStorage.setItem('user_id', response.user_id)
        } catch (e) {
            return handleNotification(e.response.data.message)
        }
        await goto('/')
    }
</script>

<PopNotification message={notification} isError={isError}/>
<form class="flex flex-col p-4 w-80 m-auto" on:submit|preventDefault={handleSignIn}>
    <figure>
        <img src="./instagram.png" class="w-36 m-auto my-5" alt="Instagram logo">
    </figure>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="email" name="email"
           placeholder="Email"/>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="text" name="name"
           placeholder="Full Name"/>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="text" name="username"
           placeholder="Username"/>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="password" name="password"
           placeholder="Password"/>
    <button class="p-2 mb-8 text-sm bg-blue-500 rounded-md text-white font-semibold" type="submit">Sign up</button>
    <hr>
    <span class="text-xs font-semibold text-slate-400 m-auto">OR</span>
    <p class="text-slate-500 text-sm text-center m-2">Have an account? <a class="text-sm text-blue-500 font-semibold"
                                                                          href="/login">Log In.</a></p>
</form>