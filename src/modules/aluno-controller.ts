import { GenericController} from "./generic-controller";
import { AlunoRepositorio } from "../infra/db/aluno-repositorio";

export class AlunoController extends GenericController {
  public path = '/aluno';
  protected repository = new AlunoRepositorio()
    
  constructor() {
    super()
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.initializeGenericRoutes()
  }
}