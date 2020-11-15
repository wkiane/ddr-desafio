import Env from '@ioc:Adonis/Core/Env'
import { Matching } from 'App/Models/Matching'
import { Tabulacao } from 'App/Models/Tabulacao'
import { Gravacao } from 'App/Models/Gravacao'

class MatchingJob {
  public async execute() {
    if (Env.get('NODE_ENV') !== 'testing') {
      console.log('Executando Matching Job')
    }

    const gravacoes = await Gravacao.find()
    const tabulacoes = await Tabulacao.find()
    const matchings = await Matching.find()

    matchings.forEach((matching) => {
      for (let i = 0; i < tabulacoes.length; i += 1) {
        if (matching.tabulacaoId.toString() === tabulacoes[i]._id.toString()) {
          tabulacoes.splice(i, 1)
        }

        for (let i = 0; i < gravacoes.length; i += 1) {
          if (matching.gravacaoId.toString() === gravacoes[i]._id.toString()) {
            gravacoes.splice(i, 1)
          }
        }
      }
    })

    gravacoes.forEach((gravacao) => {
      tabulacoes.forEach((tabulacao) => {
        if (
          tabulacao.numeroBinado === gravacao.telefone ||
          tabulacao.numeroAcesso === gravacao.telefone
        ) {
          Matching.create({
            gravacaoId: gravacao._id,
            tabulacaoId: tabulacao._id,
          })
        }
      })
    })

    await Tabulacao.find({})
  }
}

export default new MatchingJob()
