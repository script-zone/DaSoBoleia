import { GenericController } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class InscricaoController extends GenericController {
  public path = '/inscricao'
  protected repository = new BaseRepository('inscricao')


  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
   this.initializeGenericRoutes()
  }
}
