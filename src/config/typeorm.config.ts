import { DataSource, DataSourceOptions } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigValidationService } from './config-validation.service';
import { appConfig } from './app.config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import 'dotenv/config';

const envKeys = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

export const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dropSchema: process.env.DB_DROP_SCHEMA === 'true',
  connectionLimit: Number(process.env.CONNECTION_LIMIT ?? 50),
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.dbName,
  synchronize: false,
  entities: ['dist/typeorm/entities/*.entity.js'],
  logging: !appConfig.isProdEnv,
  migrations: ['dist/typeorm/migrations/*.js'],
  migrationsTableName: 'migrations',
  extra: {
    connectionLimit: dbConfig.connectionLimit,
  },
};

export const dataSource = new DataSource(dataSourceOptions);

@Injectable()
export class DBConfigValidationService extends ConfigValidationService {
  constructor(private readonly dataSource: DataSource) {
    super(envKeys, 'db-config');
  }
  validateDatabaseConnection() {
    const isDataSourceInitialized = this.dataSource.isInitialized;
    let message = '!! Database connected successfully !!';
    if (!isDataSourceInitialized) {
      message = 'Database Connection Error!';
      throw new InternalServerErrorException(message);
    }
    this.logMessage(message);
  }
}

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor() {}
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(`Connecting to the database... ${dbConfig.dbName}`);
    return dataSourceOptions;
  }
}
