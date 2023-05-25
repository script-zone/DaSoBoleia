import * as dotenv from 'dotenv'
import { cleanEnv, str, port } from 'envalid';

import { App } from './app';

import { UserController } from './modules/user/user-controller';

dotenv.config()
cleanEnv(process.env, {
  ORACLE_PASSWORD: str(),
  ORACLE_HOST: str(),
  ORACLE_USER: str(),
  PORT: port(),
});

const app = new App([
  new UserController()
])

app.run()
