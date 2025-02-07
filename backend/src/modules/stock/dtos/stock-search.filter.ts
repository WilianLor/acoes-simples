import { IsOptional, IsString } from 'class-validator';

export class StockSearchFilter {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  limit: string;
}
