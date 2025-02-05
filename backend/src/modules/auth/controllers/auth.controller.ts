import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegsiterDto } from '../dtos/register.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { AuthEntity } from '../entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() data: LoginDto): Promise<AuthEntity> {
    console.log(data)
    console.log("____________________________")
    return this.authService.login(data);
  }

  @Post('/register')
  async register(@Body() data: RegsiterDto): Promise<AuthEntity> {
    return this.authService.register(data);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto): Promise<AuthEntity> {
    return this.authService.refreshToken(data);
  }
}
