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
    jest.resetAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
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
      .mockImplementation(() => Promise.resolve(getFavPlayer(20)))
    const result = await mockGetFavPlayer(20)
    const expectedPlayers = [
      {
        name: 'virat',
        country: 'india',
      },
    ]
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
    let playerId:number 
    let userId :number

    const mockCheckDuplicateFav = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(checkDuplicateFav(playerId, userId))
      )
      //console.log(await checkDuplicateFav(1,20),await checkDuplicateFav(1,2))
    const result1 = await mockCheckDuplicateFav(1, 20)
    console.log(result1)
    expect(result1).toEqual(true)

    const result2 = await mockCheckDuplicateFav(1, 2)
    expect(result2).toEqual(null)

    console.log(result1,result2)

    expect(mockCheckDuplicateFav).toBeCalledTimes(2)
  })
})
