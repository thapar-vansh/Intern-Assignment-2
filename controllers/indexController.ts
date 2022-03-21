import { Request, Response } from 'express'
import {
  getAllPlayers,
  registerUser,
  loginUser,
} from '../services/indexService'

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const result = (await getAllPlayers()) as string[]
    return res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    if (strongRegex.test(password)) {
      const result: boolean = await registerUser(username, password)
      if (result === true) {
        return res.status(409).send('User already exists.Please login')
      }
      return res.status(200).send('Registered successfully')
    } else {
      throw new Error('Invalid password')
    }
  } catch (e) {
    if (e.message === 'Invalid password') {
      return res
        .status(400)
        .send(
          'Password must contain at least 1 lowercase & uppercase alphabetical character, 1 numeric character,one special character and must be eight characters or longer'
        )
    }
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(422).send('Input required')
  }
  try {
    const result: string = await loginUser(username, password)
    res.status(200).send(result)
  } catch (e) {
    if (e.message === 'Invalid credentials') {
      return res.status(400).send('Invalid credentials')
    } else if (e.message === 'User does not exists') {
      return res.status(400).send('User does not exists')
    }
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
