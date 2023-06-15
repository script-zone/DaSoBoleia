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
type BoleiaParams = {
  codigo: number;
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
      const BoleiaParams = [
        boleia.codigo,
        boleia.custo.toPrecision(9.2),
        boleia.data_hora,
        boleia.tipo,
        boleia.origem,
        boleia.destino,
        boleia.t_freq,
        boleia.termino,
      ].join(",")
      const result = await conexao.execute(
        `
        Begin
          :confirm := pck_utente.organizar_boleia(
          ${BoleiaParams});
        End;
        `,
        {
          confirm: { type: OracleDB.DB_TYPE_NUMBER, dir: OracleDB.BIND_OUT },
        }
      );
      const resultSet = Object(result.outBinds);
      return this.checkAndReturn([resultSet]);
    } catch (erro) {
      throw erro;
    } finally {
      this.disconnect();
    }
  }
}
