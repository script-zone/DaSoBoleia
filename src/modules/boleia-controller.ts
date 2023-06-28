import { Request, Response, Router } from "express"
import { NotFoundError } from "../middlewares/global-error-handler";
import { BoleiaRepositorio } from "../infra/db/oracle/boleia-repositorio";

export class BoleiaController {
  public path = '/boleia'
  public router = Router()
  protected repository = new BoleiaRepositorio()

  constructor() {
    this.initializeRoutes()
  }

  public async criarBoleia(request: Request, response: Response){
    

    const record = await new BoleiaRepositorio().criarBoleia(request.body);
    if(!record) throw new NotFoundError('Não foi possível criar esta boleia boleia');
    return response.status(200).json(record)
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/create`,this.criarBoleia)
  }
}
