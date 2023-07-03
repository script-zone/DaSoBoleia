import { BaseRepository } from "../../infra/db/oracle/base-repositorio";

interface Props {
  codigo: Number;
  curso: String;
}

export class AlunoRepositorio extends BaseRepository<Props>{
  constructor(){
    super('login');
  }
}
