import BaseRepositorio from "./base-repositorio";

interface UserProps {
  name: string
}

export class LocalRepositorio extends BaseRepositorio<UserProps> {

  constructor() {
    super('Loccal')
  }

  public async adicionar(dados: any): Promise<any> {
    let resultado: any;
    try{
      resultado = await this.execute(`INSERT INTO ${this.table} (CODIGO, NOME, LATITUDE, LONGITUDE)
      VALUES(${4}, :nome, :latitude, :longitude)`,
      [dados.nome, dados.latitude, dados.longitude]);
    }catch(err){
      console.error(err);
    }finally{
      return resultado;
    }
  }

}