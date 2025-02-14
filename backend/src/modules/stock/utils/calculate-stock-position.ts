import { Types } from 'mongoose';
import {
  Transaction,
  TransactionTypeEnum,
} from 'src/schemas/transaction.schema';
import { ICalculateStockPosition } from '../interfaces/calculate-stock-position.interface';

export const calculateStockPosition = (
  transactions: Transaction[],
  stockId: Types.ObjectId,
): ICalculateStockPosition => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.stock === stockId,
  );

  if (!filteredTransactions) return undefined;

  const { quantity, totalCost } = filteredTransactions
    .filter((transaction) => transaction.stock === stockId)
    .reduce(
      (acc, transaction) => {
        const { type, quantity, price, tax } = transaction;

        if (type === TransactionTypeEnum.buy) {
          return {
            totalCost: acc.totalCost + (quantity * price + tax),
            quantity: acc.quantity + quantity,
          };
        } else if (type === TransactionTypeEnum.sale) {
          return {
            totalCost: acc.totalCost - quantity * price,
            quantity: acc.quantity - quantity,
          };
        }
      },
      { totalCost: 0, quantity: 0 },
    );

  const averagePrice = quantity ? totalCost / quantity : 0;

  return { averagePrice: Number(averagePrice.toFixed(2)), quantity };
};
