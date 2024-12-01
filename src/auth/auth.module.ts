import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService, HashService, JwtAccess } from './service';
import { AuthRepo } from './repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stratergy';

@Module({
  imports: [
    JwtModule.register({
      verifyOptions: {
        algorithms: ['HS256'],
        complete: true,
      },
      signOptions: {
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [
    AuthService,
    AuthRepo,
    HashService,
    JwtAccess,
    JwtService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
