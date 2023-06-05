import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  curso: String;
}

export class AlunoRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('aluno');
  }

  public async getAluno(): Promise<any | null>  {
    
      const resultado = await this.execute(`select * from ${this.table}`);
      return this.checkAndReturn(resultado);
  }

}