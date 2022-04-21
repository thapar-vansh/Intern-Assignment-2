import {
  getUserbyUsername,
  getUserByUserId,
  addUserToDb,
} from '../../database/users.db'
import * as user from '../../database/users.db'
import * as data from '../data/data.json'
describe('tests for users table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets user by name', async () => {
    const mockGetUserbyUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getUserByUsernameSuccess))
    const result = await getUserbyUsername('vansh')
    const expectedUser = await mockGetUserbyUsername('vansh')
    expect(mockGetUserbyUsername).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedUser)
  })

  it('gets user by userid', async () => {
    const mockGetUserByUserId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getUserByUserIdSuccess))
    const result = await getUserByUserId(1)
    const expectedUser = await mockGetUserByUserId(1)

    expect(mockGetUserByUserId).toBeCalledTimes(1)
    expect(result).toEqual(expectedUser)
  })

  it('adds user to database', async () => {
    const mockAddUserToDb = jest
      .spyOn(user, 'addUserToDb')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await addUserToDb('vansh', 'india')
    expect(mockAddUserToDb).toHaveBeenCalledTimes(1)
    expect(result).toEqual(data.insertSuccess)
  })
})
