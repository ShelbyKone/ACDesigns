import express from 'express'
import multer from 'multer'
import * as controller from './user-controller'
import * as auth from '../../services/auth-service'

const router = express.Router()
const upload= multer({ dest: 'uploads/' })

//return a user by id
router.get('/user/:id', controller.getUser)

//update a user
router.put('/user', upload.single('image'), auth.requireLogin, controller.updateUser)

//create a user
router.post('/user', controller.createUser)

export default router