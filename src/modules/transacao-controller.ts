import { GenericController } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class TransacaoController extends GenericController {
  protected repository = new BaseRepository('transacao');
  public path = '/transacao'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
