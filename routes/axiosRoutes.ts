import express, { Router } from 'express'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../controllers/axiosController'

export const router: Router = express.Router()

router.get('/posts/:id', getRequest)
router.post('/posts/:id', postRequest)
router.put('/posts/:id', putRequest)
router.delete('/posts/:id', deleteRequest)
