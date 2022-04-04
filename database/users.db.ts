import { query } from '../util/server'
import { QueryResult } from 'pg'

export const getUserbyUsername = (username: string): Promise<QueryResult> =>
  query(
    `SELECT * FROM users
    WHERE username = $1`,
    [username]
  ) as Promise<QueryResult>

export const addUserToDb = async (
  username: string,
  hashedPassword: string
): Promise<void> => {
  query(
    `INSERT INTO users
    (username, password) VALUES ($1,$2)`,
    [username, hashedPassword]
  )
}

export const getUserByUserId = async (userId: number): Promise<QueryResult> => {
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
