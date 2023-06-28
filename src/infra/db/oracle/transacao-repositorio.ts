import { BaseRepository } from "./base-repositorio";

interface Props {
  codigo: Number;
  valor: Number;
  data_transacao: Date;
  codigo_utente: Number;
}

export class TransacaoRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('transacao');
  }



}
