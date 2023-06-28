export const resources = {
  aluno: [{
    id: 1,
    curso: 'Ciência da computação'
  }],
  utente: [{
    codigo: 1,
    nome: "John",
    sobrenome: "Doe",
    username: 'john_doe',
    email: 'johndoe@gmail.com',
    senha: "$2b$08$YWor0zOLDfWoqAaLrkiyUu4dVUPmt0JoHs.uv3bsPOOusudXRIyUi",
    data_nascimento: "1999/02/26",
    categoria: 'aluno',
    n_identificacao: 'LA20395840494039',
    tipo_utente: 'Passageiro',
    saldo: 5094,
    estado: 1,
  }],
  boleia: [{
    cod_utente: 1,
    custo: 500.00,
    dia: '2013-03-10T02:00:00Z',
    tipo: 'Unica',
    origem: 'são paulo',
    destino: 'Morrubento',
    diaTermino: "2013-03-10T02:00:00Z",
  }]
};

export const repositoryFake = <T extends keyof typeof resources>(resource: T) => {
  return {
    findOne: (params: Partial<typeof resources[typeof resource][0]>) => {
      const foundData = (resources[resource] as []).find((item) => {
        return Object.keys(params).every((key) => item[key] === params[key]);
      });

      return foundData;
    },
    create: (params: any) => {
      resources[resource].push(params);
      return params;
    }
  };
}

console.log(repositoryFake('boleia').findOne({ cod_utente: 1 }))
