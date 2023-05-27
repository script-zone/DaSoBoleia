import oracledb, { Connection, ExecuteOptions, BindParameters, ResultSet } from 'oracledb';
import { connectOracleDB } from '../index'

export default abstract class BaseRepositorio<T> {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  public async getConnection(): Promise<Connection> {
    return connectOracleDB();
  }

  public async execute(sql: string, bindParams?: any[]) {
    
    let con: any;
    let resultado: any;
    try{
    con = await this.getConnection();
    resultado = await con.execute(sql,bindParams);
    con.commit();
    }catch(err){
      console.error(err)
    }finally{
      return resultado;
    }

  }

  public async tudo(): Promise<T[] | null> {
    const sql = `SELECT * FROM ${this.table}`;
    const records = await this.execute(sql,[])
    return records?.rows as T[]
  }

  public async encontrar(codigo): Promise<T | null> {
    const sql = `select * from ${this.table} where codigo = ${codigo}`;
    const resultado = await this.execute(sql,[])
    return resultado?.rows as T
  }

  public  async eliminar(codigo): Promise<any> {
    const sql = `delete from ${this.table} where codigo = ${codigo}`;
    const resultado = await this.execute(sql,[])
    return resultado
  }

/*  
  protected async adicionar(dados: Partial<any>): Promise<T> {
    const columns = Object.keys(dados).join(', ');
    const values = Object.values(dados);
    const bindParams = values.map((value, index) => ({
      name: `val${index}`,
      type: oracledb.STRING,
      val: value,
    }));

    const placeholders = bindParams.map((param) => `:${param.name}`).join(', ');
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING * INTO :out`;

    const options: ExecuteOptions = {
      bindDefs: [...bindParams, { name: 'out', type: oracledb.CURSOR, dir: oracledb.BIND_OUT }],
    };

    const result = await this.execute(sql, bindParams, options);
    const outCursor = result.outBinds.out as ResultSet;
    const rows = await outCursor.getRows(1);

    return this.mapRow(rows[0]);
  }

  protected async updateOne(id: number, data: Partial<T>): Promise<T | null> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const bindParams = values.map((value, index) => ({
      name: `val${index}`,
      type: oracledb.STRING,
      val: value,
    }));

    const setClauses = columns.map((column, index) => `${column} = :val${index}`).join(', ');
    const sql = `UPDATE ${this.table} SET ${setClauses} WHERE id = :id`;

    const bindParamsWithId = [
      { name: 'id', dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: id },
      ...bindParams,
    ];

    await this.execute(sql, bindParamsWithId);

    return this.find(id);
  }

  protected async deleteOne(id: number): Promise<boolean> {
    const sql = `DELETE FROM ${this.table} WHERE id = :id`;
    const bindParams = {
      id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: id },
    };

    await this.execute(sql, bindParams);

    const deleted = await this.find(id);

    return !deleted;
  }

  public async find(id: number): Promise<T | null> {
    const sql = `SELECT * FROM ${this.table} WHERE id = :id`;
    const bindParams = {
      id: { dir: oracledb.BIND_IN, type: oracledb.NUMBER, val: id },
    };

    return this.executeOne(sql, bindParams);
  }

  public async findOne(conditions: Partial<T>): Promise<T | null> {
    const columns = Object.keys(conditions);
    const values = Object.values(conditions);
    const bindParams = values.map((value, index) => ({
      name: `val${index}`,
      type: oracledb.STRING,
      val: value,
    }));

    const whereClauses = columns.map((column, index) => `${column} = :val${index}`).join(' AND ');
    const sql = `SELECT * FROM ${this.table} WHERE ${whereClauses}`;

    return this.executeOne(sql, bindParams);
  }

  public async findMany(conditions: Partial<T>): Promise<T[]> {
    const columns = Object.keys(conditions);
    const values = Object.values(conditions);
    const bindParams = values.map((value, index) => ({
      name: `val${index}`,
      type: oracledb.STRING,
      val: value,
    }));

    const whereClauses = columns.map((column, index) => `${column} = :val${index}`).join(' AND ');
    const sql = `SELECT * FROM ${this.table} WHERE ${whereClauses}`;

    return this.executeMany(sql, bindParams);
  }
  */

}
