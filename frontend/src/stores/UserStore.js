import {writable} from "svelte/store";

const UserStore = writable({
    token: ''
})

export default UserStore