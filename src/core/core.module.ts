import { Module, NestModule } from '@nestjs/common';
import {
  AppConfigValidationService,
  DBConfigValidationService,
  TypeOrmService,
} from 'src/config';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConnnectModule } from 'src/connect/connect.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: false,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
            messageFormat: '{req.headers.x-correlation-id} [{context}] {msg}',
            ignore: 'pid,hostname,res,context,req',
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    AuthModule,
    ConnnectModule,
  ],
  providers: [AppConfigValidationService, DBConfigValidationService],
})
export class CoreModule implements NestModule {
  constructor(
    private readonly appConfigValidationService: AppConfigValidationService,
    private readonly dbConfigValidationService: DBConfigValidationService,
  ) {}

  onApplicationBootstrap() {
    this.appConfigValidationService.validateConfigKeys();
    this.dbConfigValidationService.validateConfigKeys();
    this.dbConfigValidationService.validateDatabaseConnection();
  }

  configure() {}
}
