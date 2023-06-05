import { Request, Response } from "express";
import { GenericController} from "./generic-controller";
import { AlunoRepositorio } from "../infra/db/aluno-repositorio";

export class AlunoController extends GenericController {
  protected repository = new AlunoRepositorio();
  public path = '/viatura';
    
  constructor() {
    super()
    this.initializeRoutes()
  }

  protected getAluno = async(_request: Request, response: Response) => {
    const records = await this.repository.getAluno();
    return this.ok(response, records);
  }

  public initializeRoutes() {
    this.initializeGenericRoutes(),
    this.router.get(`/aluno`,this.getAluno)
  }
}