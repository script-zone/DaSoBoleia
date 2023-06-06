import { GenericController } from "./generic-controller";
import { InscricaoRepositorio } from "../infra/db/inscricao-repositorio";

export class InscricaoController extends GenericController {
  public path = '/inscricao'
  protected repository = new InscricaoRepositorio()


  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
   this.initializeGenericRoutes()
  }
}
