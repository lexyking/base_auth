import express from 'express'
import {mongoDBConnection} from './db/connectDB.js'
import authRoutes from './routes/v1/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello world 123')
})

app.use('/api/v1/auth', authRoutes)

app.listen(PORT, async () => {
  await mongoDBConnection()
  console.log('Server running on port 3000')
})