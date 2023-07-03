import { Request, Response, Router } from "express";

import { bcryptCompareAdapter, bcryptHashAdapter, createTokenJWTAdapter } from "../../infra/db/cryptography";
import { dbLocalAddAccount, dbLocalGetUserByEmail } from "../../infra/db/local/repositories";
import { BadRequestError } from "../../middlewares/global-error-handler";
import { UtenteRepositorio } from "../../infra/db/oracle/utente-repositorio";
import { validationloginMiddleware, validationsignupMiddleware } from "../../middlewares/validation";
import { LoginSchema, User, UserSchema } from "./auth-validators";


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
    const createdUser = await new UtenteRepositorio().signup({ ...user, senha: `${hashedPassword}` });
    const auxUser = Object.entries({...createdUser})
    const token = this._createTokenCreator({ codigo: auxUser[0][1] });
    return response.status(201).json({ codigo: auxUser[0][1], token });
  }

  private login = async (request: Request, response: Response) => {
    const { email, senha } = request.body;
    const user = await new UtenteRepositorio().login(`'${email}'`);
    const auxUser = Object.entries({...user});
    console.log(senha, String(auxUser[5][1]))
    if (!user || !(await this._encrypterCompare(`${senha}`, String(auxUser[5][1])))) {
      throw new BadRequestError("email ou senha incorretos!");
    }
    const codigo = auxUser[0][1]
    const token = this._createTokenCreator({ codigo });
    return response.status(200).json({
      codigo,
      token
    });
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationloginMiddleware(LoginSchema),
      this.login
    );

    this.router.post(
      `${this.path}/signup`,
      validationsignupMiddleware(UserSchema),
      this.signup
    );
  }
}
