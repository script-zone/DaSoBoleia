const con = require('./connection');
const oracledb = require('oracledb');

const todosUtentes = async () => {

  //let allUsers;
  try{
    const conexao  = await con.connection;
    let utentes = await conexao.execute(`select * from Utente`
    );
  return  utentes;
  }catch (err){
    console.error(err);
  }
    return null;
};

const nomeUtente = async () => {

  let user;
  try{
    const conexao  = await con.connection;
    let utente = await conexao.execute(
      `
        Begin
          select nome into :nome from Utente where codigo = :id;
        End;
      `,
      {
        id: 3,
        nome: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
      }
    );
  return  utente.outBinds;
  }catch (err){
    console.error(err);
  }
    return null;
};

module.exports = {
    todosUtentes,
    nomeUtente,
}