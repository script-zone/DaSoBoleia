import OracleDB from "oracledb";
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


  public async criarBoleia(data: any): Promise<any>{
    try{
      const conexao = await this.connect();
      const result = await conexao.execute(`
        Begin
          :confirm := pck_utente.organizar_boleia(
          ${Number(data.codigo).toString()}, ${Number(data.custo).toPrecision(9.2)}, ${data.data_hora},
          ${data.tipo}, ${Number(data.origem).toString()}, ${Number(data.destino).toString()},
          ${data.t_freq}, ${data.termino});
        End;
        `,{
          confirm: {type: OracleDB.DB_TYPE_NUMBER, dir: OracleDB.BIND_OUT }
        }
      );
      const resultSet = Object(result.outBinds);
      return this.checkAndReturn([resultSet]);
    }catch(erro){
      console.error( erro)
      throw erro
    }
  }

  

}