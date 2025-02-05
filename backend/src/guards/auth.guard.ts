import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenTypeEnum } from 'src/modules/auth/services/tokens/enums/token-type.enum';
import { TokensService } from 'src/modules/auth/services/tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Header de autenticação não enviado');
    }

    const accessToken = authHeader.split(' ')[1];

    const { userId } = this.tokensService.decodeToken(
      accessToken,
      TokenTypeEnum.accessToken,
    );

    request.userId = userId;

    return true;
  }
}
