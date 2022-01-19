import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST ?? 'http://localhost',
  },
  DB: {
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_DATABASE,
    HOST: DB_HOST,
    PORT: Number(DB_PORT),
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    DIALECT: DB_DIALECT,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
};

export { ENV };
