import oracledb, { Connection } from 'oracledb';
import { connectOracleDB } from '.';

export class BaseRepository<T extends {} = any> {
  protected table: string;
  private connection: Connection | undefined;

  constructor(table: string) {
    this.table = table;
  }

  public async getConnection(): Promise<Connection> {
    return connectOracleDB();
  }
/*
  async connect(conn: Connection | undefined) {
      
    this.connection = await this.getConnection();
      
  }

  async disconnect() {
    this.connection = undefined;
  }
*/
  public async execute(sql: string, bindParams: any[] = []) {
  
    let resultado: any;
    try{
      this.connection = await this.getConnection()
    resultado = await this.connection.execute(sql,bindParams);
    this.connection.close();
    }catch(err){
      console.error(err)
    }finally{
      return resultado;
    }
  }

  private checkAndReturn(result: any): T[] | null {
    if (result?.rows || result?.rows instanceof Array) 
      return result.rows.length==1 ?
        result.rows[0] : result.rows;
    
    return null;
  }

  public async getAluno(): Promise<any | null>  {
    
      const resultado = await this.execute(`select * from aluno`);
      return this.checkAndReturn(resultado);
  }

  async create(data: T): Promise<T | null> {
    try {
      const columns = Object.keys(data).join(', ');
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `:${index + 1}`).join(', ');

      const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`;
      const result = await this.connection?.execute(query, values);

      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao criar registro:', error);
      throw error;
    }
  }

  public async getAll(page = 1, limit = 10, filters: Record<string, any> = {}): Promise<T[] | null> {
    try {
      const offset = (page - 1) * limit;
      const filterConditions = Object.entries(filters).map(([key,]) => `${key} = :${key}`);
      const filterParams = Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, value]));

      const query = `
        SELECT *
        FROM ${this.table}
        ${filterConditions.length ? 'WHERE ' + filterConditions.join(' AND ') : ''}
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `;

      const result = await this.connection?.execute(query, { offset, limit, ...filterParams });
      return this.checkAndReturn(result);
    } catch (error) {
      console.error('Erro ao buscar os registros:', error);
      throw error;
    }
  }

  public async findOne(filters: Record<string, any>): Promise<T | null> {
    try {
      const filterConditions = Object.entries(filters).map(([key, _value]) => `${key} = :${key}`);
      const filterParams = Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, value]));
      
      const query = `
        SELECT *
        FROM ${this.table}
        ${filterConditions.length ? 'WHERE ' + filterConditions.join(' AND ') : ''}
      `;
      const result = await this.connection?.execute<T>(query, { ...filterParams }, { maxRows: 1 });
      return this.checkAndReturn(result)?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar registro por ID:', error);
      throw error;
    }
  }

  async updateById(id: string, data: T): Promise<boolean> {
    try {
      const columns = Object.keys(data).map((key, index) => `${key} = :${index + 1}`).join(', ');
      const values = Object.values(data);
      values.push(id);

      const query = `UPDATE ${this.table} SET ${columns} WHERE id = :${values.length}`;
      const result = await this.connection?.execute(query, values);

      return result?.rowsAffected === 1;
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      throw error;
    }
  }

  public async removeById(id: string): Promise<boolean> {
    try {
      const query = `DELETE FROM ${this.table} WHERE id = :id`;
      const result = await this.connection?.execute(query, [id]);
      return result?.rowsAffected === 1;
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      throw error;
    }
  }
}
