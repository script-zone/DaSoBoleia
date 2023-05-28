import { GenericController } from "./generic-controller";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";

export class LocalController extends GenericController {
  protected repository = new BaseRepository('local');
  public path = '/local'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
