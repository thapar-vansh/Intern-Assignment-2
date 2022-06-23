import axios from 'axios'
import { Request, Response } from 'express'

export const getRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )

    return res.send(response.data)
  } catch (error) {
    console.log(error.response.status)
    console.log(error.response.statusText)
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
    // const id = req.params.id
    const data = req.body.data
    await axios.post(`https://jsonplaceholder.typicode.com/posts`, data)
    return res.send('Added post')
  } catch (error) {
    console.log(error.response.status)
    console.log(error.response.statusText)
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
    const id = req.params.id
    const data = req.body
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
    return res.send('Updated post')
  } catch (error) {
    console.log(error.response.status)
    console.log(error.response.statusText)
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
    const id = req.params.id
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.send('Deleted post')
  } catch (error) {
    console.log(error.response.status)
    console.log(error.response.statusText)
    return res
      .status(400)
      .send('Request failed . Please try again after sometime.')
  }
}
