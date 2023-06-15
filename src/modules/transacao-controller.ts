import { GenericController } from "./generic-controller";
import { TransacaoRepositorio } from "../infra/db/transacao-repositorio";

export class TransacaoController extends GenericController {
  protected repository = new TransacaoRepositorio();
  public path = '/transacao'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
