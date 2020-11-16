import test from 'japa'
import supertest from 'supertest'
import clearDatabase from './util/clearDatabase'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Tabulacoes Funcional Tests', (group) => {
  group.beforeEach(async () => {
    await clearDatabase()
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

  test('should throw 422 when there is a validation error', async (assert) => {
    const response = await supertest(BASE_URL).post('/tabulacoes').send({
      protocolo: 'C202004002',
      dataAtendimento: '2020-04-12 12:43:12',
      numeroBinado: '11922222222',
      numeroAcesso: '11933333333',
    })

    assert.equal(response.status, 422)
    assert.deepInclude(response.body, {
      code: 422,
      message: 'Tabulacao validation failed: nomeCliente: Path `nomeCliente` is required.',
    })
  })
})
