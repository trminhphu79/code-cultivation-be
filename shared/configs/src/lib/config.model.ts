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

export type Configuration = {
  port: number | undefined;
  nodeEnv: string | undefined;
  saltRounds: number | undefined;
  database: DatabaseConfig;
  microservice: NatsMicroserviceConfig;
  jwtSecretKey: string | undefined;
  jwtPrivateKey: string | undefined;
};
