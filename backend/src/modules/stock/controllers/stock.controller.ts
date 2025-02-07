import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { StockSearchFilter } from '../dtos/stock-search.filter';
import { StockEntity } from '../entities/stock.entity';
import { IRequest } from 'src/common/interfaces/request.interface';
import { StockDetailFilter } from '../dtos/stock-details.filter';
import { StockDetailsEntity } from '../entities/stock-details.entity';
import { StockListFilter } from '../dtos/stock-list.filter';
import { StockListEntity } from '../entities/stock-list.entity';

@Controller('/stock')
@UseGuards(AuthGuard)
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Get('/search')
  async search(@Query() filter: StockSearchFilter): Promise<StockEntity[]> {
    return this.stockService.search(filter);
  }

  @Get()
  async list(
    @Query() filter: StockListFilter,
    @Request() { userId }: IRequest,
  ): Promise<StockListEntity[]> {
    return this.stockService.list(filter, userId);
  }

  @Get('/:stock')
  async details(
    @Param('stock') stock: string,
    @Query() filter: StockDetailFilter,
    @Request() { userId }: IRequest,
  ): Promise<StockDetailsEntity> {
    console.log(stock)
    return await this.stockService.details(filter, stock, userId);
  }
}
