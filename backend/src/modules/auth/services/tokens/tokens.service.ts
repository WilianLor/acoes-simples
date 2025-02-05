import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { IGenerateAuthTokens } from './interfaces/generate-auth-tokens.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { TokenTypeEnum } from './enums/token-type.enum';

@Injectable()
export class TokensService {
  private readonly REFRESH_TOKEN_SECRET: string;
  private readonly ACCESS_TOKEN_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.REFRESH_TOKEN_SECRET = this.configService.getOrThrow(
      'secrets.refreshTokenSecret',
    );
    this.ACCESS_TOKEN_SECRET = this.configService.getOrThrow(
      'secrets.accessTokenSecret',
    );
  }

  generateAuthTokens(tokenPayload: ITokenPayload): IGenerateAuthTokens {
    const accessToken = sign(tokenPayload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = sign(tokenPayload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken, expiresAt: Date.now() + 15 * 60 * 1000 };
  }

  decodeToken(token: string, tokenType: TokenTypeEnum) {
    const secret = {
      [TokenTypeEnum.accessToken]: this.ACCESS_TOKEN_SECRET,
      [TokenTypeEnum.refreshToken]: this.REFRESH_TOKEN_SECRET,
    };

    try {
      const decoded = verify(token, secret[tokenType]) as ITokenPayload;

      return decoded;
    } catch (error) {
      throw new UnauthorizedException(`Token de acesso inválido.`);
    }
  }
}
