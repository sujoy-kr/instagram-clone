import axios from 'axios'
import {baseUrl} from '$lib/config.js'

// user API
export async function getLastTenUsers() {
    const response = await axios.get(`${baseUrl}/api/user/lastten`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
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

export async function updateAnUser(data) {
    const response = await axios.put(`${baseUrl}/api/user/${localStorage.getItem('username')}`, data,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    return response.data
}


export async function getSearchedUser(keyword) {
    const response = await axios.get(`${baseUrl}/api/user/search/${keyword}`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    return response.data
}

export async function toggleFollow(username) {
    const response = await axios.get(`${baseUrl}/api/user/${username}/follow`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    return response.data
}

export async function getFollowings(username) {
    const response = await axios.get(`${baseUrl}/api/user/${username}/followings`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    return response.data
}

export async function getFollowers(username) {
    const response = await axios.get(`${baseUrl}/api/user/${username}/followers`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
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

export async function toggleLike(id) {
    const response = await axios.get(`${baseUrl}/api/post/${id}/like`,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    return response.data
}