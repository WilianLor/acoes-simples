import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionTypeEnum } from 'src/schemas/transaction.schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  stock: string;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  tax: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
