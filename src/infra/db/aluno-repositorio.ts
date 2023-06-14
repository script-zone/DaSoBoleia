import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  curso: String;
}

export class AlunoRepositorio extends BaseRepository<Props>{
  constructor(){
    super('aluno');
  }
}
