import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import {
  addPlayer,
  getPlayerByName,
  updatePlayer,
  getPlayerById,
  deletePlayer,
} from '../services/adminService'

export const addPlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, country } = req.body
  if (!name && !country) {
    return res.status(422).send('Input required')
  }
  try {
    const player: string[] | null = await getPlayerByName(name)
    if (player === null) {
      await addPlayer(name, country)
      return res.status(200).send('Player added')
    }
    return res.status(409).send('Player already exists')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const updatePlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name, country } = req.body
  if (!id && (!name || !country)) {
    return res.status(422).send('Input required')
  } else if (typeof id === 'string') {
    return res.status(400).send('Enter valid id')
  }
  try {
    const player: QueryResult | Promise<null> = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('Player not found')
    }
    await updatePlayer(id, name, country)
    return res.status(200).send('Updated player successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}

export const deletePlayers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.body
  if (!id) {
    return res.status(422).send('Input required')
  }
  try {
    const player: QueryResult | Promise<null> = await getPlayerById(id)
    if (player === null) {
      return res.status(404).send('No player found to delete')
    }
    await deletePlayer(id)
    return res.status(200).send('Player deleted successfully')
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
}
