import { GenericController } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class UtenteController extends GenericController {
  protected repository = new BaseRepository('utente')
  public path = '/utente'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
