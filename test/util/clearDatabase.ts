import { Gravacao } from '../../app/Models/Gravacao'
import { Matching } from '../../app/Models/Matching'
import { Tabulacao } from '../../app/Models/Tabulacao'

export default async function clearDatabase() {
  await Promise.all([Gravacao.deleteMany({}), Matching.deleteMany({}), Tabulacao.deleteMany({})])
}
