import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add User' })
  async addUser(@Body() req: AuthDto) {
    return await this.authService.addUser(req);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add User' })
  async loginUser(@Body() req: AuthDto) {
    return await this.authService.loginUser(req);
  }
}
