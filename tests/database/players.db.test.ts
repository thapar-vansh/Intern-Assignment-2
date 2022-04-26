import {
  getPlayerByIdFromDb,
  getPlayerByNameFromDb,
  updatePlayerToDb,
  getPlayersFromDb,
  addPlayerToDb,
  deletePlayerFromDb,
} from '../../database/players.db'

import * as data from '../data/data.json'
import * as server from '../../util/server'
describe('tests for players table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('adds player to database', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.insertSuccess)
    const result = addPlayerToDb('rohan', 'india')
    expect(await result).toBe(data.insertSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
  it('updates player to database', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.updateSuccess)
    const result = updatePlayerToDb(1, 'rohan', 'india')
    expect(await result).toBe(data.updateSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('deletes player from database', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.deleteSuccess)
    const result = deletePlayerFromDb(2)
    expect(await result).toBe(data.deleteSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('gets player by name', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getPlayerByNameSuccessFromDb)
    const result = getPlayerByNameFromDb('msd')
    expect(await result).toBe(data.getPlayerByNameSuccessFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('gets player by name fails when player does not exists', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getFavPlayerByNameFailFromDb)
    const result = getPlayerByNameFromDb('kaju')
    expect(await result).toStrictEqual(data.getPlayerByNameFailFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
  it('gets player by id', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getPlayerByIdSuccessFromDb)
    const result = getPlayerByIdFromDb(1)
    expect(await result).toBe(data.getPlayerByIdSuccessFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('gets player by id', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getPlayerByIdFailFromDb)
    const result = getPlayerByIdFromDb(88)
    expect(await result).toBe(data.getPlayerByIdFailFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
  it('gets player from db', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getAllPlayersSuccessFromDb)
    const result = getPlayersFromDb()
    expect(await result).toBe(data.getAllPlayersSuccessFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
})
