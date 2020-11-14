import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Matching {
  gravacao: string;
  tabulacao: string;
}

const schema = new Schema({
    tabulacao: { type: Schema.Types.ObjectId, ref: 'Tabulacao', required: true },
    gravacao: { type: Schema.Types.ObjectId, ref: 'Gravacao', required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
  }
})

interface MatchingModel extends Omit<Matching, '_id'>, Document {}
export const Matching: Model<MatchingModel> = mongoose.model('Matching', schema);
