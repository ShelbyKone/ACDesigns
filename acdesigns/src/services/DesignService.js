import * as auth from './UserService'
import store from '../store/index'
import axios from 'axios'

// Get a single design by id
export function getDesign(id) {
    return new Promise((resolve, reject) => {
        axios.create({
            baseURL: store.state.apiUrl,
        }).get(`/design/${id}`)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

// Get all designs by a specific user
export function getUserDesigns(id) {
    return new Promise((resolve, reject) => {
        axios.create({
            baseURL: store.state.apiUrl,
        }).get(`/user/${id}/designs`)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

// Get multiple designs by querystring
export function getDesigns() {
    return new Promise((resolve, reject) => {
        axios.create({
            baseURL: store.state.apiUrl,
        }).get(`/designs`)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

// Create a design
export async function createDesign(design) {
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).post(`/design`, design)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

// Update a design
export async function updateDesign(design) {
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).put(`/design`, design)
            .then(res => resolve(res))
            .catch(error => reject(error.response.data))
    })
}

// Delete a design
export async function deleteDesign(id) {
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).delete(`/design/${id}`)
            .then(() => resolve())
            .catch(error => reject(error.response.data))
    })
}