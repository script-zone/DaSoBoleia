import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  readonly statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401)
  }
}

export function globalErrorHandler(
  error: Error & Partial<ApiError>,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const status = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Erro interno do servidor!'
  console.log(error)
  response.status(status).send({ message })
}
