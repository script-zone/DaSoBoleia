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
  
  public async minhasBoleias(request: Request, response: Response){
    const { cod_utente } = request.body;
    const record = await new BoleiaRepositorio().boleiasCriadas(cod_utente);
    if(!record) throw new NotFoundError('Ainda não criaste boleia');
    return response.status(200).json(record);
  }

  public async boleiasInscritas(request: Request, response: Response){
    const { cod_utente, cod_boleia } = request.body;
    const record = await new BoleiaRepositorio().boleiasInscritas(cod_utente,cod_boleia);
    if(!record) throw new NotFoundError('Ainda não inscriveste em nenhuma boleia');
    return response.status(200).json(record);
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/create`,this.criarBoleia)
    this.router.get(`${this.path}/my_rides`,this.minhasBoleias)
    this.router.get(`${this.path}/my_records`,this.boleiasInscritas)
  }
}
