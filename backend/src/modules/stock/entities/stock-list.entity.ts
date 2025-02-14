import { Stock } from 'src/schemas/stock.schema';
import { Transaction } from 'src/schemas/transaction.schema';
import { calculateStockPosition } from '../utils/calculate-stock-position';

export class StockListEntity {
  stock: string;
  averagePrice: number;
  quantity: number;

  constructor(stock: Stock, transactions: Transaction[]) {
    const { averagePrice, quantity } = calculateStockPosition(
      transactions,
      stock.id,
    );

    this.quantity = quantity;
    this.averagePrice = averagePrice;
    this.stock = stock.stock;
  }
}
