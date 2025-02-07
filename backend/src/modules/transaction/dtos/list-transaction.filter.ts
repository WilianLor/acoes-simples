import { IsOptional, IsString } from 'class-validator';

export class ListTransactionFilter {
  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  skip: string;
}
