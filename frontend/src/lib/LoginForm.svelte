<script>
    import {userLogin} from '$lib/api.js'
    import {goto} from '$app/navigation';

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


    const handleLogin = async (e) => {
        const formData = new FormData(e.target)
        const {username, password} = Object.fromEntries(formData.entries())

        if (username && password) {
            try {
                if (password.length < 8) {
                    handleNotification('Password must be at least 8 characters long')
                } else {
                    const response = await userLogin({username, password})
                    window.localStorage.setItem('token', response.token)
                    window.localStorage.setItem('username', response.username)
                    window.localStorage.setItem('user_id', response.user_id)
                    await goto('/')
                }
            } catch (e) {
                handleNotification(e.response.data.message)
            }
        } else {
            handleNotification('Please fill in all fields')
        }
    }
</script>

<PopNotification message={notification} isError={isError}/>
<form class="flex flex-col p-4 w-80 m-auto" on:submit|preventDefault={handleLogin}>
    <figure>
        <img src="./instagram.png" class="w-36 m-auto my-5" alt="Instagram logo">
    </figure>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="text" name="username"
           placeholder="Username"/>
    <input class="text-sm focus:outline-none rounded-md bg-slate-100 p-2 mb-2" type="password"
           name="password" placeholder="Password"/>
    <button class="p-2 mb-8 text-sm bg-blue-500 rounded-md text-white font-semibold" type="submit">Log In</button>
    <hr>
    <span class="text-xs font-semibold text-slate-400 m-auto">OR</span>
    <p class="text-slate-500 text-sm text-center m-2">Don't have an account? <a
            class="text-sm text-blue-500 font-semibold" href="/signup">Sign Up.</a></p>
</form>