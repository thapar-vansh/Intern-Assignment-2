import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getUserByUserId } from '../database/users.db'
const config = process.env

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers['admintoken'] as string
  if (!token) {
    return res.status(403).send('Token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.JWT_PRIVATEKEY)
    req.userToken = decoded as (string | number)[]
    const user = await getUserByUserId(req.userToken['userId'])
    if (user === null) {
      return res.status(403).send('User not in database. Please register')
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send('Invalid token')
  }
  next()
}
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers
  try {
    if (
      headers.username === config.USERNAME &&
      headers.password === config.PASSWORD
    ) {
      next()
    } else {
      return res.status(400).send('You are not authenticated')
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send('Invalid credentials')
  }
}
