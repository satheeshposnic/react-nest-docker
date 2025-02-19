import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LoginDto {
  @IsString()
  @Type(() => String) // Make sure to transform the value properly
  username: string;

  @IsString()
  @Type(() => String) // Ensure this is a string type
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to get JWT token' })
  @ApiBody({
    description: 'User credentials to login',
    type: LoginDto,  // Document the request body as LoginDto
    examples: {
      'application/json': {
        value: { 
          username: 'admin', 
          password: 'admin' 
        },  // Example JSON request body that will be pre-filled in Swagger UI
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful and JWT token is returned',
    schema: {
      example: {
        access_token: 'your-jwt-token',  // Example response
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() body: LoginDto) {
    if (!body.username || !body.password) {
      throw new Error('Username and password are required');
    }
    return this.authService.login(body.username, body.password);
  }
}
