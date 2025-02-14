import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { StockService } from 'src/modules/stock/services/stock.service';
import {
  Transaction,
  TransactionTypeEnum,
} from 'src/schemas/transaction.schema';
import { ListTransactionFilter } from '../dtos/list-transaction.filter';
import { ListTransactionEntity } from '../entities/list-transaction.entity';
import { calculateStockPosition } from 'src/modules/stock/utils/calculate-stock-position';

@Injectable()
export class TransactionService {
  constructor(
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  async create(
    { stock: stockName, ...createTransaction }: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction[]> {
    const user = await this.userService.getUserById(userId);
    const stock = await this.stockService.getOrCreate(stockName);

    const { quantity } = calculateStockPosition(user.transactions, stock.id);

    if (createTransaction.quantity < 1)
      throw new BadRequestException('Insira uma quantidade válida');

    if (
      createTransaction.type === TransactionTypeEnum.sale &&
      createTransaction.quantity > quantity
    ) {
      throw new BadRequestException('Quantidade insuficiente de ativos');
    }

    user.transactions.push({
      stock: stock.id,
      ...createTransaction,
    } as Transaction);

    await user.save();

    return user.transactions;
  }

  async list(
    { limit, skip }: ListTransactionFilter,
    userId: string,
  ): Promise<ListTransactionEntity> {
    const user = await this.userService.getUserByIdWithStock(userId);

    const count = user.transactions.length;
    const endIndex = limit ? (parseInt(skip) || 0) + parseInt(limit) : count;

    const transactions = user.transactions
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .slice(skip ? parseInt(skip) : 0, endIndex);

    return new ListTransactionEntity(transactions, count);
  }

  async delete(transactionId: string, userId: string): Promise<Transaction[]> {
    const user = await this.userService.getUserById(userId);

    const transaction = user.transactions.find(
      (transaction) => transaction.id === transactionId,
    );

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    const { quantity } = calculateStockPosition(
      user.transactions,
      transaction.stock,
    );

    if (
      transaction.type === TransactionTypeEnum.buy &&
      quantity - transaction.quantity < 0
    ) {
      throw new BadRequestException('Quantidade insuficiente de ativos');
    }

    user.transactions = user.transactions.filter(
      (transaction) => transaction.id !== transactionId,
    );

    await user.save();

    return user.transactions;
  }
}
