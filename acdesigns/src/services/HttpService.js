import store from'../store'
import axios from 'axios'
//import {auth} from './firebase'

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
    })
}