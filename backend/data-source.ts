import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), './.env') });
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './src/entities';
import { migrations } from './src/migration/index';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: +process.env.DB_POSTGRES_PORT,
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: entities,
  migrations: migrations,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
