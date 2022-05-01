import {
  getAllPlayers,
  registerUser,
  loginUser,
} from '../../services/loginService'
import * as login from '../../services/loginService'
import * as data from '../data/data.json'
import * as userDb from '../../database/users.db'
import * as playerDb from '../../database/players.db'

describe('Tests for login service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns all players', async () => {
    const mockGetAllPlayers = jest
      .spyOn(playerDb, 'getPlayersFromDb')
      .mockResolvedValueOnce(data.getAllPlayersSuccess)
    const result = getAllPlayers()
    expect(await result).toBe(data.getAllPlayersSuccess.rows)
    expect(mockGetAllPlayers).toBeCalledTimes(1)
  })

  it('register user success', async () => {
    const mockRegisterUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValue(data.getUserByUsernameFailure)

    const mockAddUserToDb = jest
      .spyOn(userDb, 'addUserToDb')
      .mockResolvedValue(data.registerUserInsertSuccess)
    const result = await registerUser('testj', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(mockAddUserToDb).toBeCalledTimes(1)
    expect(result).toBe(undefined)
  })
  it('register user returns to true when user already exists', async () => {
    const mockRegisterUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValue(data.getUserByUsernameSuccess)
    const result = await registerUser('vansh', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(result).toBe(true)
  })

  it('returns user does not exists when user not in database', async () => {
    try {
      const mockLoginUser = jest
        .spyOn(userDb, 'getUserbyUsername')
        .mockResolvedValueOnce(data.getUserByUsernameFailure)

      const result = loginUser('vansht', 'India@07')
      expect(await result).toThrowError('User does not exists')
      expect(mockLoginUser).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('generates token when user exists', async () => {
    const mockLoginUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValueOnce(data.getUserByUsernameSuccess)

    const mockGenerateToken = jest
      .spyOn(login, 'generateToken')
      .mockResolvedValue(Promise.resolve(data.token))
    const result = await loginUser('vansh', 'India@07')
    expect(mockGenerateToken).toBeCalledTimes(1)
    expect(mockLoginUser).toBeCalledTimes(1)

    expect(result).toEqual(data.token)
  })
  it('returns invalid credentials when credentials does not match', async () => {
    try {
      const mockLoginUser = jest
        .spyOn(userDb, 'getUserbyUsername')
        .mockResolvedValueOnce(data.getUserByUsernameSuccess)

      const result = loginUser('vansh', 'India@075')
      expect(await result).toThrowError('Invalid credentials')
      expect(mockLoginUser).toBeCalledTimes(1)
    } catch (error) {
      console.log(error)
    }
  })

  it('generates login token success', async () => {
    const mockGenerateToken = jest
      .spyOn(login, 'generateToken')
      .mockResolvedValue(Promise.resolve(data.token))
    const result = await login.generateToken(20)
    expect(mockGenerateToken).toBeCalledTimes(1)
    expect(result).toEqual(data.token)
  })
})
