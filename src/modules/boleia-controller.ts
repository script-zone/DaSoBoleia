import { Request, Response } from "express";
import { NotFoundError } from "../middlewares/global-error-handler";
import { BoleiaRepositorio } from "../infra/db/oracle/boleia-repositorio";
import { GenericController } from "./generic-controller";

export class BoleiaController extends GenericController{
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
  
  public async minhasBoleias(request: Request, response: Response){
    const { cod_utente } = request.params;
    const record = await new BoleiaRepositorio().boleiasCriadas(Number(cod_utente));
    if(!record) throw new NotFoundError('Ainda não criaste boleia');
    return response.status(200).json(record);
  }

  public async boleiasInscritas(request: Request, response: Response){
    const { cod_utente, cod_boleia } = request.params;
    const record = await new BoleiaRepositorio().boleiasInscritas(Number(cod_utente),Number(cod_boleia));
    if(!record) throw new NotFoundError('Ainda não inscriveste em nenhuma boleia');
    return response.status(200).json(record);
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/create`,this.criarBoleia)
    this.router.get(`${this.path}/my_rides/:cod_utente`,this.minhasBoleias)
    this.router.get(`${this.path}/my_records/:cod_utente/:cod_boleia`,this.boleiasInscritas)
  }
}
