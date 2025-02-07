import { IsOptional, IsString } from 'class-validator';

export class StockListFilter {
  @IsOptional()
  @IsString()
  stock?: string;
}
