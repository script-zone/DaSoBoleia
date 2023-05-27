import { Router, Request, Response, NextFunction } from "express";

import { BoleiaRepositorio } from "../infra/db/oracle/repositorios/boleia-repositorio";
import { Controller } from "../core/controller";

export class BoleiaController implements Controller {
  public path = '/boleia'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private async tudo(_: Request, response: Response, __: NextFunction) {
    const todosUtentes = await new BoleiaRepositorio().tudo()
    return response.status(200).json(todosUtentes);
  }

  private async encontrar(request: Request, response: Response, __: NextFunction) {
    const { codigo } = request.params
    const resultado = await new BoleiaRepositorio().encontrar(codigo)
    return response.status(200).json(resultado)
  }

  private async eliminar(request: Request, response: Response) {
    const { codigo } = request.params
    const resultado = await new BoleiaRepositorio().eliminar(codigo)
    return response.status(200).json()
  }

  private async adicionar(request: Request, response: Response) {
    const dados = request.body
    const resultado = await new BoleiaRepositorio().adicionar(dados)
    return response.status(200).json()
  }


  public initializeRoutes() {
    this.router.get(`${this.path}`, this.tudo)
    this.router.get(`${this.path}/:codigo`, this.encontrar)
    this.router.delete(`${this.path}/:codigo`, this.eliminar)
    this.router.post(`${this.path}`, this.adicionar)
  }

}