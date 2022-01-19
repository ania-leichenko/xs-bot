import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  ADDRESS,
  DATABASE_URL,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
    SERVER_ADDRESS: ADDRESS ?? 'http://localhost',
  },
  DB: {
    CONNECTION_STRING: DATABASE_URL,
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    DIALECT: DB_DIALECT,
  },
  API: {
    V1_PREFIX: '/api/v1/',
  },
};

export { ENV };
