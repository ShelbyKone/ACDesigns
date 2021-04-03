import * as auth from './UserService'
import store from '../store/index'
import axios from 'axios'

export async function addFavorite(designId) {
    const userId = auth.getUserId()
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).post(`/user/${userId}/favorites/${designId}`)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

export async function deleteFavorite(designId) {
    const userId = auth.getUserId()
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).delete(`/user/${userId}/favorites/${designId}`)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}