import test from 'japa'
import supertest from 'supertest'
import { Gravacao } from 'App/Models/Gravacao'
import { Tabulacao } from 'App/Models/Tabulacao'
import MatchingJob from 'App/Jobs/MatchingJob'
import clearDatabase from './util/clearDatabase'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Matching Funcional Tests', (group) => {
  group.beforeEach(async () => {
    await clearDatabase()
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
      tabulacaoId: String(tabulacao._id),
      gravacaoId: String(gravacao._id),
    })
  })
})
