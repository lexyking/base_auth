import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const { MONGO_DB_USER, MONGO_DB_PASSWORD1, DB_NAME} = process.env

export const mongoDBConnection = async() => {
  const MONGO_DB_URI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD1}@authbase1.7zsws.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=authbase1`

  try {
      const connection = await mongoose.connect(MONGO_DB_URI)
      console.log('connected to the DB', connection.connection.host)
    } catch (error) {
      console.error('Error connecting to the DB', error)
      process.exit(1)
    }
}