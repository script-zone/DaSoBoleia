const resources = {
  utente: [{
    codigo: 1,
    nome: "John",
    sobrenome: "Doe",
    username: 'john_doe',
    email: 'johndoe@gmail.com',
    senha: "$2b$08$YWor0zOLDfWoqAaLrkiyUu4dVUPmt0JoHs.uv3bsPOOusudXRIyUi",
    data_nascimento: "1999/02/26",
    categoria: 'Aluno',
    n_identificacao: 'LA20395840494039',
    tipo_utente: 'Passageiro',
    saldo: 5094,
    estado: 1,
  }]
};

export const repositoryFake = (resource: keyof typeof resources) => {
  return {
    findOne: (params: Partial<typeof resources[typeof resource][0]>) => {
      const foundData = resources[resource].find((item) => {
        return Object.keys(params).every((key) => item[key] === params[key]);
      });

      return foundData;
    },
    create: (params: any) => {
      resources[resource].push(params);
      return params;
    }
  };
};
