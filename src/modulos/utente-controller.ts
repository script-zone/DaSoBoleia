import { Router, Request, Response, NextFunction } from "express";

import { UtenteRepositorio } from "../infra/db/oracle/repositorios/utente-repositorio";
import { Controller } from "../core/controller";

export class UtenteController implements Controller {
  public path = '/utente'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private async tudo(_: Request, response: Response, __: NextFunction) {
    const todosUtentes = await new UtenteRepositorio().tudo()
    return response.status(200).json(todosUtentes);
  }

  private async encontrar(request: Request, response: Response, __: NextFunction) {
    const { codigo } = request.params
    const resultado = await new UtenteRepositorio().encontrar(codigo)
    return response.status(200).json(resultado)
  }

  private async eliminar(request: Request, response: Response) {
    const { codigo } = request.params
    const resultado = await new UtenteRepositorio().eliminar(codigo)
    return response.status(200).json({ mensagem: `Utente com o codigo ${codigo} eliminado com sucesso` })
  }

  private async adicionar(request: Request, response: Response) {
    const dados = request.body
    const resultado = await new UtenteRepositorio().adicionar(dados)
    return response.status(200).json({ mensagem: `Utente adicionado com sucesso` })
  }

/*
  private async login(request: Request, response: Response){
    const {user, pass} = request.body
    const resultado = await new UtenteRepository().acesso({ user, pass })
    return response.status(200).json({resposta : resultado})
  }
*/

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.tudo)
    this.router.get(`${this.path}/:codigo`, this.encontrar)
    this.router.delete(`${this.path}/:codigo`, this.eliminar)
    this.router.post(`${this.path}`, this.adicionar)
  }
}
