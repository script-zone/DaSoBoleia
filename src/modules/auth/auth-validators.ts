import { z } from "zod";

import { dbLocalGetUserByEmail } from "../../infra/db/local";

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
    const fullNameRegex = /^[a-zA-ZÀ-ÿ']{2,}( [a-zA-ZÀ-ÿ']{2,})+$/;
    return fullNameRegex.test(value);
  }, "O nome conter no mínimo dois nomes com pelo menos dois caracteres cada, separados por espaços e sem símbolos especiais ou números."),
  sobrenome: z.string().optional(),
  username: z.string(),
  curso: z.string().optional(),
  email: z
    .string()
    .email("Email inválido!")
    .refine(email => !(dbLocalGetUserByEmail(email)), { message: "Email já existe!" }),
  senha: z.string(),
  data_nascimento:  z.string().optional(),

  categoria: z.enum(["Aluno", "Funcionario", "Docente"]).default("Aluno"),

  n_identificacao: z
    .string()
    .refine(n_identificacao => !dbLocalGetUserByEmail(n_identificacao), {
      message: "Numero de identificação já existe!",
    }),

  tipo_utente: z.enum(["Passageiro", "Condutor"]).default("Passageiro"),
  saldo: z.number().default(0),
  estado: z.enum(["0", "1"]).default("1"),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Email inválido!").nonempty("Por favor forneça o seu email!"),
  senha: z.string().nonempty("Por favor forneça o sua senha!"),
});
