import OracleDB from "oracledb";
import { BaseRepository } from "./base-repositorio";

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

type BoleiaParams = {
  codigo_utente: number;
  lotacao: Number;
  custo: number;
  data_hora: string;
  tipo: string;
  origem: number;
  destino: number;
  t_freq: string;
  termino: string;
};

export class BoleiaRepositorio extends BaseRepository<Props> {
  constructor() {
    super("boleia");
  }

  public async criarBoleia(boleia: BoleiaParams): Promise<any> {
    try {
      const conexao = await this.connect();
      const boleiaParams = [
        boleia.codigo_utente,
        boleia.lotacao,
        boleia.custo.toPrecision(9.2),
        boleia.data_hora,
        boleia.tipo,
        boleia.origem,
        boleia.destino,
        boleia.t_freq,
        boleia.termino,
      ].join(",");
      console.log(boleiaParams)
      const result = await conexao.execute(
        `Begin :confirm := pck_utente.organizar_boleia( ${boleiaParams}); End;`,
        { confirm: { type: OracleDB.DB_TYPE_NUMBER, dir: OracleDB.BIND_OUT } }
      );
      const resultSet = Object(result.outBinds);
      return this.checkAndReturn([resultSet]);
    } catch (erro) {
      throw erro;
    } finally {
      this.disconnect();
    }
  }
  
  public async boleiasCriadas(cod_utente: Number): Promise<any[]>{
    try{
      const conexao = await this.connect();
      const result = await conexao.execute(`
      Begin
        :boleias := minhasBoleias(:codigo_utente);
      End;
      `,{
      codigo_utente: { type: OracleDB.NUMBER, val: cod_utente },
      boleias: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT }
    });
      const resultSet = Object(result.outBinds).boleias;
      console.log(resultSet.metaData)
      let row: {};
      const cursor: Array<any> = [];
      while (row = await resultSet.getRow()) {
        cursor.push(row);
      }
      await resultSet.close();
      return this.checkAndReturn(cursor);
    }catch(erro){
      console.error( erro)
      throw erro
    }
  }

  public async boleiasInscritas(cod_utente: Number, cod_boleia: Number): Promise<any[]>{
    try{
      const conexao = await this.connect();
      const result = await conexao.execute(`
      Begin
        :boleias := boleiasInscritas(:codigo_utente, :codigo_boleia);
      End;
      `,{
      codigo_boleia: { type: OracleDB.NUMBER, val: cod_boleia },
      codigo_utente: { type: OracleDB.NUMBER, val: cod_utente },
      boleias: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT }
    });
      const resultSet = Object(result.outBinds).boleias;
      console.log(resultSet.metaData)
      let row: {};
      const cursor: Array<any> = [];
      while (row = await resultSet.getRow()) {
        cursor.push(row);
      }
      await resultSet.close();
      return this.checkAndReturn(cursor);
    }catch(erro){
      console.error( erro)
      throw erro
    }
  }
}
