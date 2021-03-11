import express from 'express'
const router = express.Router()
import * as controller from './user-controller'

//return a user by id
//router.get('/user', controller.getUser)

//update a user
//router.put('/user', controller.updateUser)

//create a user
router.post('/user', controller.createUser)

export default router