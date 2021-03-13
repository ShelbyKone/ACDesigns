import express from 'express'
import multer from 'multer'
import * as controller from './user-controller'

const router = express.Router()
const upload= multer({ dest: 'uploads/' })

//return a user by id
router.get('/user/:id', controller.getUser)

//update a user
router.put('/user', upload.single('image'), controller.updateUser)

//create a user
router.post('/user', controller.createUser)

export default router