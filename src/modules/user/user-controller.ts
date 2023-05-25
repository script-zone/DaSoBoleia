import { Router, Request, Response, NextFunction } from "express";

import { UserRepository } from "../../infra/db/oracle/repositories/user-repository";
import { Controller } from "../../core/controller";

export class UserController implements Controller {
  public path = '/user'
  public router = Router()
  public userRepository = new UserRepository()

  constructor() {
    this.initializeRoutes()
  }

  private async getUsers(_: Request, response: Response, __: NextFunction) {
    const allUsers = await this.userRepository.all()
    return response.status(200).json(allUsers);
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.getUsers)
  }
}
