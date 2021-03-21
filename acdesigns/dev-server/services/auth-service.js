import firebase from '../config/firebase'

//make sure the user is logged in to make certain requests
export function requireLogin(req, res, next) {
    verifyToken(req)
        .then(() => {
            next()
        })
        .catch(() => {
            return res.status(401).json({ message: 'You must be logged in' })
        })
}

export function getUserId(req) {
    return new Promise((resolve, reject) => {
        verifyToken(req)
            .then((token) => {
                resolve(token.uid)
            })
            .catch(() => {
                reject()
            })
    })
}

function verifyToken(req) {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization || req.headers['authorization']
        if (!token) {
            reject()
        }
        firebase.auth().verifyIdToken(token)
            .then((decodedToken) => {
                resolve(decodedToken)
            })
            .catch(() => {
                reject()
            })
    })
}