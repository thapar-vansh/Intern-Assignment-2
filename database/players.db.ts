import { QueryResult } from 'pg'
import { query } from '../util/server'

export const addPlayerToDb = async (
  name: string,
  country: string
): Promise<void> => {
  await query(
    `INSERT INTO players
    (name,country)
        VALUES ($1,$2)`,
    [name, country]
  )
}

export const updatePlayerToDb = async (
  id: number,
  name: string,
  country: string
): Promise<void> => {
  await query(
    `UPDATE players
        SET name = $2, country = $3
        WHERE id = $1`,
    [id, name, country]
  )
}

export const deletePlayerFromDb = async (id: number): Promise<void> => {
  await query(
    `DELETE FROM players
        WHERE id = $1`,
    [id]
  )
}

export const getPlayerByNameFromDb = (name: string): Promise<QueryResult> =>
  query(
    `SELECT * FROM players
      WHERE name = $1`,
    [name]
  ) as Promise<QueryResult>

export const getPlayerByIdFromDb = (id: number): Promise<QueryResult> =>
  query(
    `SELECT * FROM players
        WHERE id = $1`,
    [id]
  ) as Promise<QueryResult>

export const getPlayersFromDb = (): Promise<QueryResult> =>
  query(`SELECT * FROM players`, []) as Promise<QueryResult>
// const players: string[] = []
// for (let i = 0; i < (await result).rowCount; i++) {
//   players.push((await result).rows[i])
// }
// return players
