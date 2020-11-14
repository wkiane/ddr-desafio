
import { Matching } from 'App/Schemas/Matching'
import { Tabulacao } from 'App/Schemas/Tabulacao'
import { Gravacao } from 'App/Schemas/Gravacao'

class MatchingJob {

  public async execute () {
    console.log('Executando Matching Job')

    const gravacoes = await Gravacao.find();
    const tabulacoes = await Tabulacao.find();
    const matchings = await Matching.find();


    matchings.forEach(matching => {
        for(let i = 0; i < tabulacoes.length; i += 1) {
          if(matching.tabulacao.toString() === tabulacoes[i]._id.toString()) {
            tabulacoes.splice(i, 1);
        }

        for (let i = 0; i < gravacoes.length; i += 1) {
          if (matching.gravacao.toString() === gravacoes[i]._id.toString()) {
              gravacoes.splice(i, 1);
          }
        }
      }
    })

      gravacoes.forEach(gravacao => {
        tabulacoes.forEach(tabulacao => {
          if (tabulacao.numeroBinado === gravacao.telefone || tabulacao.numeroAcesso === gravacao.telefone) {
            Matching.create({
              gravacao: gravacao._id,
              tabulacao: tabulacao._id,
            });
          }
        })
      })
  }


}


export default new MatchingJob()
