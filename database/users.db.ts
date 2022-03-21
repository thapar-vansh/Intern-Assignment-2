import { query } from '../util/server'
import { QueryResult } from 'pg'

export const getUserbyUsername = async (
  username: string
): Promise<QueryResult | string[]> => {
  const user = (await query(
    `SELECT * FROM users
    WHERE username = $1`,
    [username]
  )) as Promise<QueryResult>
  return (await user).rows
}

export const addUserToDb = async (username: string, hashedPassword: string) => {
  await query(
    `INSERT INTO users
    (username, password) VALUES ($1,$2)`,
    [username, hashedPassword]
  )
}

export const getUserByUserId = async (
  userId: number
): Promise<QueryResult | string[]> => {
  const userDetails = (await query(
    `SELECT * FROM users
      WHERE id = $1`,
    [userId]
  )) as Promise<QueryResult>
  if ((await userDetails).rows[0]) {
    return (await userDetails).rows[0]
  }
  return null
}
