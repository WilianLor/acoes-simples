import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StockTypeEnum } from 'src/brapi/interfaces/quote-list.interface';
import { TransactionTypeEnum } from 'src/schemas/transaction.schema';

export class StockDto {
  @IsNotEmpty()
  @IsString()
  stock: string; //símbolo da ação

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsEnum(StockTypeEnum)
  type: StockTypeEnum;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StockDto)
  stock: StockDto;

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
