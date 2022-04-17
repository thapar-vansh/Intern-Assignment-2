import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { QueryResult } from 'pg'
import { getPlayersFromDb } from '../database/players.db'
import { getUserbyUsername, addUserToDb } from '../database/users.db'

export const getAllPlayers = async (): Promise<string[]> => {
  const players: QueryResult = await getPlayersFromDb()
  return players.rows
}

export const registerUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  const hashedPassword: string = await bcrypt.hash(password, 10)
  const user: QueryResult = await getUserbyUsername(username)
  if (user.rowCount > 0) {
    return true
  }
  addUserToDb(username, hashedPassword)
}

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const loginResult: QueryResult = await getUserbyUsername(username)
  if (loginResult.rowCount > 0) {
    if (await bcrypt.compare(password, loginResult.rows[0].password)) {
      const userId: number = loginResult.rows[0].id
      const token: string = generateToken(userId)
      return token
    } else {
      throw new Error('Invalid credentials')
    }
  } else {
    throw new Error('User does not exists')
  }
}

export function generateToken(userId: number): string {
  const privateKey: string = process.env.JWT_PRIVATEKEY
  const token: string = jwt.sign(
    { userId: userId, iat: Math.round(new Date().getTime() / 1000) },
    privateKey,
    { expiresIn: '365d' }
  )
  return token
}
