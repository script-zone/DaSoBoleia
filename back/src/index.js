const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function fun () {
  let data;
  let con;
  try{
    con = await oracledb.getConnection({
      user : '"scriptZone"',
      password : "123",
      connectString : "localhost:1521",
    });
    data = await con.execute(
      `SELECT * FROM Utente`
    );
  } catch (err) {
    console.error("\nErro!!!\nTabela Não Existe!!!\nScript Zone AKA Aqui, é Só Sucessos Sucessivos!!!");
  }
    console.log(data.rows);

}

fun();

//console.log(fun());