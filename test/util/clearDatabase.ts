import { Gravacao } from '../../app/Models/Gravacao'
import { Matching } from '../../app/Models/Matching'
import { Tabulacao } from '../../app/Models/Tabulacao'

export default async function clearDatabase() {
  await Gravacao.deleteMany({})
  await Matching.deleteMany({})
  await Tabulacao.deleteMany({})
}
