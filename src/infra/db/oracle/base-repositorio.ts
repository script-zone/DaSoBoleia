import { Connection } from 'oracledb';
import { connectOracleDB } from '.';

export class BaseRepository<T extends {} = any> {
  protected table: string;
  private connection: Connection | undefined;

  constructor(table: string) {
    this.table = table;
  }

  public async connect(): Promise<Connection> {
    return connectOracleDB();
  }
  public disconnect() {
    return undefined;
  }

  protected checkAndReturn(result: any): T[] | any | null {
    if (result.rows || result.rows instanceof Array) 
      return result.rows
    if (result.length)
      return result
    return null;
  }

  public async execute(sql: string,bindParams:{}={}) {

    try{
      console.log(888)
      this.connection = await this.connect()
      const resultado = await this.connection.execute(sql,bindParams);
      console.log(bindParams)
      console.log(resultado?.outBinds)
    this.connection.commit()
      this.connection = this.disconnect()
      return resultado;
    }catch(err){
      console.error(err)
      throw err
    }
  }

  public async execute2(sql: string,params: any[]=[]) {
    try{
      this.connection = await this.connect()
      const resultado = await this.connection.execute(sql,params);
      this.connection.commit()
      this.connection = this.disconnect()
      return resultado;
    }catch(err){
      console.error(err)
      throw err
    }
  }

  public async getAluno(): Promise<T[] | null> {
      const results = await this.execute(`select * from aluno`);
      return this.checkAndReturn(results);
  }
  
  

  async create(data: T): Promise<T | null> {
    try {
      const columns = Object.keys(data).join(', ');
      const values = Object.values(data);
      const placeholders = `${Object.keys(data).map((value, _) => `:${value}`).join(', ')}`;
      const query = `INSERT INTO ${this.table}(${columns}) VALUES (${placeholders})`;
      const result = await this.execute2(query,values);
      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  }

  public async getAll(/*page = 1, limit = 10, */filters: Record<string, any> = {}): Promise<T[] | null> {
    try {
      //const offset = (page-1) * limit;
      const filterConditions = Object.entries(filters).map(([key,]) => `${this.table}.${key} = :${key}`);
      const filterParams = Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, value]));

      const query = `
        SELECT *
        FROM ${this.table} ${filterConditions.length ?
          'WHERE ' + filterConditions.join(' AND ') : ''}
      `;
    //`OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`
    //const query2 = `select * from ${this.table}`;

      const result = await this.execute(query,filterParams);
      return this.checkAndReturn(result);
    } catch (error) {
      console.error('Erro ao buscar os registros:', error);
      throw error;
    }
  }

  /*public async findOne(data: any): Promise<T | null> {
    try {
      const { codigo } = data
      const query = `
        SELECT *
        FROM ${this.table} WHERE codigo = ${codigo}
      `;
       
      const result = await this.execute(query)
      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar registro por ID:', error);
      throw error;
    }
  }*/

  public async findOne(filters: Record<string, any>): Promise<T | null> {
    try {
      const filterConditions = Object.entries(filters).map(([key, _value]) => `${key} = :${key}`);
      const filterParams = Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, value]));
      
      const query = `
        SELECT *
        FROM ${this.table}
        ${filterConditions.length ? 'WHERE ' + filterConditions.join(' AND ') : ''}
      `;
      const result = await this.execute(query, filterParams)
      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar registro por ID:', error);
      throw error;
    }
  }

  async updateById(codigo: string, data: T): Promise<boolean> {
    try {
      const columns = Object.keys(data).map((key, index) => `${key} = :${key}_`).join(', ');
      const values = Object.values(data);

      const query = `UPDATE ${this.table} SET ${columns} WHERE codigo = ${codigo}`;
      const result = await this.execute(query, values);

      return result?.rowsAffected === 1;
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw error;
    }
  }

  public async removeById(codigo: string): Promise<boolean> {
    try {
      const query = `DELETE FROM ${this.table} WHERE codigo = :codigo`;
      const result = await this.execute(query, [codigo]);
      return result?.rowsAffected === 1;
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      throw error;
    }
  }
}
