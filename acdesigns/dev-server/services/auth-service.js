import firebase from '../config/firebase'
import regeneratorRuntime from "regenerator-runtime";

//make sure the user is logged in to make certain requests
export const requireLogin =  async function(req, res, next) {
    const token = await verifyToken(req)
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in' })
    }
    next()
}

export const getUserId = async function(req) {
    const token = await verifyToken(req)
    if (!token) {
        return null
    } else {
        return token.uid
    }
}

function verifyToken(req) {
    const token = req.headers.authorization || req.headers['authorization']
    if (!token) {
        return null
    }
    firebase.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            return decodedToken
        })
        .catch(() => {
            return null
        })
}