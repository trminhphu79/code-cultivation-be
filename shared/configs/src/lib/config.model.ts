import { Dialect } from 'sequelize';

export type DatabaseConfig = {
  port: number | undefined;
  host: string | undefined;
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  dialect: Dialect;
};

export type NatsMicroserviceConfig = {
  natsUrl: string | undefined;
  natsPort: number;
  natsInterPort: number;
};

export type GitHubConfig = {
  client_id: string | undefined;
  client_secret: string | undefined;
  url: string | undefined;
};

export type Configuration = {
  port: number | undefined;
  nodeEnv: string | undefined;
  database: DatabaseConfig;
  saltRounds: number | undefined;
  microservice: NatsMicroserviceConfig;
  jwtSecretKey: string | undefined;
  jwtPrivateKey: string | undefined;
  github: GitHubConfig;
};
