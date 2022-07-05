import supertest from 'supertest'
import * as data from '../data/data.json'
import axios, { AxiosResponse } from 'axios'
import { app } from '../../src/index'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const request = supertest(app)

describe('tests for axios', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('test for get request results in success', async () => {
    const mockedRes: AxiosResponse = data.getRequestSuccess
    const mockGetRequestAxiosCall = mockedAxios.get.mockResolvedValue(mockedRes)
    const result = await mockedAxios.get('/axios/posts/1')
    expect(mockGetRequestAxiosCall).toHaveBeenCalledTimes(1)
    expect(result.status).toBe(200)
    expect(result).toBe(data.getRequestSuccess)
  })

  it('test for get request results in failure', async () => {
    const mockedRes: AxiosResponse = data.getRequestFaiure
    const mockGetRequestAxiosCall = mockedAxios.get.mockResolvedValue(mockedRes)
    const result = await mockedAxios.get('/axios/posts/199')
    expect(mockGetRequestAxiosCall).toHaveBeenCalledTimes(1)
    expect(result.status).toBe(400)
    expect(result.statusText).toBe(
      'Request failed . Please try again after sometime.'
    )
  })

  it('test for post request results in success', async () => {
    const mockedRes: AxiosResponse = data.postRequestSuccess
    const mockGetRequestAxiosCall =
      mockedAxios.post.mockResolvedValue(mockedRes)
    const result = await mockedAxios.post('/axios/posts')
    expect(mockGetRequestAxiosCall).toHaveBeenCalledTimes(1)
    expect(result.status).toBe(200)
    expect(result.statusText).toBe('Added post')
  })

  it('test for post request results in failure', async () => {
    const mockedRes: AxiosResponse = data.postRequestFailure
    const mockGetRequestAxiosCall =
      mockedAxios.post.mockResolvedValue(mockedRes)
    const result = await mockedAxios.post('/axios/posts/199')
    expect(mockGetRequestAxiosCall).toHaveBeenCalledTimes(1)
    expect(result.status).toBe(400)
    expect(result.statusText).toBe(
      'Request failed . Please try again after sometime.'
    )
  })

  it('test for put request results in success', async () => {
    const expectedResult = 'Updated post'
    const res = await request
      .put('/axios/posts/1')
      .send({ data: data.getRequestSuccess.data })
    expect(res.status).toBe(200)
    expect(res.text).toStrictEqual(expectedResult)
  })

  it('test for put request results in failure', async () => {
    const expectedResult = 'Request failed . Please try again after sometime.'
    const res = await request
      .put('/axios/posts/199')
      .send({ data: data.getRequestSuccess.data })
    expect(res.status).toBe(400)
    expect(res.text).toStrictEqual(expectedResult)
  })

  it('test for delete request results in success', async () => {
    const expectedResult = 'Deleted post'
    const res = await request.delete('/axios/posts/1')
    expect(res.status).toBe(200)
    expect(res.text).toStrictEqual(expectedResult)
  })
})
