import { Request, Response } from "express"
import { NotFoundError } from "../middlewares/global-error-handler";
import { BoleiaRepositorio } from "../infra/db/boleia-repositorio";
import { GenericController } from "./generic-controller";

export class BoleiaController extends GenericController {
  public path = '/boleia'
  protected repository = new BoleiaRepositorio()

  constructor() {
    super();
    this.initializeRoutes()
  }

  public async criarBoleia(request: Request, response: Response){
    const record = await new BoleiaRepositorio().criarBoleia(request.body);
    if(!record) throw new NotFoundError('Não foi possível criar esta boleia boleia');
    return response.status(200).json(record)
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
    this.router.post(`${this.path}/create`,this.criarBoleia)
  }
}
