import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
import clearDatabase from './test/util/clearDatabase'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

function getTestFiles() {
  let userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'app/**/*.test.ts'
  }

  return `app/**/${userDefined.replace(/\.ts$|\.js$/, '')}.test.ts`
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [startHttpServer, clearDatabase],
})
