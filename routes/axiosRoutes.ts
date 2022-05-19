import express, { Router } from 'express'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../controllers/axiosController'

export const router: Router = express.Router()

router.get('/posts', getRequest)
router.post('/posts', postRequest)
router.put('/posts', putRequest)
router.delete('/posts', deleteRequest)
