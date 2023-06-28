import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { NotFoundError, UnauthorizedError } from "./global-error-handler";
import { repositoryFake } from "../infra/db/local/local-database";

export const authMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  const token = request?.headers?.authorization
  if (!token) throw new UnauthorizedError('Token não fornecido!')

  const isValidToken = token?.startsWith('Bearer ')
  if (!isValidToken) throw new UnauthorizedError('O seu token esta mal formatado!')

  const tokenValue = token.split(' ')[1]

  try {
    const userPayload = jwt.verify(tokenValue, `${process.env.JWT_SECRET}`) as { id: string }
    const foundUser = repositoryFake('utente').findOne({ codigo: +userPayload.id })
    if (!foundUser) throw new NotFoundError("Usuario não encontrado!")

    next();
  } catch (error) {
    const errorMap = {
      TokenExpiredError: 'O seu token expirou!',
      NotBeforeError: 'O seu token ainda não é valido!',
      JsonWebTokenError: 'O seu token!'
    };

    if (error instanceof jwt.JsonWebTokenError) {
      const errorMessage = errorMap[error.constructor.name] || 'Alguma coisa deu errado ao processar o token!';
      throw new UnauthorizedError(errorMessage);
    }
  }
};
