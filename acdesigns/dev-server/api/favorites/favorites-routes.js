import express from 'express'
import * as controller from './favorites-controller'
import * as auth from '../../services/auth-service'

const router = express.Router()

//return all designs from a users favorites
router.get('/user/:id/favorites', controller.getFavorites)

//add a design to a users favorites
router.post('/user/:id/favorites/:designId', auth.requireLogin, controller.addFavorite)

//delete a design
router.delete('/user/:id/favorites/:designId', auth.requireLogin, controller.deleteFavorite)

export default router