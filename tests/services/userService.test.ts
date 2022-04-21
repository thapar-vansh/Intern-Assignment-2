import {
  addFavPlayer,
  getFavPlayer,
  deleteFavPlayer,
  checkDuplicateFav,
} from '../../services/UserService'
import * as user from '../../services/UserService'
import * as data from '../data/data.json'

describe('Tests for admin service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add favourite player to database', async () => {
    const mockAddFavPlayer = jest
      .spyOn(user, 'addFavPlayer')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await addFavPlayer(1, 1)
    expect(mockAddFavPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })

  it('service to get favourite player from db', async () => {
    const mockGetFavPlayer = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getFavPlayersSuccess))
    const result = await getFavPlayer(20)
    const expectedPlayers = await mockGetFavPlayer(20)
    expect(mockGetFavPlayer).toBeCalledTimes(1)
    expect(result).toEqual(expectedPlayers)
  })

  it('get favourite player  returns to null if no fav found', async () => {
    const mockGetFavPlayer = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null))
    const result = await getFavPlayer(2)
    const expectedPlayers = await mockGetFavPlayer(2)
    expect(mockGetFavPlayer).toBeCalledTimes(1)
    expect(result).toEqual(expectedPlayers)
  })
  it('service to delete favourite player from database', async () => {
    const mockDeleteFavPlayer = jest
      .spyOn(user, 'deleteFavPlayer')
      .mockImplementation(() => Promise.resolve(data.deleteSuccess))
    const result = await deleteFavPlayer(20, 1)
    expect(mockDeleteFavPlayer).toBeCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })
  it('service to check duplicate favourite player from database', async () => {
    const mockCheckDuplicateFav = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true))
    const result = await checkDuplicateFav(1, 20)
    const expectedResult = await mockCheckDuplicateFav(1,20)
    expect(result).toEqual(expectedResult)
    expect(mockCheckDuplicateFav).toBeCalledTimes(1)
  })
  it('service to check duplicate favourite player returns null if duplicate does not exist', async () => {
    const mockCheckDuplicateFav = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null))
    const result = await checkDuplicateFav(20,1)
    const expectedResult = await mockCheckDuplicateFav(20,1)
    expect(result).toEqual(expectedResult)
    expect(mockCheckDuplicateFav).toBeCalledTimes(1)
  })
})
