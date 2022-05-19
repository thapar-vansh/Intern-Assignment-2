import axios from 'axios'
import { Request, Response } from 'express'

export const getRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.send(response.data)
}

export const postRequest = async (req: Request, res: Response) => {
  try {
    const data = req.body
    await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    return res.send('Added post')
  } catch (error) {
    console.log(error)
  }
}

export const putRequest = async (req: Request, res: Response) => {
  try {
    const data = req.body
    await axios.post('https://jsonplaceholder.typicode.com/posts', data)
    return res.send('Updated post')
  } catch (error) {
    console.log(error)
  }
}

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    return res.send('Deleted post')
  } catch (error) {
    console.log(error)
  }
}
