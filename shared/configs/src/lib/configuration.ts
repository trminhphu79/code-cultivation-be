import { Configuration } from './config.model';

export const Configurations = (): Configuration => ({
  port: parseInt(process.env['POSTGRES_PORT'] as string) || 3000,
  nodeEnv: process.env['NODE_ENV'],
  saltRounds: parseInt(process.env['SALT_ROUNDS'] as string) || 10,
  verifyRedirect: process.env['VERIFY_EMAIL_REDIRECT'],
  github: {
    client_id: process.env['GITHUB_CLIENT_ID'],
    client_secret: process.env['GITHUB_CLIENT_SECRET'],
    url: process.env['GITHUB_AUTHORIZE_URL'],
    userInfoUrl: process.env['GITHUB_USER_INFO_URL'],
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
  },
  mailer: {
    host: process.env['MAIL_HOST'],
    port: parseInt(process.env['MAIL_PORT'] as string) || 10,
    pass: process.env['MAIL_PASS'],
    user: process.env['MAIL_USER'],
    from: process.env['MAIL_FROM'],
  },
  database: {
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] as string) || 5432,
    username: process.env['POSTGRES_USERNAME'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    dialect: 'postgres',
    maxPool: parseInt(process.env['POSTGRES_MAX_POOL'] as string) || 10,
    minPool: parseInt(process.env['POSTGRES_MIN_POOL'] as string) || 1,
    idleTimeout: parseInt(process.env['POSTGRES_IDLE_TIMEOUT'] as string) || 60000,
    acquireTimeout: parseInt(process.env['POSTGRES_ACQUIRE_TIMEOUT'] as string) || 30000,
  },
  microservice: {
    natsUrl: process.env['NATS_URL'],
    natsPort: parseInt(process.env['NATS_PORT'] as string) || 4222,
    natsInterPort: parseInt(process.env['NATS_INTER_PORT'] as string) || 8222,
  },
  jwt: {
    secret: process.env['JWT_SECRET_KEY'],
    privateKey: process.env['JWT_PRIVATE_KEY'],
    algorithm: process.env['JWT_ALGORITHM'],
    accessExpiry: process.env['JWT_ACCESS_TOKEN_EXPIRY'],
    refreshExpiry: process.env['JWT_REFRESH_TOKEN_EXPIRY'],
  },
});
