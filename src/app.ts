
import express from 'express'
import cors from 'cors'

import { globalErrorHandler } from './middlewares/global-error-handler'
import { Controller } from './core/controller'

export class App {
  private app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()
    this.initMiddlewares()
    this.initControllers(controllers)
    this.initErrorHandler()
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach(({ router }) => this.app.use('/api', router))
  }

  private initMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private initErrorHandler() {
    this.app.use(globalErrorHandler)
  }

  public run() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Aplicação rodando na porta ${process.env.PORT}`)
    })
  }
}
