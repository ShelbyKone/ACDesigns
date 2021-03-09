import store from'../store'
import axios from 'axios'
import {auth} from './firebase'

export async function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: {
            Authorization: await auth.currentUser.getIdToken()
        }
    })
}