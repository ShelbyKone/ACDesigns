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

// Get multiple designs by querystring
export function getDesigns() {

}

// Create a design
export async function createDesign(design) {
    const token = await auth.generateToken()

    return new Promise((resolve, reject) => {
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).post(`/design`, design)
            .then(() => resolve())
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
            .then(() => resolve())
            .catch(error => reject(error.response.data))
    })
}

// Delete a design
export function deleteDesign() {

}