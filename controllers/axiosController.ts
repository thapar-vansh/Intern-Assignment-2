import axios from 'axios'
import { Request, Response } from 'express'

export const getRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.body.id
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
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
    const id = req.body.data.id
    const data = req.body.data
    await axios.post(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
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
    const id = req.body.id
    const data = req.body
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
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
    const id = req.body.id
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.send('Deleted post')
  } catch (error) {
    console.log(error.response)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}
