import test from 'japa'
import supertest from 'supertest'
import { Gravacao } from 'App/Schemas/Gravacao'
import { Matching } from 'App/Schemas/Matching'
import { Tabulacao } from 'App/Schemas/Tabulacao'
import MatchingJob from 'App/Jobs/MatchingJob'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Matching Funcional Tests', (group) => {
  group.beforeEach(async () => {
    await Gravacao.deleteMany({})
    await Matching.deleteMany({})
    await Tabulacao.deleteMany({})
  })

  test('return the matchings', async (assert) => {
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

    const response = await supertest(BASE_URL).get('/matchings')

    const [firstMatching] = response.body

    assert.equal(response.status, 200)
    assert.deepInclude(firstMatching, {
      tabulacao: String(tabulacao._id),
      gravacao: String(gravacao._id),
    })
  })
})