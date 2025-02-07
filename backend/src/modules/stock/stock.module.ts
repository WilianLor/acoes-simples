import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from 'src/schemas/stock.schema';
import { StockService } from './services/stock.service';
import { StockController } from './controllers/stock.controller';
import { BrapiModule } from 'src/brapi/brapi.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    BrapiModule,
    AuthModule,
    UserModule,
  ],
  controllers: [StockController],
  exports: [StockService],
  providers: [StockService],
})
export class StockModule {}
