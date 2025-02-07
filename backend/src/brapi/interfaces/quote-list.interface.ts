export interface IQuoteListResponse {
  stocks: IStock[];
}

export interface IQuoteListParams {
  search?: string;
  limit?: string;
}

export interface IStock {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
  type: StockTypeEnum;
}

export enum StockTypeEnum {
  stock = 'stock',
  fund = 'fund',
  bdr = 'bdr',
}
