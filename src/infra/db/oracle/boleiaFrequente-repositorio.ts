import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  tipo_Frequencia: String;
  data_termino: Date;
}

export class FrequenteRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('boleia_frequente');
  }



}