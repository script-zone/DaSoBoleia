import { NextFunction, Request, Response } from "express";
import { HttpException } from '../core/exceptions/http-exception'

export function globalErrorHandler(error: HttpException, _: Request, response: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'Algo está errado'
  response.status(status).send({ status, message })
}
