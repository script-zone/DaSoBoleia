import { z } from "zod"
import { NextFunction, Request, Response } from "express"

export const validationMiddleware = (zodSchema: z.ZodObject<any>) =>
  (request: Request, _: Response, next: NextFunction) => {
    zodSchema.parse(request.body)
    next()
  }
