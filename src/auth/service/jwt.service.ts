import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../interface/userPayload.interface';

@Injectable()
export class JwtAccess {
  constructor(private jwtService: JwtService) {}

  public generateAccessToken(payload: UserPayload): string {
    const accessTokenPayload = {
      userDetails: payload,
      tokenType: 'access',
    };
    return this.jwtService.sign(accessTokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
}
