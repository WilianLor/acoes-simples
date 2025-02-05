import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StockTypeEnum } from 'src/brapi/interfaces/quote-list.interface';

@Schema({ _id: true })
export class Stock extends Document {
  @Prop({ required: true, unique: true })
  stock: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  logo: string;

  @Prop({ required: true, enum: StockTypeEnum })
  type: StockTypeEnum;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
