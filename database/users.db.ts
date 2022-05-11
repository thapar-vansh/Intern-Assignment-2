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
): Promise<QueryResult> =>
  query(
    `INSERT INTO users
    (username, password) VALUES ($1,$2)`,
    [username, hashedPassword]
  ) as Promise<QueryResult>

export const getUserByUserIdFromDb = (userId: number): Promise<QueryResult> =>
  query(
    `SELECT * FROM users
      WHERE id = $1`,
    [userId]
  ) as Promise<QueryResult>
