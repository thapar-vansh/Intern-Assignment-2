import supertest from 'supertest'
import * as data from '../data/data.json'
import { app } from '../../src/index'

const request = supertest(app)

describe('tests for axios', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('test for get request results in success', async () => {
    const res = await request.get('/axios/posts/1')
    expect(res.status).toBe(200)
    expect(res.body).toStrictEqual(data.getRequestSuccess.data)
  })

  it('test for get request results in failure', async () => {
    const expectedResult = 'Request failed . Please try again after sometime.'
    const res = await request.get('/axios/posts/199')
    expect(res.status).toBe(400)
    expect(res.text).toStrictEqual(expectedResult)
  })

  it('test for post request results in success', async () => {
    const expectedResult = 'Added post'
    const res = await request
      .post('/axios/posts/1')
      .send({ data: data.getRequestSuccess.data })
    expect(res.status).toBe(200)
    expect(res.text).toStrictEqual(expectedResult)
  })

  it('test for post request results in failure', async () => {
    const expectedResult = 'Request failed . Please try again after sometime.'
    const res = await request
      .post('/axios/posts/199')
      .send({ data: data.getRequestSuccess.data })
    expect(res.status).toBe(400)
    expect(res.text).toStrictEqual(expectedResult)
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
