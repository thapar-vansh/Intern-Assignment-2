import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { router as indexRoutes } from '../routes/indexRoutes'
const app = express()
dotenv.config()
app.use(bodyParser.json())

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.use(indexRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
