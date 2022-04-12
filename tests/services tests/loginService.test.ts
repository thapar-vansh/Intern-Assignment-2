import { getAllPlayers } from '../../services/loginService'

describe('Get all players', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  afterEach(()=>{
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  test('returns all players', async () => {
    const mockGetAllPlayers = jest.fn().mockImplementation(()=>Promise.resolve(getAllPlayers()))

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
})
