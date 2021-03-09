import { auth } from './firebase'
import store from '../store/index'

export function generateToken() {

}

export function isLoggedIn() {
    const user = auth.currentUser
    return (user ? true : false)
}

export function login(user) {
    auth.signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            store.dispatch('authenticate')
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
        })
}

export function logout() {
    auth.signOut().then(() => {
        store.dispatch('authenticate')
    }).catch((error) => {
        console.log(error)
    })
}

export function register(user) {
    console.log(user)
}

export function getUsername() {
    const user = auth.currentUser
    return user.displayName
}

export function getUserId() {
    const user = auth.currentUser
    return user.uid
}

export function resetPassword(email) {
    auth.sendPasswordResetEmail(email).then(function () {
        console.log('email sent')
    }).catch(function (error) {
        console.log(error)
    });
}