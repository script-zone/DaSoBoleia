import { GenericController } from "./generic-controller";
import { ViaturaRepositorio } from "../infra/db/viatura-repositorio";

export class ViaturaController extends GenericController {
  protected repository = new ViaturaRepositorio()
  public path = '/viatura'
    
  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}
