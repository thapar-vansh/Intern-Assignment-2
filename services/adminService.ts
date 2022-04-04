import { QueryResult } from 'pg'
import {
  addPlayerToDb,
  updatePlayerToDb,
  deletePlayerFromDb,
  getPlayerByNameFromDb,
  getPlayerByIdFromDb,
} from '../database/players.db.js'

export const addPlayer = async (
  name: string,
  country: string
): Promise<void> => {
  await addPlayerToDb(name, country)
}

export const updatePlayer = async (
  id: number,
  name: string,
  country: string
): Promise<void> => {
  await updatePlayerToDb(id, name, country)
}

export const deletePlayer = async (id: number): Promise<void> => {
  await deletePlayerFromDb(id)
}

export const getPlayerByName = async (
  name: string
): Promise<string[]> | null => {
  const playerByName: QueryResult = await getPlayerByNameFromDb(name)
  return playerByName.rowCount > 0 ? playerByName.rows : null
}

export const getPlayerById = async (id: number): Promise<string[]> | null => {
  const playerById: QueryResult = await getPlayerByIdFromDb(id)
  return playerById.rowCount > 0 ? playerById.rows[0] : null
}
