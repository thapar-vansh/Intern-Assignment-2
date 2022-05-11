import {
  addFavPlayerToDb,
  getFavPlayersFromDb,
  deleteFavPlayerFromDb,
  checkDuplicateFavFromDb,
} from '../../database/favourites.db'
import * as data from '../data/data.json'
import * as server from '../../util/server'

describe('tests for favourites table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('adds favourite player to database', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.insertSuccess)
    const result = addFavPlayerToDb(20, 1)
    expect(await result).toBe(data.insertSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('gets favourite player from db', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getFavPlayerSuccessFromDb)
    const result = getFavPlayersFromDb(20)
    expect(await result).toBe(data.getFavPlayerSuccessFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
  it('deletes fav player from users list', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.deleteSuccess)
    const result = deleteFavPlayerFromDb(20, 1)
    expect(await result).toBe(data.deleteSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
  it('checks for duplicate favourite player from db', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.checkDuplicateFavSuccessFromDb)
    const result = checkDuplicateFavFromDb(20,1)
    expect(await result).toBe(data.checkDuplicateFavSuccessFromDb)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
})
