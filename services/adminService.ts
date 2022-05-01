import { QueryResult } from 'pg'
import {
  addPlayerToDb,
  updatePlayerToDb,
  deletePlayerFromDb,
  getPlayerByNameFromDb,
  getPlayerByIdFromDb,
} from '../database/players.db'

export const addPlayer = (
  name: string,
  country: string
): Promise<QueryResult> => addPlayerToDb(name, country) as Promise<QueryResult>

export const updatePlayer = async (
  id: number,
  name: string,
  country: string
): Promise<QueryResult> =>
  (await updatePlayerToDb(id, name, country)) as QueryResult

export const deletePlayer = async (id: number): Promise<QueryResult> =>
  (await deletePlayerFromDb(id)) as QueryResult

export const getPlayerByName = async (
  name: string
): Promise<string[]> | null => {
  const playerByName: QueryResult = await getPlayerByNameFromDb(name)
  return playerByName.rowCount > 0 ? playerByName.rows[0] : null
}

export const getPlayerById = async (id: number): Promise<QueryResult> | null => {
  const playerById: QueryResult = await getPlayerByIdFromDb(id) 
  return playerById.rowCount > 0 ? playerById.rows[0] : null
}
