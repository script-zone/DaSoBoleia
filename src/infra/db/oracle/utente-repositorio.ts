import OracleDB from "oracledb";
import { BaseRepository } from "./base-repositorio";

export interface Props {
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

type UtenteParams = {
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  data_nascimento: string;
  senha: string;
  categoria: string;
  n_identificacao: string;
  tipo_utente: string;
  saldo: number;
  estado: string;
  curso: string
}

export class UtenteRepositorio extends BaseRepository<Props>{
  
  constructor(){
    super('utente');
  }

  public signup = async (newUser: UtenteParams  ): Promise<any | null> => {
    //const fullname = newUser.nome.split(' ');
    //newUser.nome = fullname[0];
    //newUser.sobrenome = fullname[fullname.length-1];
    try{
      const utenteParams = [
        newUser.nome,
        newUser.sobrenome,
        newUser.username,
        newUser.email,
        newUser.data_nascimento,
        newUser.senha,
        newUser.categoria,
        newUser.n_identificacao,
        newUser.tipo_utente,
        newUser.saldo.toPrecision(9.2),
        newUser.estado,
        newUser.curso
      ].join(",");
      console.log(utenteParams)
      const result = await this.execute(`
        INSERT INTO UTENTE (nome, sobrenome, username, email, data_nascimento, senha, categoria, n_identificacao, tipo_utente, saldo, estado) 
        VALUES('${newUser.nome}', '${newUser.sobrenome}', '${newUser.username}', '${newUser.email}', to_date('${newUser.data_nascimento}', 'DD-MM-RRRR HH24:MI:SS'), '${newUser.senha}', '${newUser.categoria}', '${newUser.n_identificacao}', '${newUser.tipo_utente}', ${newUser.saldo}, '${newUser.estado}')
      `);
      const result2 = await this.execute(`select * from utente where codigo=(select max(codigo) from utente)`)//,{ utente: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT } }
      //  Begin :utente := pck_utente.criar_conta(${utenteParams}); End;
      /*const resultSet = Object(result.outBinds).utente;
      console.log(resultSet.metaData)
      let row: {};
      const cursor: Array<any> = [];
      while (row = await resultSet.getRow()) {
        cursor.push(row);
      }
      await resultSet.close();
      console.log(cursor)
      return this.checkAndReturn(cursor);*/
      return this.checkAndReturn(result2)?.[0] || null;
    }catch(err){
      throw err
    }
  }

  public async existUser(filter: Record<string, any>): Promise<any> {
    try {
      const filterCondition = Object.entries(filter).map(([key,_]) => `${key} = :${key}`);
      const filterParams = Object.fromEntries(Object.entries(filter).map(([key, value]) => [key, value]));
      
      const query = `
        SELECT *
        FROM ${this.table}
        ${filterCondition.length ? 'WHERE ' + filterCondition.join(' AND ') : ''}
      `;
      const result = await this.execute(query, filterParams);
      return this.checkAndReturn(result).length>=1;
    } catch (error) {}
  }

  public async login(email: String): Promise<Partial<Props> | null>{
    try {
      const result = await this.execute2(`SELECT * FROM ${this.table} WHERE email = ${email}`);
      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    } 
  }

  public async getCondutor(cod_boleia: Number): Promise<any[]>{
    try{
      const conexao = await this.connect();
      const result = await conexao.execute(`
      Begin
        :condutor := pck_utente.ver_condutor(:codigo_boleia);
      End;
      `,{
      codigo_boleia: { type: OracleDB.NUMBER, val: cod_boleia },
      condutor: { type: OracleDB.CURSOR, dir: OracleDB.BIND_OUT }
    });
      const resultSet = Object(result.outBinds).condutor;
      console.log(resultSet.metaData)
      let row: {};
      const cursor: Array<any> = [];
      while (row = await resultSet.getRow()) {
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
