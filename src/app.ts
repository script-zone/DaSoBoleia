
import express from 'express'
import cors from 'cors'

import { globalErrorHandler } from './middlewares/global-error-handler'
import { connectOracleDB } from './infra/db/oracle'
import { Controller } from './core/controller'

export class App {
  private app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()
    this.connectDatabase()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandler()
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(({ router }) => this.app.use('/api', router))
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private connectDatabase() {
    connectOracleDB()
  }

  private initializeErrorHandler() {
    this.app.use(globalErrorHandler)
  }

  public run() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Aplication is running on port ${process.env.PORT}`)
    })
  }
}
