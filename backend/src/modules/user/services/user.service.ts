import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { ICreateUser } from '../interfaces/create-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUser: ICreateUser): Promise<User> {
    await Promise.all([
      this.verifyUniqueName(createUser.name),
      this.verifyUniqueMail(createUser.mail),
    ]);

    const user = await this.userModel.create(createUser);

    return user;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user;
  }

  private async verifyUniqueName(name: string): Promise<void> {
    const user = await this.userModel.findOne({ name });

    if (user)
      throw new BadRequestException('Este nome de usuário já foi cadastrado');
  }

  private async verifyUniqueMail(mail: string): Promise<void> {
    const user = await this.userModel.findOne({ mail });

    if (user) throw new BadRequestException('Este email já foi cadastrado');
  }

  async verifyPassword(mail: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ mail });

    if (!user) throw new BadRequestException('Usuário ou senha inválidos');

    const passwordComparison = await compare(password, user.password);

    if (!passwordComparison)
      throw new BadRequestException('Usuário ou senha inválidos');

    return user;
  }
}
