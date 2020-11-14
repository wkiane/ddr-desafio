import mongoose, { Document, Model, Schema } from 'mongoose'

export interface Gravacao {
  telefone: string
  ramal: string
  dataGravacao: Date
}

const schema = new Schema(
  {
    telefone: { type: String, required: true },
    ramal: { type: String, required: true },
    dataGravacao: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

interface GravacaoModel extends Omit<Gravacao, '_id'>, Document {}
export const Gravacao: Model<GravacaoModel> = mongoose.model('Gravacao', schema)
