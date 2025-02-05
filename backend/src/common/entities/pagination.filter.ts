import { Allow, IsOptional, IsString } from 'class-validator';
import { QueryOptions } from 'mongoose';

export class PaginationFilter<T> {
  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  skip: string;

  @IsOptional()
  @Allow()
  order: Record<string, 'asc' | 'desc'>;

  buildPagination(): QueryOptions<T> {
    const queryOptions: QueryOptions<T> = {};

    if (this.order) {
      queryOptions.sort = {};

      Object.entries(this.order).map(([key, value]) => {
        queryOptions.sort[key] = value === 'asc' ? 1 : -1;
      });
    }

    if (this.skip) {
      queryOptions.skip = Number(this.skip);
    }

    if (this.limit) {
      queryOptions.limit = Number(this.limit);
    }

    return queryOptions;
  }
}
