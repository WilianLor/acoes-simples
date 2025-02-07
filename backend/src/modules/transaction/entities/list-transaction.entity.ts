import { Transaction } from 'src/schemas/transaction.schema';

export class ListTransactionEntity {
  count: number;
  transactions: Transaction[];

  constructor(transactions: Transaction[], count: number) {
    this.count = count;
    this.transactions = transactions;
  }
}
