import express from 'express'
import {mongoDBConnection} from './db/connectDB.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world 123')
})

app.listen(3000, async () => {
  await mongoDBConnection()
  console.log('Server running on port 3000')
})