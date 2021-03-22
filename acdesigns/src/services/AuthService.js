import { auth } from './firebase'
import store from '../store/index'
import axios from 'axios'

// Generate the token to be passed and verified by the server
function generateToken() {
    return new Promise((resolve, reject) => {
        auth.currentUser.getIdToken()
            .then((token) => {
                resolve(token)
            }).catch((error) => {
                reject(error)
            });
    })
}

// Check with firebase to see if the user is logged in
export function isLoggedIn() {
    const user = auth.currentUser
    return (user ? true : false)
}

// Login a user using firebase
export function login(user) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                store.dispatch('authenticate')
                resolve()
            })
            .catch((error) => reject(error));
    });
}

// Logout a user using firebase
export function logout() {
    auth.signOut().then(() => {
        store.dispatch('authenticate')
    }).catch((error) => {
        console.log(error)
    })
}

// Register a user using firebase, then create their
// user profile in the database
export function register(user) {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                user._id = userCredential.user.uid
                axios.create({
                    baseURL: store.state.apiUrl,
                }).post('/user', user)
                    .then(() => resolve())
                    .catch((error) => {
                        userCredential.user.delete()
                        logout()
                        reject(error.response.statusText)
                    })
            })
            .catch((error) => reject(error.message));
    });
}

// Get a single user by their id
export function getUser(id) {
    return axios.create({
        baseURL: store.state.apiUrl,
    }).get(`/user/${id}`)
}

// Update user profile
// TEMP
export async function updateUser(formData) {
    try {
        const token = await generateToken()
        return axios.create({
            baseURL: store.state.apiUrl,
            headers: { Authorization: token }
        }).put(`/user`, formData)
    }
    catch (error) {
        return error.response.statusText
    }
}

// Get the users username from firebase
export function getUsername() {
    const user = auth.currentUser
    return user.displayName
}

// Get the users email from firebase
export function getEmail() {
    const user = auth.currentUser
    return user.email
}

// Get the users id from firebase
export function getUserId() {
    const user = auth.currentUser
    return user.uid
}

// Send a reset password email to the user
// using firebase
export async function resetPassword(email) {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
}