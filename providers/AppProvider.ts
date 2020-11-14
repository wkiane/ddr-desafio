import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Jobs from 'App/Jobs/Jobs'
import * as mongoConnection from 'Config/mongoConnection'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    await mongoConnection.connect()
    Jobs.execute()
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    await mongoConnection.close()
  }
}
