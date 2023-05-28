import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { GenericController } from "./generic-controller";

export class BoleiaController extends GenericController {
  public path = '/boleia'
  protected repository = new BaseRepository('boleia')

  constructor() {
    super();
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes(':id')
  }
}
