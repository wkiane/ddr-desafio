import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Matching } from 'App/Schemas/Matching'

export default class MatchingController {
  public async index({ response }: HttpContextContract) {
    try {
      const matchings = await Matching.find()
      return response.json(matchings)
    } catch (error) {
      return response.status(500).send({ error: 'Something went wrong' })
    }
  }
}
