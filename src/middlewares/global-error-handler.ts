import { NextFunction, Request, Response } from "express";
import { HttpException } from '../core/exceptions/http-exception'

export function globalErrorHandler(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'Erro interno do servidor!'
  response.status(status).send({ status, message })
}
