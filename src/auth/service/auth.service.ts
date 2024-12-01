import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthRepo } from '../repository';
import { HashService } from './hash.service';
import { JwtAccess } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private hashService: HashService,
    private jwtAccess: JwtAccess,
  ) {}

  async addUser(req: AuthDto) {
    const encryptPassword = await this.hashService.hashPassword(req.password);
    req.password = encryptPassword;
    const data = await this.authRepo.creatEntity(req);
    const payload = {
      username: req.userName,
      id: data.id,
    };
    return { token: this.jwtAccess.generateAccessToken(payload) };
  }

  async loginUser(req: AuthDto) {
    const user = await this.authRepo.validateUser(req);
    const isValid = await this.hashService.comparePassword(
      req.password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException(
        'Either username or password is incorrect',
      );
    }
    const payload = {
      username: req.userName,
      id: isValid.id,
    };
    return { token: this.jwtAccess.generateAccessToken(payload) };
  }
}
