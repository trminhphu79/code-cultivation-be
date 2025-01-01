import { Configuration } from './config.model';

export const Configurations = (): Configuration => ({
  port: parseInt(process.env['POSTGRES_PORT'] as string) || 3000,
  nodeEnv: process.env['NODE_ENV'],
  saltRounds: parseInt(process.env['SALT_ROUNDS'] as string) || 10,
  jwtSecretKey: process.env['JWT_SECRET_KEY'],
  jwtPrivateKey: process.env['JWT_PRIVATE_KEY'],
  github: {
    client_id: process.env['GITHUB_CLIENT_ID'],
    client_secret: process.env['GITHUB_CLIENT_SECRET'],
    url: process.env['GITHUB_AUTHORIZE_URL'],
    userInfoUrl: process.env['GITHUB_USER_INFO_URL'],
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
  },
  database: {
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] as string) || 5432,
    username: process.env['POSTGRES_USERNAME'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    dialect: 'postgres',
  },
  microservice: {
    natsUrl: process.env['NATS_URL'],
    natsPort: parseInt(process.env['NATS_PORT'] as string) || 4222,
    natsInterPort: parseInt(process.env['NATS_INTER_PORT'] as string) || 8222,
  },
});
