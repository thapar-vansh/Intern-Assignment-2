import bcrypt from 'bcrypt'
import { QueryResult } from 'pg'
import jwt from 'jsonwebtoken'
import { getPlayersFromDb } from '../database/players.db'
import {
  getUserbyUsername,
  addUserToDb,
} from '../database/users.db'

export const getAllPlayers = async () => {
  const players = await getPlayersFromDb() 
  console.log(players)
  return players
}

export const registerUser = async (username: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10)
  const user: QueryResult | string[] = await getUserbyUsername(username)
  console.log(user)
  if (user[0]) {
    return true
  }
  await addUserToDb(username, hashedPassword)
}

export const loginUser = async (username: string, password: string) => {
  const loginResult = await getUserbyUsername(username)
  if (loginResult[0]) {
    if (await bcrypt.compare(password, loginResult[0].password)) {
      const userId: number = loginResult[0].id
      const token: string = generateToken(userId)
      return token
    } else {
      throw new Error('Invalid credentials')
    }
  } else {
    throw new Error('User does not exists')
  }
}

function generateToken(userId: number): string {
  const privateKey: string = process.env.JWT_PRIVATEKEY
  const token: string = jwt.sign(
    { userId: userId, iat: Math.round(new Date().getTime() / 1000) },
    privateKey,
    { expiresIn: '365d' }
  )
  return token
}
