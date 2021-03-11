import { auth } from './firebase'
import store from '../store/index'
import { http } from './HttpService'

// Generate the token to be passed and verified by the server
export function generateToken() {

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
                http().post('/user', user)
                resolve()
            })
            .catch((error) => reject(error));
    });
}

// Get the users username from firebase
export function getUsername() {
    const user = auth.currentUser
    return user.displayName
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