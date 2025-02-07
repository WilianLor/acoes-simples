import { StockTypeEnum } from 'src/brapi/interfaces/quote-list.interface';

export interface ICreateStock {
  stock: string;
  name: string;
  logo: string;
  type: StockTypeEnum;
}
