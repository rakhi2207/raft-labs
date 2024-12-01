import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { ConfigValidationService } from './config-validation.service';

const envKeys = [
  'NODE_ENV',
  'LOG_LEVEL',
  'PORT',
  'API_PREFIX',
  'ENABLE_SWAGGER',
];

export const appConfig = {
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  port: Number(process.env.PORT),
  apiPrefix: process.env.API_PREFIX,
  enableSwagger: process.env.ENABLE_SWAGGER.toLowerCase() === 'true',
  isProdEnv:
    process.env.NODE_ENV.toLowerCase() === 'prod' ||
    process.env.NODE_ENV.toLowerCase() === 'production',
};

@Injectable()
export class AppConfigValidationService extends ConfigValidationService {
  constructor() {
    super(envKeys, 'app-config');
  }
}
