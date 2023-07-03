import * as dotenv from 'dotenv'
import { cleanEnv, str, port } from 'envalid';

import { App } from './app';

import { UtenteController } from './modules/utente-controller';
import { ViaturaController } from './modules/viatura-controller';
import { BoleiaController } from './modules/boleia-controller'
import { AlunoController } from './modules/aluno-controller';
import { AuthController } from './modules/auth/auth-controller';

dotenv.config()
cleanEnv(process.env, {
  ORACLE_PASSWORD: str(),
  ORACLE_HOST: str(),
  ORACLE_USER: str(),
  JWT_SECRET: str(),
  PORT: port(),
});

const app = new App([
  new ViaturaController(),
  new UtenteController(),
  new BoleiaController(),
  new AlunoController(),
  new AuthController()
])

app.run()
