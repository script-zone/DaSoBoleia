import BaseRepositorio from "./base-repositorio";

interface UserProps {
  name: string
}

export class ViaturaRepositorio extends BaseRepositorio<UserProps> {

  constructor() {
    super('viatura')
  }

  public async adicionar(dados): Promise<any> {
    let resultado: any
    try{
    const conexao = await this.getConnection();
    resultado = await conexao.execute(`INSERT INTO ${this.table} (CODIGO, NOME, SOBRENOME, USERNAME, DATA_NASCIMENTO, SENHA, CATEGORIA, N_IDENTIFICACAO, TIPO_UTENTE, SALDO, ESTADO)
      VALUES(PROXIMO.Nextval, :nome, :sobrenome, :userName, TO_DATE(:DADOS, :FORMATO), :senha, :categoria, :n_identif, :tipo, :qtd, :estado)`,
      [dados.NOME, dados.SOBRENOME, dados.USERNAME, dados.DATA_NASCIMENTO.DADOS, dados.DATA_NASCIMENTO.FORMATO, dados.SENHA, dados.CATEGORIA, dados.N_IDENTIFICACAO, dados.TIPO_UTENTE, dados.SALDO, dados.ESTADO]
    );
    conexao.commit();
    }catch(err){
      console.error(err)
    }finally{
      return resultado;
    }
  }

/*
  public async acesso(dados): Promise<boolean> {
    const resultado = (await this.execute(`select username, senha from utente`));
    return us_me==dados.username?psw==dados.senha?true:false:false
  }
*/

}