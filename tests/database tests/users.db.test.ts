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
    jest.resetAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('gets user by name', async () => {
    const mockGetUserbyUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getUserbyUsername('vansh')))
    const result = await mockGetUserbyUsername('vansh')
    const expectedUser = [
      {
        id: '1',
        username: 'vansh',
        password:
          '$2b$10$I1S0OevKbwCRhxYG9MxRCeuFyInUX29BmzfAInvQeMU2XTbrg/K6.',
      },
    ]
    expect(mockGetUserbyUsername).toBeCalledTimes(1)
    expect(result.rows).toEqual(expectedUser)
  })

  it('gets user by userid', async () => {
    const mockGetUserByUserId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getUserByUserId(1)))
    const result = await mockGetUserByUserId(1)
    const expectedUser = {
      id: '1',
      password: '$2b$10$I1S0OevKbwCRhxYG9MxRCeuFyInUX29BmzfAInvQeMU2XTbrg/K6.',
      username: 'vansh',
    }

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
