import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get('database.uri'),
    };
  }
}
