import { Request, Response, Router } from "express";

import { bcryptCompareAdapter, bcryptHashAdapter, createTokenJWTAdapter } from "../../infra/db/cryptography";
import { dbLocalAddAccount, dbLocalGetUserByEmail } from "../../infra/db/local/repositories";
import { BadRequestError } from "../../middlewares/global-error-handler";
import { validationMiddleware } from "../../middlewares/validation";
import { LoginSchema, UserSchema } from "./auth-validators";


export class AuthController {
  public path = "/auth";
  public router = Router();

  constructor(
    private readonly _encrypterCompare = bcryptCompareAdapter,
    private readonly _encrypterHash = bcryptHashAdapter,

    private readonly _dbGetUserByEmail = dbLocalGetUserByEmail,
    private readonly _dbAddAccount = dbLocalAddAccount,

    private readonly _createTokenCreator = createTokenJWTAdapter,
  ) {
    this.initializeRoutes();
  }

  private signup = async (request: Request, response: Response) => {
    const user = request.body;
    const hashedPassword = await this._encrypterHash(user.senha);
    const createdUser = await this._dbAddAccount({ ...user, senha: hashedPassword });
    const token = this._createTokenCreator({ id: user.codigo });
    return response.status(201).json({ ...createdUser, token });
  }

  private login = async (request: Request, response: Response) => {
    const { email, senha } = request.body;
    const user = this._dbGetUserByEmail(email);
    if (!user || !(await this._encrypterCompare(senha, user.senha))) {
      throw new BadRequestError("Email ou senha incorretos!");
    }
    const token = this._createTokenCreator({ id: user.codigo });
    return response.status(200).json({
      ...user,
      token
    });
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginSchema),
      this.login
    );

    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(UserSchema),
      this.signup
    );
  }
}
