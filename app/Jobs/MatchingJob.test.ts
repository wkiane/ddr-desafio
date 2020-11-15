import { Gravacao } from 'App/Schemas/Gravacao'
import { Matching } from 'App/Schemas/Matching'
import { Tabulacao } from 'App/Schemas/Tabulacao'
import test from 'japa'
import MatchingJob from './MatchingJob'

test.group('Matching Job Unit Tests', (group) => {
  group.beforeEach(async () => {
    await Gravacao.deleteMany({})
    await Matching.deleteMany({})
    await Tabulacao.deleteMany({})
  })

  test('should create matchings', async (assert) => {
    const tabulacaoParams = {
      nomeCliente: 'Jõao Santos',
      protocolo: 'C202004002',
      dataAtendimento: '2020-04-12 12:43:12',
      numeroBinado: '11922222222',
      numeroAcesso: '11933333333',
    }
    const gravacaoParams = {
      telefone: '11933333333',
      ramal: '203',
      dataGravacao: '2020-04-12 12:43:01',
    }

    const gravacao = await new Gravacao(gravacaoParams).save()
    const tabulacao = await new Tabulacao(tabulacaoParams).save()

    await MatchingJob.execute()
    const [matching] = await Matching.find({})

    assert.deepInclude(matching, {
      tabulacaoId: tabulacao._id,
      gravacaoId: gravacao._id,
    })
  })
})
