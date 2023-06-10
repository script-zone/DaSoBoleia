import OracleDB, { SodaDocument } from "oracledb";
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

  public async getCondutor(cod_Boleia): Promise<any>{
    try{
      const conexao = await this.connect();
      const result = await conexao.execute(`
      Begin
        pck_utente.ver_condutor(:codigo_boleia,:condutor);
      End;
      `,{
      codigo_boleia: cod_Boleia,
      condutor: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT }
    });
      const resultSet = Object(result.outBinds).condutor;
      let row;
      const cursor: Array<any> = [];
      while ((row = await resultSet.getRow())) {
        cursor.push(row);
      }
      await resultSet.close();
      console.log(cursor)
      return this.checkAndReturn(cursor);
    }catch(erro){
      console.error( erro)
      throw erro
    }
  }


}