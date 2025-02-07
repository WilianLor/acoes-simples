import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { StockModule } from '../stock/stock.module';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, StockModule, AuthModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [],
})
export class TransactionModule {}
