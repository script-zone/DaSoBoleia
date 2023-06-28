import { z } from "zod";

import { repositoryFake } from "./local-database";
import { propDel } from "../../../helpers/prop-del";
import { UserSchema } from "../../../modules/auth/auth-validators";

export const dbLocalAddAccount = (newUser: z.infer<typeof UserSchema>) => {
  if (newUser.categoria === 'Aluno') {
    repositoryFake('aluno').create({ 
      curso: newUser.curso
    })
  }
  
  const names = newUser.nome.split(' ')
  newUser.nome = names[0]
  newUser.sobrenome = names[names.length-1]
  const userCreated = repositoryFake('utente').create(newUser)

  const sanitizedUser = propDel(userCreated, ["senha"]);
  return sanitizedUser
}

export const dbLocalGetUserByEmail = (email: string): z.infer<typeof UserSchema> =>
  repositoryFake('utente').findOne({ email })

export const dbLocalGetUserByIdentification = (n_identificacao: string): z.infer<typeof UserSchema> =>
  repositoryFake('utente').findOne({ n_identificacao })
