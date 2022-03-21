import express from 'express'
import { register, login, getPlayers } from '../controllers/indexController'
import { verifyUser } from '../middleware/auth'

export const router = express.Router()

router.post('/register', register)

router.get('/login', verifyUser, login)

router.get('/players', getPlayers)
