import { BaseRepository } from "./base-repositorio";

interface Props {
  codigo: Number;
  matricula:String;
  marca: String;
  modelo: String;
  lotacao: Number;
  codigo_dono: Number;
}

export class ViaturaRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('viatura');
  }


}
