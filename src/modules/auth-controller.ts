import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import z from 'zod'

// import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { Controller } from "../core/controller";
import { ok } from "./generic-controller";
import { BadRequestError } from "../middlewares/global-error-handler";
import { propDel } from "../helpers/prop-del";
import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { repositoryFake } from "../infra/db/local-database";


const UserSchema = z.object({
  codigo: z.string().optional(),
  nome: z.string(),
  sobrenome: z.string(),
  username: z.string(),
  email: z.string().email('Email inválido!')
    .refine((email) => {
      const existingUser = repositoryFake('utente').findOne({ email });
      return !existingUser;
    }, { message: 'Email já existe!' }),
  
  senha: z.string(),
  data_nascimento: z.string(),
  categoria: z.enum(['aluno', 'funcionario', 'docente']).default('aluno'),
  
  n_identificacao: z.string().refine((n_identificacao) => {
    const existingUser = repositoryFake('utente').findOne({ n_identificacao });
    return !existingUser;
  }, { message: 'Numero de identificação já existe!' }),
  
  tipo_utente: z.enum(['Passageiro', 'Condutor']).default('Passageiro'),
  saldo: z.number().default(0),
  estado: z.enum(['0', '1']).default('1'),
});


type User = z.infer<typeof UserSchema>

export class AuthController implements Controller {
  public path = '/auth'
  public router = Router()
  protected repository = BaseRepository

  constructor() {
    this.initializeRoutes()
  }

  private async signup(request: Request, response: Response) {
    const user = UserSchema.parse(request.body)
    const senha = await bcrypt.hash(user.senha, 8)
    const newUser = repositoryFake('utente').create({
      ...user,
      senha
    })
    return ok(response, newUser)
  }

  private async login(request: Request, response: Response) {
    const { email, senha } = request.body

    if (!email || !senha) throw new BadRequestError('Por favor forneça o seu email e password')
    const user = repositoryFake('utente').findOne({ email })

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new BadRequestError('Email ou senha incorrectos!')
    }

    const token = jwt.sign({ id: user.codigo }, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const userSanitized = propDel(user, ['senha'])

    return ok(response, {
      token,
      user: userSanitized
    })
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login)
    this.router.post(`${this.path}/signup`, this.signup)
  }
}
