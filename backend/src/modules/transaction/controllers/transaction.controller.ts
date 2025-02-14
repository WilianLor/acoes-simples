import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { IRequest } from 'src/common/interfaces/request.interface';
import { Transaction } from 'src/schemas/transaction.schema';
import { ListTransactionFilter } from '../dtos/list-transaction.filter';
import { ListTransactionEntity } from '../entities/list-transaction.entity';
import { StockService } from 'src/modules/stock/services/stock.service';
import { StockListEntity } from 'src/modules/stock/entities/stock-list.entity';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { dateHourFormater } from 'src/common/utils/date-formater';

@Controller('/transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly stockService: StockService,
  ) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() { userId }: IRequest,
  ): Promise<Transaction[]> {
    return this.transactionService.create(createTransactionDto, userId);
  }

  @Delete('/:transactionId')
  async delete(
    @Param('transactionId') transactionId: string,
    @Request() { userId }: IRequest,
  ): Promise<Transaction[]> {
    return this.transactionService.delete(transactionId, userId);
  }

  @Get()
  async list(
    @Query() filter: ListTransactionFilter,
    @Request() { userId }: IRequest,
  ): Promise<ListTransactionEntity> {
    return this.transactionService.list(filter, userId);
  }

  @Get('xlsx')
  async exportXlsx(
    @Query() filter: ListTransactionFilter,
    @Request() { userId }: IRequest,
    @Res() res: Response,
  ): Promise<void> {
    const dataStocks: StockListEntity[] = await this.stockService.list(
      {},
      userId,
    );

    const dataTransactions: ListTransactionEntity =
      await this.transactionService.list(filter, userId);

    const stockHeaders = ['Ativo', 'Preço Médio', 'Quantidade'];

    const stockData = dataStocks.map((stock) => [
      stock.stock,
      stock.averagePrice,
      stock.quantity,
    ]);

    const transactionHeaders = [
      'Nome',
      'Tipo',
      'Quantidade',
      'Preço',
      'Taxa',
      'Data',
    ];

    const transactionData = dataTransactions.transactions.map((transaction) => [
      transaction.stock.name,
      transaction.type === 'sale' ? 'Venda' : 'Compra',
      transaction.quantity,
      transaction.price,
      transaction.tax,
      dateHourFormater(transaction.date.toISOString()),
    ]);

    const stockSheet = XLSX.utils.aoa_to_sheet([stockHeaders, ...stockData]);

    stockSheet['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

    const transactionSheet = XLSX.utils.aoa_to_sheet([
      transactionHeaders,
      ...transactionData,
    ]);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, stockSheet, 'Stock Data');
    XLSX.utils.book_append_sheet(wb, transactionSheet, 'Transaction Data');

    const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(xlsxBuffer);
  }
}
