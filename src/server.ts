import * as dotenv from 'dotenv'
import { cleanEnv, str, port } from 'envalid';

import { App } from './app';

import { UtenteController } from './modules/utente-controller';
import { ViaturaController } from './modules/viatura-controller';
import { BoleiaController } from './modules/boleia-controller'
import { InscricaoController } from './modules/inscricao-controller';
import { LocalController } from './modules/local-controller';
import { TransacaoController } from './modules/transacao-controller';
import { AlunoController } from './modules/aluno-controller';

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
  new AlunoController(),
])

app.run()
