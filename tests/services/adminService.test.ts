import {
  addPlayer,
  getPlayerById,
  getPlayerByName,
  updatePlayer,
  deletePlayer,
} from '../../services/adminService'
import * as admin from '../../services/adminService'
import * as data from '../data/data.json'

describe('Tests for admin service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add player to database', async () => {
    const mockAddPlayer = jest
      .spyOn(admin, 'addPlayer')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await addPlayer('vansh', 'india')
    expect(mockAddPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })
  it('service to update player to database', async () => {
    const mockUpdatePlayer = jest
      .spyOn(admin, 'updatePlayer')
      .mockImplementation(() => Promise.resolve(data.updateSuccess))
    const result = await updatePlayer(1, 'vansh', 'india')
    expect(mockUpdatePlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.updateSuccess)
  })

  it('service to delete player from database', async () => {
    const mockDeletePlayer = jest
      .spyOn(admin, 'deletePlayer')
      .mockImplementation(() => Promise.resolve(data.deleteSuccess))
    const result = await deletePlayer(1)
    expect(mockDeletePlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })

  it('service to get player by name', async () => {
    const mockGetPlayerByName = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getPlayerByNameSuccess))
      const result = await getPlayerByName('msd')
      const expectedPlayer = await mockGetPlayerByName('msd')
    expect(result).toEqual(expectedPlayer)
  })

  it('get player by name returns null if player does not exists', async () => {
    const mockGetPlayerByName = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null))
      const result = await getPlayerByName('here')
      const expectedPlayer = await mockGetPlayerByName('here')
    expect(mockGetPlayerByName).toBeCalledTimes(1)
    expect(result).toEqual(expectedPlayer)
  })

  it('service to get player by id', async () => {
    const mockGetPlayerById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getPlayerByIdSuccess))
    const result = await getPlayerById(1)
    const expectedPlayer = await mockGetPlayerById(1)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    expect(result).toEqual(expectedPlayer)
  })
  it('get player by id returns null when id does not exists', async () => {
    const mockGetPlayerById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null))
    const result = await getPlayerById(99)
    const expectedPlayer = await mockGetPlayerById(99)
    expect(mockGetPlayerById).toBeCalledTimes(1)
    expect(result).toEqual(expectedPlayer)
  })
})
