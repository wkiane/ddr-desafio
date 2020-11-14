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
    const HealthCheck = (await import('@ioc:Adonis/Core/HealthCheck')).default
    const report = await HealthCheck.getReport()

    await mongoConnection.connect()
    report.healthy
      ? console.info('connection is looking good ')
      : console.error('something wrong with the connection')
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
