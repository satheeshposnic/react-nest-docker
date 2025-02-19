import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (!username || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // In a real application, here you'd query the database or another service
    if (username === 'admin' && password === 'admin') {
      return { username: 'admin' };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
