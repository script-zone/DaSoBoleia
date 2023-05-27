import { Router, Request, Response, NextFunction } from "express";

import { TransacaoRepositorio } from "../infra/db/oracle/repositorios/transacao-repositorio";
import { Controller } from "../core/controller";

export class TransacaoController implements Controller {
  public path = '/transacao'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private async tudo(_: Request, response: Response, __: NextFunction) {
    const todosUtentes = await new TransacaoRepositorio().tudo()
    return response.status(200).json(todosUtentes);
  }

  private async encontrar(request: Request, response: Response, __: NextFunction) {
    const { codigo } = request.params
    const resultado = await new TransacaoRepositorio().encontrar(codigo)
    return response.status(200).json(resultado)
  }

  private async eliminar(request: Request, response: Response) {
    const { codigo } = request.params
    const resultado = await new TransacaoRepositorio().eliminar(codigo)
    return response.status(200).json()
  }

  private async adicionar(request: Request, response: Response) {
    const dados = request.body
    const resultado = await new TransacaoRepositorio().adicionar(dados)
    return response.status(200).json()
  }


  public initializeRoutes() {
    this.router.get(`${this.path}`, this.tudo)
    this.router.get(`${this.path}/:codigo`, this.encontrar)
    this.router.delete(`${this.path}/:codigo`, this.eliminar)
    this.router.post(`${this.path}`, this.adicionar)
  }

}