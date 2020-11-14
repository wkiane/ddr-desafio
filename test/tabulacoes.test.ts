import test from 'japa'
import supertest from 'supertest'
import { Gravacao } from 'App/Schemas/Gravacao'
import { Matching } from 'App/Schemas/Matching'
import { Tabulacao } from 'App/Schemas/Tabulacao'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Tabulacoes Funcional Tests', (group) => {
  group.beforeEach(async () => {
    await Gravacao.deleteMany({})
    await Matching.deleteMany({})
    await Tabulacao.deleteMany({})
  })

  test('should create a tabulacao', async (assert) => {
    const response = await supertest(BASE_URL).post('/tabulacoes').send({
      nomeCliente: 'Jõao Santos',
      protocolo: 'C202004002',
      dataAtendimento: '2020-04-12 12:43:12',
      numeroBinado: '11922222222',
      numeroAcesso: '11933333333',
    })

    assert.equal(response.status, 201)
    assert.deepInclude(response.body, {
      nomeCliente: 'Jõao Santos',
      protocolo: 'C202004002',
      dataAtendimento: '2020-04-12T15:43:12.000Z',
      numeroBinado: '11922222222',
      numeroAcesso: '11933333333',
    })
  })
})