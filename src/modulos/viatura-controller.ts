import { Router, Request, Response, NextFunction } from "express";

import { ViaturaRepositorio } from "../infra/db/oracle/repositorios/viatura-repositorio";
import { Controller } from "../core/controller";

export class ViaturaController implements Controller {
  
  public path = '/viatura'
  public router = Router()

    
  constructor() {
    this.initializeRoutes()
  }

  private async tudo(_: Request, response: Response, __: NextFunction) {
    const todosUtentes = await new ViaturaRepositorio().tudo()
    return response.status(200).json(todosUtentes);
  }

  private async encontrar(request: Request, response: Response, __: NextFunction) {
    const { codigo } = request.params
    const resultado = await new ViaturaRepositorio().encontrar(codigo)
    return response.status(200).json(resultado)
  }

  private async eliminar(request: Request, response: Response) {
    const { codigo } = request.params
    const resultado = await new ViaturaRepositorio().eliminar(codigo)
    return response.status(204).json()
  }

  private async adicionar(request: Request, response: Response) {
    const dados = request.body
    const resultado = await new ViaturaRepositorio().adicionar(dados)
    return response.status(204).json()
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.tudo)
    this.router.get(`${this.path}/:codigo`, this.encontrar)
    this.router.delete(`${this.path}/:codigo`, this.eliminar)
    this.router.post(`${this.path}`, this.adicionar)
  }


}