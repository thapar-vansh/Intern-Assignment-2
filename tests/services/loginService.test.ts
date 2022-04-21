import {
  getAllPlayers,
  registerUser,
  generateToken,
  loginUser,
} from '../../services/loginService'
import * as data from '../data/data.json'
import * as login from '../../services/loginService'

describe('Tests for login service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns all players', async () => {
    const mockGetAllPlayers = jest
      .fn()
      .mockImplementation(() => Promise.resolve(data.getAllPlayersSuccess))
    const result = await getAllPlayers()
    const expectedUsers = await mockGetAllPlayers()
    expect(result).toEqual(expectedUsers)
  })

  it('register user', async () => {
    const mockRegisterUser = jest
      .spyOn(login, 'registerUser')
      .mockImplementation(() => Promise.resolve(data.insertSuccess))
    const result = await registerUser('test', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(result).toBe(data.insertSuccess)
  })
  it('register user returns to true when user already exists', async () => {
    const mockRegisterUser = jest
      .spyOn(login, 'registerUser')
      .mockImplementation(() => Promise.resolve(true))
    const result = await registerUser('vansh', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(result).toBe(true)
  })

  it('returns user login token', async () => {
    const mockLoginUser = jest
      .fn()
      .mockImplementation(() => loginUser('shwet', 'India@07'))
    const result = await loginUser('shwet', 'India@07')
    const expectedResult = await mockLoginUser('shwet', 'India@07')
    expect(mockLoginUser).toBeCalledTimes(1)
    expect(result).toBe(expectedResult)
  })

  it('returns error for non-existent user', async () => {
    const mockLoginUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve('User does not exists'))
    const expectedResult = await mockLoginUser('shwetk', 'India@07')
    expect(mockLoginUser).toBeCalledTimes(1)
    expect(expectedResult).toEqual('User does not exists')
  })
  it('returns error for wrong credentials', async () => {
    const mockLoginUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve('Invalid Credentials'))
    const expectedResult = await mockLoginUser('shwet', 'India@073')
    expect(mockLoginUser).toBeCalledTimes(1)
    expect(expectedResult).toEqual('Invalid Credentials')
  })

  it('generates token', async () => {
    const mockGenerateToken = jest
      .spyOn(login, 'generateToken')
      .mockImplementation(() => Promise.resolve(data.token))
    const result = await generateToken(1)
    expect(mockGenerateToken).toBeCalledTimes(1)
    expect(result).toEqual(data.token)
  })
})
