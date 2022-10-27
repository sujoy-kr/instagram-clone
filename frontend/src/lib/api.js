import axios from 'axios'

const baseUrl = "http://localhost:3000/api"

export async function getAllUsers() {
    const response = await axios.get(`${baseUrl}/user`)
    return response.data
}

export async function postAnUser(user) {
    const response = await axios.post(`${baseUrl}/user`, user)
    return response.data
}

export async function userLogin(user) {
    const response = await axios.post(`${baseUrl}/user/login`, user)
    return response.data
}