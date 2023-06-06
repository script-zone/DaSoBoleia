import { GenericController } from "./generic-controller";
import { UtenteRepositorio } from "../infra/db/utente-repositorio";

export class UtenteController extends GenericController {
  protected repository = new UtenteRepositorio();
  public path = '/utente'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
