import mongoose, { Document, Model, Schema } from 'mongoose'

export interface Tabulacao {
  nomeCliente: string
  protocolo: string
  dataAtendimento: Date
  numeroBinado: string
  numeroAcesso: string
}

const schema = new Schema(
  {
    nomeCliente: { type: String, required: true },
    protocolo: { type: String, required: true },
    dataAtendimento: { type: Date, required: true },
    numeroBinado: { type: String, required: true },
    numeroAcesso: { type: String, required: true },
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

interface TabulacaoModel extends Omit<Tabulacao, '_id'>, Document {}
export const Tabulacao: Model<TabulacaoModel> = mongoose.model('Tabulacao', schema)
