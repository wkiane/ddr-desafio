import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/ExceptionHandler'
import { Matching } from 'App/Models/Matching'

export default class MatchingController {
  public async index({ response }: HttpContextContract) {
    try {
      const matchings = await Matching.find()
      return response.json(matchings)
    } catch (error) {
      const errorResponse = await ExceptionHandler.execute(error)

      return response.status(errorResponse.code).send({
        code: errorResponse.code,
        message: errorResponse.error,
      })
    }
  }
}
