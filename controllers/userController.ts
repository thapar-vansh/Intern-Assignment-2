import { getPlayerById } from '../services/adminService.js'
import { Request, Response } from 'express'

import {
  addFavPlayer,
  getFavPlayer,
  deleteFavPlayer,
  checkDuplicateFav,
} from '../services/userService'

export const addFavPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.userToken['userId']
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  } else if (typeof id === 'string') {
    return res.status(400).send('Enter valid id')
  }
  try {
    const player: string[] | null = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('Player not found')
    }
    const duplicatePlayer: boolean = await checkDuplicateFav(id, userId)
    if (duplicatePlayer === true) {
      return res.status(409).send('Player already in favourites !!')
    }
    await addFavPlayer(userId, id)
    return res.status(200).send('Added as favourite')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const getFavPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.userToken['userId']
  try {
    const favPlayer: string[] | null = await getFavPlayer(userId)
    if (favPlayer === null) {
      return res.status(404).send('No favourites found')
    }
    return res.status(200).send(favPlayer)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deleteFavPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.userToken['userId']
  const { id } = req.body

  if (!id) {
    return res.status(422).send('Input required')
  } else if (typeof id === 'string') {
    return res.status(400).send('Enter valid id')
  }
  try {
    const favPlayer: boolean = await checkDuplicateFav(id, userId)
    if (favPlayer === false) {
      return res.status(404).send('No favourites found')
    }
    await deleteFavPlayer(id, userId)
    return res.status(200).send('Favourite player deleted successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
