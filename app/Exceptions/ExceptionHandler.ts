/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import mongoose from 'mongoose'

class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public execute(error: Error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return { code: 422, error: error.message }
    }

    return {
      code: 500,
      error: 'Something went wrong',
    }
  }
}

export default new ExceptionHandler()
