import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  max: 10,
})

export const query = async (
  text: string,
  params: Array<null | string | number>
) => {
  return new Promise((resolve, reject) => {
    try {
      const result = pool.query(text, params)
      return resolve(result)
    } catch (error) {
      return reject(error)
    }
  })
}
