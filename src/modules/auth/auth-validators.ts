import { z } from "zod";

import { dbLocalGetUserByEmail } from "../../infra/db/local";
import { UtenteRepositorio } from "../../infra/db/oracle/utente-repositorio";

function isValidBirthDate(value: string) {
  const currentDate = new Date();
  const birthDate = new Date(value);

  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getAdjustedDate = (date: Date, years: number) => {
    const adjustedDate = new Date(date);
    const fullYear = adjustedDate.getFullYear()
    adjustedDate.setFullYear(fullYear - years);
    if (!isLeapYear(fullYear)) adjustedDate.setFullYear(fullYear - 1);
    return adjustedDate;
  };

  const minDate = getAdjustedDate(currentDate, 90);
  const maxDate = getAdjustedDate(currentDate, 17);

  return birthDate >= minDate && birthDate <= maxDate;
}

export const UserSchema = z.object({
  codigo: z.string().optional(),
  nome: z.string().refine((value) => {
    const fullNameRegex = /^[a-zA-ZÀ-ÿ']{2,}$/;
    return fullNameRegex.test(value);
  }, "O nome conter pelo menos dois caracteres cada sem símbolos especiais ou números."),
  sobrenome: z.string().refine((value) => {
    const fullNameRegex = /^[a-zA-ZÀ-ÿ']{2,}$/;
    return fullNameRegex.test(value);
  }, "O sobrenome conter pelo menos dois caracteres cada sem símbolos especiais ou números."),
  username: z
    .string()
    .nonempty("Nome de utilizador é indispensável!"),
  curso: z.string().optional(),
  email: z
    .string()
    .email("Email inválido!")
    .nonempty("Email é Obrigatório!"),
  data_nascimento:  z.string().optional(),

  categoria: z.enum(["Aluno", "Funcionario", "Docente"]).default("Aluno"),

  n_identificacao: z
    .string()
    .nonempty("Número de identificação é obrigatório!")
    /*.refine(n_identificacao => !(new UtenteRepositorio().existUser({n_identificacao: n_identificacao})), {
      message: "Numero de identificação já existe!",
    })*/,

  tipo_utente: z.enum(["Passageiro", "Condutor"]).default("Passageiro"),
  saldo: z.number().default(0),
  estado: z.enum(["Off", "On"]).default("On"),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Email inválido!").nonempty("Por favor forneça o seu email!"),
  senha: z.string().nonempty("Por favor forneça o sua senha!"),
});
