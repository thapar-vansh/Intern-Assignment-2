import { getAllPlayers } from '../services/loginService'

describe('Get all players', () => {
  test('returns all players', async () => {
    let responseObject = {}
    const response = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
      }),
    }

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

    expect(await getAllPlayers()).toEqual(expectedUsers)
  })
})
