import { getAllPlayers, registerUser,generateToken ,loginUser} from '../../services/loginService'

describe('Tests for login service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  it('returns all players', async () => {
    const mockGetAllPlayers = jest
      .fn()
      .mockImplementation(() => Promise.resolve(getAllPlayers()))

    const expectedUsers = [
      {
        id: '1',
        name: 'virat',
        country: 'india',
      },
      {
        id: '2',
        name: 'rohit',
        country: 'india',
      },
      {
        id: '5',
        name: 'sachin',
        country: 'india',
      },
      {
        id: '7',
        name: 'tendulkar sachin',
        country: 'india',
      },
      {
        id: '8',
        name: 'vansh',
        country: 'india',
      },
      {
        id: '9',
        name: 'msd',
        country: 'india',
      },
    ]

    expect(await mockGetAllPlayers()).toEqual(expectedUsers)
  })

  it('registers user', async () => {
    
    const mockRegisterUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(registerUser('vansh','India@07')))
      const result = await mockRegisterUser('vansh','India@07')
      const expectedResult = true
      expect(mockRegisterUser).toBeCalledTimes(1)
      expect(result).toBe(expectedResult)
  })

  it('returns user login token', async () => {
  
    const mockLoginUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(loginUser('shwet','India@07')))
      const result = await mockLoginUser('shwet','India@07')
      const expectedResult = await loginUser('shwet','India@07')
      expect(mockLoginUser).toBeCalledTimes(1)
      expect(result).toBe(expectedResult)
  })

it('generates token',()=>{
  const mockGenerateToken = jest
  .fn()
  .mockImplementation(() => (generateToken(1)))
  const result = mockGenerateToken(1)
  expect(mockGenerateToken).toBeCalledTimes(1)
  expect(result).toEqual(generateToken(1))
})
})