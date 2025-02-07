import { IsOptional, IsString } from 'class-validator';

export class StockDetailFilter {
  @IsString()
  @IsOptional()
  range: string;

  @IsString()
  @IsOptional()
  interval: string;
}
