import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, singInReturn } from './auth.service';
import { SingInDto } from './dto/login-user.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signInDto: SingInDto): Promise<singInReturn> {
    return await this.authService.signIn(signInDto);
  }
}
