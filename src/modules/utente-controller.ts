import { Request, Response } from "express"
import { NotFoundError } from "../middlewares/global-error-handler";
import { GenericController } from "./generic-controller";
import { UtenteRepositorio } from "../infra/db/utente-repositorio";

export class UtenteController extends GenericController {
  protected repository = new UtenteRepositorio();
  public path = '/utente'

  constructor() {
    super()
    this.initializeRoutes()
  }

  public async getCondutor(request: Request, response: Response){
    const { codigo } = request.params;
    const record = await new UtenteRepositorio().getCondutor(codigo);
    if(!record) throw new NotFoundError('Não há ainda condutor nesta boleia');
    return response.status(200).json(record)
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
    this.router.get(`${this.path}/condutor_boleia/:codigo`,this.getCondutor)
  }
}
