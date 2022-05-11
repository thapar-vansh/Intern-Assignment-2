import express, { Router } from 'express'
import { register, login, getPlayers } from '../controllers/loginController'
import { verifyUser } from '../middleware/auth'

export const router: Router = express.Router()

router.post('/register', register)

router.get('/login', verifyUser, login)

router.get('/players', getPlayers)
