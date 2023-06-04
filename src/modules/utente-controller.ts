import { Request, Response } from "express";
import { GenericController, ok } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class UtenteController extends GenericController {
  protected repository = new BaseRepository('utente');
  public path = '/utente'

  constructor() {
    super()
    this.initializeRoutes()
  }

  protected getAluno = async(_request: Request, response: Response) => {
    const records = await this.repository.getAluno();
    return ok(response, records);
  }

  public initializeRoutes() {
    this.initializeGenericRoutes(),
    this.router.get(`/aluno`,this.getAluno)
  }
}
