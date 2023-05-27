import * as dotenv from 'dotenv'
import { cleanEnv, str, port } from 'envalid';

import { App } from './app';

import { UtenteController } from './modulos/utente-controller';
import { ViaturaController } from './modulos/viatura-controller';
import { BoleiaController } from './modulos/boleia-controller'
import { InscricaoController } from './modulos/inscricao-controller';
import { LocalController } from './modulos/local-controller';
import { TransacaoController } from './modulos/transacao-controller';

dotenv.config()
cleanEnv(process.env, {
  ORACLE_PASSWORD: str(),
  ORACLE_HOST: str(),
  ORACLE_USER: str(),
  PORT: port(),
});

const app = new App([
  new ViaturaController(),
  new UtenteController(),
  new BoleiaController(),
  new InscricaoController(),
  new LocalController(),
  new TransacaoController(),
])

app.run()
