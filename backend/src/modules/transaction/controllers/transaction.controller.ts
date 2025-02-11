import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { IRequest } from 'src/common/interfaces/request.interface';
import { Transaction } from 'src/schemas/transaction.schema';
import { ListTransactionFilter } from '../dtos/list-transaction.filter';
import { ListTransactionEntity } from '../entities/list-transaction.entity';

@Controller('/transaction')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

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
}
