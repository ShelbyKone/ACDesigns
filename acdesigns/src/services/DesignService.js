import { fb } from './firebase'
import * as auth from './UserService'
import axios from 'axios'

export function getDesigns() {

}

export function getDesign(id) {

}

export function createDesign(design) {
    const token = await auth.generateToken()
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: { Authorization: token }
    }).post(`/design`, design)
}

export function updateDesign(design) {

}

export function deleteDesign(design) {
    
}