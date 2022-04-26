import {
  getUserbyUsername,
  getUserByUserIdFromDb,
  addUserToDb,
} from '../../database/users.db'
import * as server from '../../util/server'

import * as data from '../data/data.json'
describe('tests for users table queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('gets user by name', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getUserByUsernameSuccess)

    const result = getUserbyUsername('msd')
    expect(await result).toBe(data.getUserByUsernameSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('gets user by userid', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.getUserByUserIdFromDbSuccess)
    const result = getUserByUserIdFromDb(20)
    expect(await result).toBe(data.getUserByUserIdFromDbSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })

  it('adds user to database', async () => {
    const mockDbQuery = jest
      .spyOn(server, 'query')
      .mockResolvedValueOnce(data.insertSuccess)
    const result = addUserToDb('rohan', 'india')
    expect(await result).toBe(data.insertSuccess)
    expect(mockDbQuery).toBeCalledTimes(1)
  })
})
