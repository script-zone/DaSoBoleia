import BaseRepositorio from "./base-repositorio";

interface UserProps {
  name: string
}

export class BoleiaRepositorio extends BaseRepositorio<UserProps> {

  constructor() {
    super('boleia')
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

}