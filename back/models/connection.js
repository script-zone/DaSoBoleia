const oracledb = require('oracledb');
require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connection = oracledb.getConnection({
  user : `"${process.env.ORACLE_USER}"`,
  password : process.env.ORACLE_PASSWORD,
  connectString : process.env.ORACLE_HOST
});

`const connection2 = oracledb.createPool({});`

module.exports = {
  connection
};