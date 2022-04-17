import {
  getPlayerByIdFromDb,
  getPlayerByNameFromDb,
  updatePlayerToDb,
  getPlayersFromDb,
  addPlayerToDb,
  deletePlayerFromDb,
} from '../../database/players.db'
import * as player from '../../database/players.db'
import * as data from '../data/data.json'


describe('tests for players table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('adds player to database', async () => {
    const mockAddPlayerToDb = jest
      .spyOn(player, 'addPlayerToDb')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await addPlayerToDb('vansh', 'india')
    expect(mockAddPlayerToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })
  it('updates player to database', async () => {
    const mockUpdatePlayerToDb = jest
      .spyOn(player, 'updatePlayerToDb')
      .mockImplementation(() => Promise.resolve(data.updateSuccess))
    const result = await updatePlayerToDb(1, 'vansh', 'india')
    expect(mockUpdatePlayerToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.updateSuccess)
  })

  it('deletes player from database', async () => {
    const mockDeletePlayerToDb = jest
      .spyOn(player, 'deletePlayerFromDb')
      .mockImplementation(() => Promise.resolve(data.deleteSuccess))
    const result = await deletePlayerFromDb(1)
    expect(mockDeletePlayerToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })

  it('gets player by name', async () => {
    const mockGetPlayerByNameFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getPlayerByNameFromDb('msd')))
    const result = await mockGetPlayerByNameFromDb('msd')
    const expectedPlayer = [{ id: '9', name: 'msd', country: 'india' }]
    expect(mockGetPlayerByNameFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayer)
  })

  it('gets player by id', async () => {
    const mockGetPlayerByIdFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getPlayerByIdFromDb(1)))
    const result = await mockGetPlayerByIdFromDb(1)
    const expectedPlayer = [{ id: '1', name: 'virat', country: 'india' }]
    expect(mockGetPlayerByIdFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayer)
  })
  it('gets player from db', async () => {
    const mockGetPlayersFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getPlayersFromDb()))
    const result = await mockGetPlayersFromDb()
    const expectedPlayer = [
      {
        id: '1',
        name: 'virat',
        country: 'india',
      },
      {
        id: '2',
        name: 'rohit',
        country: 'india',
      },
      {
        id: '5',
        name: 'sachin',
        country: 'india',
      },
      {
        id: '7',
        name: 'tendulkar sachin',
        country: 'india',
      },
      {
        id: '8',
        name: 'vansh',
        country: 'india',
      },
      {
        id: '9',
        name: 'msd',
        country: 'india',
      },
    ]
    expect(mockGetPlayersFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayer)
  })
})
