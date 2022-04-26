import {
  addPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  getPlayerByName,
} from '../../services/adminService'
import * as playerDb from '../../database/players.db'
import * as data from '../data/data.json'

describe('Tests for admin service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add player to database', async () => {
    const mockAddPlayer = jest
      .spyOn(playerDb, 'addPlayerToDb')
      .mockResolvedValue(Promise.resolve(data.insertSuccess))
    const result = await addPlayer('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })
  it('service to update player to database', async () => {
    const mockUpdatePlayer = jest
      .spyOn(playerDb, 'updatePlayerToDb')
      .mockReturnValue(Promise.resolve(data.updateSuccess))
    const result = await updatePlayer(1, 'vansh', 'india')
    expect(mockUpdatePlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.updateSuccess)
  })

  it('service to delete player from database', async () => {
    const mockDeletePlayer = jest
      .spyOn(playerDb, 'deletePlayerFromDb')
      .mockResolvedValue(Promise.resolve(data.deleteSuccess))
    const result = await deletePlayer(1)
    expect(mockDeletePlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })

  it('service to get player by name', async () => {
    const mockGetPlayerByNameFromDb = jest
      .spyOn(playerDb, 'getPlayerByNameFromDb')
      .mockResolvedValue(data.getPlayerByNameSuccessFromDb)
    const result = getPlayerByName('msd')
    expect(mockGetPlayerByNameFromDb).toBeCalledTimes(1)
    expect(await result).toBe(data.getPlayerByNameSuccessFromDb.rows[0])
  })

  it('get player by name returns null if player does not exists', async () => {
    const mockGetPlayerByNameFromDb = jest
      .spyOn(playerDb, 'getPlayerByNameFromDb')
      .mockResolvedValue(data.getPlayerByNameFailFromDb)
    const result = getPlayerByName('msd')
    expect(mockGetPlayerByNameFromDb).toBeCalledTimes(1)
    expect(await result).toBe(null)
  })

  it('service to get player by id', async () => {
    const mockGetPlayerById = jest
      .spyOn(playerDb, 'getPlayerByIdFromDb')
      .mockResolvedValue(Promise.resolve(data.getPlayerByIdSuccessFromDb))
    const result = await getPlayerById(1)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    expect(result).toEqual(data.getPlayerByIdSuccessFromDb.rows[0])
  })
  it('get player by id returns null when id does not exists', async () => {
    const mockGetPlayerByIdFromDb = jest
      .spyOn(playerDb, 'getPlayerByIdFromDb')
      .mockResolvedValue(data.getPlayerByIdFailFromDb)
    const result = getPlayerById(1)
    expect(mockGetPlayerByIdFromDb).toBeCalledTimes(1)
    expect(await result).toBe(null)
  })
})
