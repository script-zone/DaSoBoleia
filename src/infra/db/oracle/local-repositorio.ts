import { BaseRepository } from "./base-repositorio";

interface Props {
  codigo: Number;
  nome: String;
  latitude: Number;
  Longitude: Number;
}

export class LocalRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('loccal');
  }



}
