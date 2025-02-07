export interface IQuoteResponse {
  results: IQuote[];
  requestedAt: Date;
  took: string;
}

export interface IQuoteParams {
  range: string;
  interval: string;
}

interface IHistoricalDataPrice {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

export interface IQuote {
  currency: string;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  usedInterval: string;
  usedRange: string;
  historicalDataPrice?: IHistoricalDataPrice[];
  validRanges?: string[];
  validIntervals?: string[];
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
}
