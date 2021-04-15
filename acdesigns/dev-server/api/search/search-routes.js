import express from 'express'
import * as controller from './search-controller'

const router = express.Router()

//return designs based on search criteria (query string)
router.get('/search', controller.searchDesigns)

export default router