import { QueryResult } from 'pg'
import { query } from '../util/server'

// export const addPlayerToDb = async (name:string, country:string) => {
//   await query(
//     `INSERT INTO players
//     (name,country)
//         VALUES ($1,$2)`,
//     [name, country]
//   )
// }

// export const updatePlayerToDb = async (id:number, name:string, country:string) => {
//   await query(
//     `UPDATE players
//         SET name = $2, country = $3
//         WHERE id = $1`,
//     [id, name, country]
//   )
// }

// export const deletePlayerFromDb = async (id:number) => {
//   await query(
//     `DELETE FROM players
//         WHERE id = $1`,
//     [id]
//   )
// }

// export const getPlayerByNameFromDb = async (name:string) => {
//   const result = await query(
//     `SELECT * FROM players
//         WHERE name = $1`,
//     [name]
//   )
//   return result.rowCount > 0 ? result.rows[0] : null
// }

// export const getPlayerByIdFromDb = async (id:number) => {
//   const result = await query(
//     `SELECT * FROM players
//         WHERE id = $1`,
//     [id]
//   )
//   return result.rowCount > 0 ? result.rows[0] : null
// }

export const getPlayersFromDb = async (): Promise<QueryResult | string[]> => {
  const result = (await query(
    `SELECT * FROM players`,
    []
  )) as Promise<QueryResult>
  const players: string[] = []
  for (let i = 0; i < (await result).rowCount; i++) {
    players.push((await result).rows[i])
  }
  return players
}
