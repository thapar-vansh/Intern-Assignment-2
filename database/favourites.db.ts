import { query } from '../util/server.js'
import { QueryResult } from 'pg'

export const addFavPlayerToDb = async (
  userId: number,
  id: number
): Promise<void> => {
  await query(
    `INSERT INTO favourites 
        (user_id, player_id)
        VALUES ($1,$2)`,
    [userId, id]
  )
}

export const getFavPlayersFromDb = (userId: number): Promise<QueryResult> =>
  query(
    `SELECT name,country
          FROM favourites fv JOIN players pl
          ON pl.id = fv.player_id 
          WHERE user_id = $1`,
    [userId]
  ) as Promise<QueryResult>

export const deleteFavPlayerFromDb = async (
  id: number,
  userId: number
): Promise<void> => {
  await query(
    `DELETE FROM favourites
        WHERE player_id  = $1 
        AND user_id = $2`,
    [id, userId]
  )
}

export const checkDuplicateFavFromDb = (
  id: number,
  userId: number
): Promise<QueryResult> =>
  query(
    `SELECT player_id
        FROM favourites
        WHERE player_id = $1 AND user_id = $2`,
    [id, userId]
  ) as Promise<QueryResult>
