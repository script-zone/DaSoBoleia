import { GenericController } from "./generic-controller";
import { LocalRepositorio } from "../infra/db/local-repositorio";

export class LocalController extends GenericController {
  protected repository = new LocalRepositorio();
  public path = '/local'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
