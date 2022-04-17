import * as favourite from '../../database/favourites.db'
import * as data from '../data/data.json'

import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
    deleteFavPlayerFromDb,
    checkDuplicateFavFromDb,
} from '../../database/favourites.db'

describe('tests for favourites table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('adds favourite player to database', async () => {
    const mockAddFavPlayer = jest
      .spyOn(favourite, 'addFavPlayerToDb')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await addFavPlayerToDb(1, 1)
    expect(mockAddFavPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })

  it('gets favourite player from db', async () => {
    const mockGetFavPlayersFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getFavPlayersFromDb(20)))
    const result = await mockGetFavPlayersFromDb(20)
    const expectedPlayers = [
      {
        name: 'virat',
        country: 'india',
      },
    ]
    expect(mockGetFavPlayersFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayers)
  })
  it('deletes fav player from users list', async () => {
    const mockDeletePlayerToDb = jest
      .spyOn(favourite, 'deleteFavPlayerFromDb')
      .mockImplementation(() => Promise.resolve(data.deleteSuccess))
    const result = await deleteFavPlayerFromDb(20,1)
    expect(mockDeletePlayerToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })
  it('checks for duplicate favourite player from db', async () => {
    const mockCheckDuplicateFavFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(checkDuplicateFavFromDb(20,1)))
    const result = await mockCheckDuplicateFavFromDb(20)
    
    const expectedPlayers = []
    expect(mockCheckDuplicateFavFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayers)
  })
})
