import {
  addFavPlayer,
  getFavPlayer,
  deleteFavPlayer,
  checkDuplicateFav,
} from '../../services/UserService'
import * as user from '../../services/UserService'
import * as userDb from '../../database/users.db'
import * as favourite from '../../database/favourites.db'
import * as data from '../data/data.json'

describe('Tests for admin service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('service to add favourite player to database', async () => {
    const mockAddFavPlayer = jest
      .spyOn(favourite, 'addFavPlayerToDb')
      .mockResolvedValue(data.insertSuccess)
    const result = await addFavPlayer(1, 1)
    expect(mockAddFavPlayer).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })

  it('service to get favourite player', async () => {
    const mockGetFavPlayer = jest
      .spyOn(favourite, 'getFavPlayersFromDb')
      .mockResolvedValue(data.getFavPlayerByNameSuccessFromDb)
    const result = await getFavPlayer(20)
    expect(mockGetFavPlayer).toBeCalledTimes(1)
    expect(result).toEqual(data.getFavPlayerByNameSuccessFromDb.rows)
  })

  it('get player by name returns null if player does not exists', async () => {
    const mockGetFavPlayerByNameFromDb = jest
      .spyOn(favourite, 'getFavPlayersFromDb')
      .mockResolvedValue(data.getPlayerByNameFailFromDb)
    const result = getFavPlayer(20)
    expect(mockGetFavPlayerByNameFromDb).toBeCalledTimes(1)
    expect(await result).toBe(null)
  })
  it('service to delete favourite player from database', async () => {
    const mockDeleteFavPlayer = jest
      .spyOn(user, 'deleteFavPlayer')
      .mockResolvedValue(Promise.resolve(data.deleteSuccess))
    const result = await deleteFavPlayer(20, 1)
    expect(mockDeleteFavPlayer).toBeCalledTimes(1)
    expect(result).toEqual(data.deleteSuccess)
  })
  it('service to check duplicate favourite player returns true if player exists ', async () => {
    const mockCheckDuplicateFav = jest
      .spyOn(favourite, 'checkDuplicateFavFromDb')
      .mockResolvedValueOnce(
        Promise.resolve(data.checkDuplicateFavSuccessFromDb)
      )
    const result = checkDuplicateFav(1, 20)
    expect(await result).toBe(true)
    expect(mockCheckDuplicateFav).toBeCalledTimes(1)
  })
  it('service to check duplicate favourite player returns null if duplicate does not exist', async () => {
    const mockCheckDuplicateFav = jest
      .spyOn(favourite, 'checkDuplicateFavFromDb')
      .mockResolvedValueOnce(Promise.resolve(data.checkDuplicateFavFailFromDb))
    const result = checkDuplicateFav(20, 1)
    expect(await result).toBe(null)
    expect(mockCheckDuplicateFav).toBeCalledTimes(1)
  })

  it('service to get user by user id', async () => {
    const mockGetUserByUserId = jest
      .spyOn(userDb, 'getUserByUserIdFromDb')
      .mockResolvedValue(data.getUserByUserIdFromDbSuccess)
    const result = await user.getUserByUserId(20)
    expect(mockGetUserByUserId).toBeCalledTimes(1)
    expect(result).toEqual(data.getUserByUserIdFromDbSuccess.rows)
  })
  it('service to get user by user id returns null if id not in db', async () => {
    const mockGetUserByUserId = jest
      .spyOn(userDb, 'getUserByUserIdFromDb')
      .mockResolvedValue(data.getUserByUserIdFromDbFailure)
    const result = await user.getUserByUserId(200)
    expect(mockGetUserByUserId).toBeCalledTimes(1)
    expect(result).toEqual(null)
  })
})
