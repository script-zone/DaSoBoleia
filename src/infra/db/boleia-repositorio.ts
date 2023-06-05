import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  qtd_passageiro: Number;
  custo_boleia: Number;
  data_boleia: Date;
  tipo_boleia: String;
  local_origem: Number;
  local_destino: Number;
  estado: String;
  codigo_utente: Number;
}

export class BoleiaRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('boleia');
  }

  

}