import { BaseRepository } from "./oracle/base-repositorio";

interface Props {
  codigo: Number;
  nome: String;
  sobrenome: String;
  username: String;
  data_nascimento: Date;
  senha: String;
  categoria: String;
  n_identificacao: string;
  tipo_utente: string;
  saldo: Number;
  estado: String;
}

export class UtenteRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('utente');
  }



}