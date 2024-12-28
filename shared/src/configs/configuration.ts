import { Configuration } from './config.model';

export const Configurations = (): Configuration => ({
  port: parseInt(process.env['POSTGRES_PORT'] as string) || 3000,
  nodeEnv: process.env['NODE_ENV'],
  database: {
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT'] as string) || 5432,
    username: process.env['POSTGRES_USERNAME'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    dialect: 'postgres'
  },
  microservice: {
    natsUrl: process.env['NATS_URL'],
    natsPort: parseInt(process.env['NATS_PORT'] as string) || 4222,
    natsInterPort: parseInt(process.env['NATS_INTER_PORT'] as string) || 8222,
  },
});
