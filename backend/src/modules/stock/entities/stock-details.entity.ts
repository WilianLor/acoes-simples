import { IQuote, IQuoteResponse } from 'src/brapi/interfaces/quote.interface';
import { Transaction } from 'src/schemas/transaction.schema';
import { StockListEntity } from './stock-list.entity';
import { Stock } from 'src/schemas/stock.schema';

export class StockDetailsEntity {
  quote: IQuote;
  transactions: Transaction[];
  averagePrice: number;
  quantity: number;

  constructor(
    quote: IQuoteResponse,
    transactions: Transaction[],
    stock: Stock,
  ) {
    const { averagePrice, quantity } = new StockListEntity(stock, transactions);

    this.averagePrice = averagePrice;
    this.quantity = quantity;
    this.quote = quote.results[0];
    this.transactions = transactions;
  }
}
