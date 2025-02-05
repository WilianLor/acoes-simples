import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { RegsiterDto } from '../dtos/register.dto';
import { TokensService } from './tokens/tokens.service';
import { AuthEntity } from '../entities/auth.entity';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { TokenTypeEnum } from './tokens/enums/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  async register(data: RegsiterDto) {
    const user = await this.userService.create(data);

    const tokens = this.tokensService.generateAuthTokens({ userId: user.id });

    return new AuthEntity(user, tokens);
  }

  async login(data: LoginDto) {
    const user = await this.userService.verifyPassword(
      data.mail,
      data.password,
    );

    const tokens = this.tokensService.generateAuthTokens({ userId: user.id });

    return new AuthEntity(user, tokens);
  }

  async refreshToken(data: RefreshTokenDto) {
    const { userId } = this.tokensService.decodeToken(
      data.refreshToken,
      TokenTypeEnum.refreshToken,
    );

    const user = await this.userService.getUserById(userId);

    const tokens = this.tokensService.generateAuthTokens({ userId: user.id });

    return new AuthEntity(user, tokens);
  }
}
