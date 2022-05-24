import axios from 'axios'
import { Request, Response } from 'express'

export const getRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    )
    return res.send(response.data)
  } catch (error) {
    console.log(error.response)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}

export const postRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body
    await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    return res.send('Added post')
  } catch (error) {
    console.log(error.response)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}

export const putRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body
    await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    return res.send('Updated post')
  } catch (error) {
    console.log(error.response)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}

export const deleteRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    return res.send('Deleted post')
  } catch (error) {
    console.log(error.response)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}
