import express, { Router } from 'express'

import {
  addFavPlayers,
  getFavPlayers,
  deleteFavPlayers,
} from '../controllers/userController'
import { verifyUser } from '../middleware/auth.js'

export const router: Router = express.Router()

router.post('/add/fav/players', verifyUser, addFavPlayers)

router.get('/get/fav/players', verifyUser, getFavPlayers)

router.delete('/delete/fav/players', verifyUser, deleteFavPlayers)
