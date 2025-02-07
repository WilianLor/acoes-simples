import {
  IStock,
  StockTypeEnum,
} from 'src/brapi/interfaces/quote-list.interface';

export class StockEntity {
  stock: string;
  name: string;
  logo: string;
  type: StockTypeEnum;

  constructor(stock: IStock) {
    this.stock = stock.stock;
    this.name = stock.name;
    this.logo = stock.logo;
    this.type = stock.type;
  }
}
