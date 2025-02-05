import { User } from 'src/schemas/user.schema';
import { IGenerateAuthTokens } from '../services/tokens/interfaces/generate-auth-tokens.interface';

export class AuthEntity {
  id: string;
  name: string;
  mail: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number

  constructor(user: User, token: IGenerateAuthTokens) {
    this.id = user.id;
    this.name = user.name;
    this.mail = user.mail;
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    this.expiresAt = token.expiresAt
  }
}
