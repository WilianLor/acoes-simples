import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BrapiService } from 'src/brapi/services/brapi.service';
import { Stock } from 'src/schemas/stock.schema';
import { StockSearchFilter } from '../dtos/stock-search.filter';
import { StockEntity } from '../entities/stock.entity';
import { StockDetailFilter } from '../dtos/stock-details.filter';
import { StockDetailsEntity } from '../entities/stock-details.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { StockListFilter } from '../dtos/stock-list.filter';
import { StockListEntity } from '../entities/stock-list.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>,
    private readonly brapiService: BrapiService,
    private readonly userService: UserService,
  ) {}

  async getOrCreate(stockName: string): Promise<Stock> {
    const stock = await this.stockModel.findOne({ stock: stockName });

    if (stock) return stock;

    const brapiStock = await this.brapiService.quote(stockName, {
      interval: '1d',
      range: '1d',
    });

    const newStock = await this.stockModel.create({
      stock: brapiStock.results[0].symbol,
      name:
        brapiStock.results[0]?.longName ||
        brapiStock.results[0]?.shortName ||
        brapiStock.results[0].symbol,
      logo: brapiStock.results[0].logourl,
      type: 'stock',
    });

    return newStock;
  }

  async getByStock(stockParam: string): Promise<Stock> {
    const stock = await this.stockModel.findOne({ stock: stockParam });

    if (!stock) {
      throw new NotFoundException('Ativo não encontrado');
    }

    return stock;
  }

  async getById(stockId: string) {
    const stock = await this.stockModel.findById(stockId);

    if (!stock) {
      throw new NotFoundException('Ativo não encontrado');
    }

    return stock;
  }

  async search(filter: StockSearchFilter): Promise<StockEntity[]> {
    const quoteList = await this.brapiService.quoteList(filter);

    const stocks = quoteList.stocks.map((stock) => new StockEntity(stock));

    return stocks;
  }

  async details(
    filter: StockDetailFilter,
    stockParam: string,
    userId: string,
  ): Promise<StockDetailsEntity> {
    const user = await this.userService.getUserById(userId);

    const stock = await this.getByStock(stockParam);

    const quote = await this.brapiService.quote(stockParam, filter);

    const transactions = user.transactions.filter(
      (transaction) => transaction.stock === stock.id,
    );

    return new StockDetailsEntity(quote, transactions, stock);
  }

  async list(
    { stock: stockParam }: StockListFilter,
    userId: string,
  ): Promise<StockListEntity[]> {
    const user = await this.userService.getUserById(userId);

    const stockIds = user.transactions.reduce<Types.ObjectId[]>(
      (acc, transaction) => {
        const stockAlreadyInReducer = acc.find(
          (accStockId) => accStockId === transaction.stock,
        );

        if (stockAlreadyInReducer) return acc;

        return [...acc, transaction.stock];
      },
      [],
    );

    const stocks = await Promise.all(
      stockIds.map(async (stockId) => {
        const stock = await this.getById(stockId.toString());

        return stockParam
          ? stock.stock.toUpperCase().startsWith(stockParam.toUpperCase())
            ? new StockListEntity(stock, user.transactions)
            : undefined
          : new StockListEntity(stock, user.transactions);
      }),
    );

    return stocks.filter((stock) => stock?.quantity);
  }
}
