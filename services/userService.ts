import { getPlayerById } from './adminService.js'
import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
  checkDuplicateFavFromDb,
} from '../database/favourites.db.js'
import { QueryResult } from 'pg'

export const addFavPlayer = async (
  userId: number,
  id: number
): Promise<void> => {
  await addFavPlayerToDb(userId, id)
}

export const getFavPlayer = async (
  userId: number
): Promise<string[] | null> => {
  const favPlayers: QueryResult = await getFavPlayersFromDb(userId)
  return favPlayers.rowCount > 0 ? favPlayers.rows : null
}

export const deleteFavPlayer = async (
  id: number,
  userId: number
): Promise<void> => {
  await deleteFavPlayerFromDb(id, userId)
}

export const checkDuplicateFav = async (
  id: number,
  userId: number
): Promise<boolean> => {
  const player: string[] | null = await getPlayerById(id)
  const duplicatePlayer: QueryResult = await checkDuplicateFavFromDb(id, userId)

  if (duplicatePlayer === null) {
    return false
  } else if (player['id'] === duplicatePlayer[0].player_id) {
    return true
  } else {
    throw new Error('Something went wrong')
  }
}
