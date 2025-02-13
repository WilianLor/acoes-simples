import { Prop, Schema } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Stock } from './stock.schema';

export enum TransactionTypeEnum {
  sale = 'sale',
  buy = 'buy',
}

@Schema({ _id: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stock', required: true })
  stock: Types.ObjectId;

  @Prop({ required: true, enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({})
  tax: number;

  @Prop({ required: true })
  date: Date;
}

export interface TransactionWithStock extends Omit<Transaction, 'stock'> {
  stock: Stock;
}
