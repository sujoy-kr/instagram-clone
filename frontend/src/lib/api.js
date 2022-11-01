import axios from 'axios'
import {baseUrl} from '$lib/config.js'

// user API
export async function getAllUsers() {
    const response = await axios.get(`${baseUrl}/api/user`)
    return response.data
}

export async function postAnUser(user) {
    const response = await axios.post(`${baseUrl}/api/user`, user)
    return response.data
}

export async function userLogin(user) {
    const response = await axios.post(`${baseUrl}/api/user/login`, user)
    return response.data
}

export async function userByUsername(username) {
    const response = await axios.get(`${baseUrl}/api/user/${username}`)
    return response.data
}


// post API
export async function postAPost(post) {
    const response = await axios.post(`${baseUrl}/api/post`, post,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    return response.data
}

export async function getFeed() {
    const response = await axios.get(`${baseUrl}/api/post/feed`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    return response.data
}