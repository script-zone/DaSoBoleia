import { ViaturaRepositorio } from "../infra/db/oracle/viatura-repositorio";
import { GenericController } from "./generic-controller";

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
