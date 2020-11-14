import test from 'japa'
import supertest from 'supertest'
import { Gravacao } from 'App/Schemas/Gravacao'
import { Matching } from 'App/Schemas/Matching'
import { Tabulacao } from 'App/Schemas/Tabulacao'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Gravacoes Funcional Tests', (group) => {
  group.beforeEach(async () => {
    await Gravacao.deleteMany({})
    await Matching.deleteMany({})
    await Tabulacao.deleteMany({})
  })

  test('should create a gravacao', async (assert) => {
    const response = await supertest(BASE_URL).post('/gravacoes').send({
      telefone: '11911111111',
      ramal: '203',
      dataGravacao: '2020-04-12 12:34:53',
    })

    assert.equal(response.status, 201)
    assert.deepInclude(response.body, {
      telefone: '11911111111',
      ramal: '203',
      dataGravacao: '2020-04-12T15:34:53.000Z',
    })
  })
})
