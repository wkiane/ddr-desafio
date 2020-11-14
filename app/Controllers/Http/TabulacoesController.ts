import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Tabulacao } from 'App/Schemas/Tabulacao';
import mongoose from 'mongoose';


export default class TabulacoesController {
  async store({ request, response }: HttpContextContract) {
    try {
      const body = request.post();
      const gravacao = new Tabulacao({ ...body });
      const result = await gravacao.save();
      response.status(201).send(result);

    } catch(error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return response.status(422).send({ code: 422, error: error.message });
      }
      return response.status(500).send({ code: 500, message: 'Something went wrong' });
    }

  }
}
