import {
  getAllPlayers,
  registerUser,
  generateToken,
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

  it('register user', async () => {
    const mockRegisterUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValue(data.insertSuccess)
    const result = await registerUser('test', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(result).toBe(data.insertSuccess)
  })
  it('register user returns to true when user already exists', async () => {
    const mockRegisterUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValue(data.getUserByUsernameSuccess)
    const result = await registerUser('vansh', 'India@07')
    expect(mockRegisterUser).toBeCalledTimes(1)
    expect(result).toBe(true)
  })

  it('returns invalid credentials when credentials are wrong', async () => {
    const mockLoginUser = jest
      .spyOn(userDb, 'getUserbyUsername')
      .mockResolvedValueOnce(data.getUserByUsernameSuccess)

    const result = loginUser('msd', 'India@07')
    expect(await result).toThrowError('Invalid Credentials')
    expect(mockLoginUser).toBeCalledTimes(1)

    it('generates token', async () => {
      const mockGenerateToken = jest
        .spyOn(login, 'generateToken')
        .mockImplementation(() => Promise.resolve(data.token))
      const result = await generateToken(1)
      expect(mockGenerateToken).toBeCalledTimes(1)
      expect(result).toEqual(data.token)
    })
  })
})
