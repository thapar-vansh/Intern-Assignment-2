import express, { Router } from 'express'

import {
  addPlayers,
  updatePlayers,
  deletePlayers,
} from '../controllers/adminController'
import { verifyAdmin } from '../middleware/auth'

export const router: Router = express.Router()

router.post('/add/players', verifyAdmin, addPlayers)

router.put('/update/players', verifyAdmin, updatePlayers)

router.delete('/delete/players', verifyAdmin, deletePlayers)
