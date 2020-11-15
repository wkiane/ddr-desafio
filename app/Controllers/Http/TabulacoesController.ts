import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/ExceptionHandler'
import { Tabulacao } from 'App/Models/Tabulacao'

export default class TabulacoesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.post()
      const gravacao = new Tabulacao({ ...body })
      const result = await gravacao.save()
      response.status(201).send(result)
    } catch (error) {
      const errorResponse = await ExceptionHandler.execute(error)

      return response.status(errorResponse.code).send({
        code: errorResponse.code,
        message: errorResponse.error,
      })
    }
  }
}
