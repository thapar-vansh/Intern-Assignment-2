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
      .mockImplementation(() => Promise.resolve(data.getFavFromDbSuccess))
    const result = await getFavPlayersFromDb(20)
    const expectedPlayers = await mockGetFavPlayersFromDb(20)
    expect(mockGetFavPlayersFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedPlayers)
  })
  it('deletes fav player from users list', async () => {
    const mockDeletePlayerToDb = jest
      .spyOn(favourite, 'deleteFavPlayerFromDb')
      .mockImplementation(() => Promise.resolve(data.deleteSuccess))
    const result = await deleteFavPlayerFromDb(20, 1)
    expect(mockDeletePlayerToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })
  it('checks for duplicate favourite player from db', async () => {
    const mockCheckDuplicateFavFromDb = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.checkDuplicateFavSuccess))
    const result = await checkDuplicateFavFromDb(1, 20)
    const expectedResult = await mockCheckDuplicateFavFromDb(1, 20)
    expect(mockCheckDuplicateFavFromDb).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedResult)
  })
})
