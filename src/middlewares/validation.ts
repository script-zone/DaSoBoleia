import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { UtenteRepositorio } from "../infra/db/oracle/utente-repositorio";
import { UnauthorizedError } from "../middlewares/global-error-handler";

export const validationsignupMiddleware = (zodSchema: z.ZodObject<any>) =>
  async (request: Request, _: Response, next: NextFunction) => {
    zodSchema.parse(request.body);
    if(await new UtenteRepositorio().existUser({username: request.body.username})){
      throw new UnauthorizedError('Username já existe, coloque outro!');}
    if(await new UtenteRepositorio().existUser({email: request.body.email}))
      throw new UnauthorizedError('Email já existe, coloque outro!');
    if(await new UtenteRepositorio().existUser({n_identificacao: request.body.n_identificacao}))
      throw new UnauthorizedError('Número de identificação já existe, coloque outro!');
    next()
  }

export const validationloginMiddleware = (zodSchema: z.ZodObject<any>) =>
  async (request: Request, _: Response, next: NextFunction) => {
    zodSchema.parse(request.body);
    next()
  }