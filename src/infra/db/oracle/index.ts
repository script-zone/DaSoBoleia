import oracledb from 'oracledb';

export function connectOracleDB() {
  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
  const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_HOST } = process.env
  
  return oracledb.getConnection({
    user: ORACLE_USER,
    password: ORACLE_PASSWORD,
    connectString: ORACLE_HOST
  });
}
