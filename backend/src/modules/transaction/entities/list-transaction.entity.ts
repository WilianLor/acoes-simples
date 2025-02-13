import { TransactionWithStock } from 'src/schemas/transaction.schema';

export class ListTransactionEntity {
  count: number;
  transactions: TransactionWithStock[];

  constructor(transactions: TransactionWithStock[], count: number) {
    this.count = count;
    this.transactions = transactions;
  }
}
