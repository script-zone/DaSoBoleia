import { GenericController } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class ViaturaController extends GenericController {
  protected repository = new BaseRepository('viatura')
  public path = '/viatura'
    
  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
