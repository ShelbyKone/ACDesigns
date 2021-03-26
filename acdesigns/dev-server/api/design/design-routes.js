import express from 'express'
import multer from 'multer'
import * as controller from './design-controller'
import * as auth from '../../services/auth-service'

const router = express.Router()
const upload= multer({ dest: 'uploads/' })

//return a design by id
router.get('/design/:id', controller.getDesign)

//return all designs
router.get('/designs', controller.getDesigns)

//update a design
router.put('/design', auth.requireLogin, upload.single('image'), controller.updateDesign)

//create a design
router.post('/design', auth.requireLogin, upload.single('image'), controller.createDesign)

//delete a design
router.delete('/design/:id', auth.requireLogin, controller.deleteDesign)

export default router