import oracledb, { Connection, ExecuteOptions, BindParameters } from 'oracledb';

export default abstract class BaseRepository<T> {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  protected async getConnection(): Promise<Connection> {
    return oracledb.getConnection();
  }

  protected async execute(sql: string, bindParams?: BindParameters, options?: ExecuteOptions) {
    const connection = await this.getConnection();
    const result = await connection.execute(sql, bindParams as any, options as any);
    await connection.close();
    return result;
  }
/*
  protected async insertOne(data: Partial<T>): Promise<T> {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const bindParams = values.map((value, index) => ({
      name: `val${index}`,
      type: oracledb.STRING,
      val: value,
    }));

    const placeholders = bindParams.map((param) => `:${param.name}`).join(', ');
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING * INTO :out`;

    const options: ExecuteOptions = {
      autoCommit: true,
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

  public async all(): Promise<T[] | null> {
    const sql = `SELECT * FROM ${this.table}`;
    const records = (await this.execute(sql))?.rows
    return records as T[]
  }
}
