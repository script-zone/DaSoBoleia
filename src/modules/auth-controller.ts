import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import z from 'zod'

import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { BadRequestError } from "../middlewares/global-error-handler";
import { Controller } from "../core/controller";
import { ok } from "./generic-controller";

const UserSchema = z.object({
  codigo: z.string().optional(),
  nome: z.string(),
  sobrenome: z.string(),
  username: z.string(),
  email: z.string().email('Email inválido!'),
  senha: z.string().regex(/(?=.*[}{,.!#@'="«»ª+*%^?~=+\-_/*\-+.|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/),
  data_nascimento: z.date(),
  categoria: z.enum(['Aluno', 'Funcionario', 'Docente']),
  n_identificacao: z.string(),
  tipo_utente: z.enum(['Passageiro', 'Condutor']),
  saldo: z.number(),
  estado: z.enum(['0', '1']),
});

type User = z.infer<typeof UserSchema>

export class AuthController implements Controller {
  public path = '/auth'
  public router = Router()
  protected repository = new BaseRepository<User>('UTENTE')

  private async encrypt(text: string, salt= 8) {
    const hash = await bcrypt.hash(text, salt)
    return hash
  }

  private async compare(text: string, hash: string) {
    const isMatch = await bcrypt.compare(text, hash)
    return isMatch
  }

  private generateToken = (id: string) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  private async signup(request: Request, response: Response) {
    const user = request.body as User
    
    const senha =  await this.encrypt(user.senha)
    const newUser = this.repository.create({
      ...user,
      senha
    })

    return ok(response, newUser)
  }

  private async login(request: Request, response: Response) {
    const { email, password } = request.body
    
    if (!email || !password) throw new BadRequestError('Por favor forneça o seu email e password')
    const user = await this.repository.findOne({ email })
    
    if (!user || !(await this.compare(password, user.senha))) {
      throw new BadRequestError('Email ou senha incorrectos!')
    }

    return ok(response, {
      token: this.generateToken(user?.codigo as string),
      user
    })
  }

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
  }
}
