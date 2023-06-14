import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  codigo_boleia: Number;
  codigo_utente: Number;
  data_inscricao: Date;
}

export class InscricaoRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('inscricao');
  }



}