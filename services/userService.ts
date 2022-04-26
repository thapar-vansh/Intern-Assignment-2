import { getPlayerById } from './adminService'
import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
  checkDuplicateFavFromDb,
} from '../database/favourites.db'
import { QueryResult } from 'pg'
import { getUserByUserIdFromDb } from '../database/users.db'
 
export const addFavPlayer = async (
  userId: number,
  id: number
): Promise<QueryResult> => addFavPlayerToDb(userId, id) as Promise<QueryResult>

export const getFavPlayer = async (
  userId: number
): Promise<string[] | null> => {
  const favPlayers: QueryResult = await getFavPlayersFromDb(userId) 
  return favPlayers.rowCount > 0 ? favPlayers.rows : null
}

export const deleteFavPlayer = async (
  id: number,
  userId: number
): Promise<QueryResult> =>
  deleteFavPlayerFromDb(id, userId) as Promise<QueryResult>

export const checkDuplicateFav = async (
  id: number,
  userId: number
): Promise<boolean | null> => {
  const player: string[] | null = await getPlayerById(id)
  const duplicatePlayer: QueryResult = await checkDuplicateFavFromDb(id, userId)
  if (duplicatePlayer.rowCount < 1) {
    return null
  } else if (player['id'] === duplicatePlayer.rows[0].player_id) {
    return true
  } else {
    throw new Error('Something went wrong')
  }
}

export const getUserByUserId = async (userId: number) :Promise<string[] | null>=> {
  const user = await getUserByUserIdFromDb(userId)
  return user.rowCount > 0 ? user.rows : null
}
