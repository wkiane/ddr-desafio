import mongoose, { Mongoose } from 'mongoose'
import Env from '@ioc:Adonis/Core/Env'

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(Env.get('MONGO_URL'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

export const close = (): Promise<void> => mongoose.connection.close()
