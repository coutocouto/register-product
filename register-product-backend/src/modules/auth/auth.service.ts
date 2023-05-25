import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SingInDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

export interface singInReturn {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private user: { id: number; email: string; password: string } = {
    id: 1,
    email: 'felipe.couto@claranet.com',
    password: '@claranet',
  };

  async signIn({ email, password }: SingInDto): Promise<singInReturn> {
    if (this.user.email !== email || this.user.password !== password) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { email: email, sub: this.user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
