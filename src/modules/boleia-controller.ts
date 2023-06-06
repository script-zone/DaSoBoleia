import { BoleiaRepositorio } from "../infra/db/boleia-repositorio";
import { GenericController } from "./generic-controller";

export class BoleiaController extends GenericController {
  public path = '/boleia'
  protected repository = new BoleiaRepositorio()

  constructor() {
    super();
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
