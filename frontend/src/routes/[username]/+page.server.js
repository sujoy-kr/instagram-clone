import {userByUsername} from '$lib/api.js'

export async function load({params}) {
    const {username} = params
    const user = await userByUsername(username)

    return {
        props: {
            user
        }
    }
}