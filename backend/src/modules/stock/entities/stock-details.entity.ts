import { IQuote, IQuoteResponse } from 'src/brapi/interfaces/quote.interface';
import { Transaction } from 'src/schemas/transaction.schema';

export class StockDetailsEntity {
  quote: IQuote;
  transactions: Transaction[];

  constructor(quote: IQuoteResponse, transactions: Transaction[]) {
    this.quote = quote.results[0];
    this.transactions = transactions;
  }
}
