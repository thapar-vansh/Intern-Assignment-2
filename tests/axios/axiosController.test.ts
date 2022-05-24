import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../../controllers/axiosController'
import axios, { AxiosResponse } from 'axios'
import * as data from '../data/data.json'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('tests for axios', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('tests get request', async () => {
    const mockedRes: AxiosResponse = data.getRequestSuccess
    const mockGetRequest = mockedAxios.get.mockResolvedValue(mockedRes)
    console.log(mockGetRequest)
    const req: any = {}
    const res: any = {
      json: jest.fn(),
      status: jest.fn(),
    }
    const result = getRequest(req, res)
    expect(mockGetRequest).toHaveBeenCalledTimes(1)
    expect(await result).toBe(data.getRequestSuccess)
  })

  it('tests post request', async () => {
    const mockPostRequest = mockedAxios.post.mockResolvedValueOnce('Added post')
    const req: any = {}
    const res: any = {
      json: jest.fn(),
      status: jest.fn(),
    }

    const result = await postRequest(req, res)
    expect(result).toBe(mockPostRequest)
    expect(mockPostRequest).toBeCalledTimes(1)
  })
})
