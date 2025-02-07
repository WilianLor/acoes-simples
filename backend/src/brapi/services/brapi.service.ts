import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { promisifyHttpService } from 'src/common/utils/promisify-observable';
import {
  IQuoteListParams,
  IQuoteListResponse,
} from '../interfaces/quote-list.interface';
import { IQuote, IQuoteParams, IQuoteResponse } from '../interfaces/quote.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BrapiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async quoteList(params: IQuoteListParams): Promise<IQuoteListResponse> {
    return promisifyHttpService<IQuoteListResponse>(
      this.httpService.get<IQuoteListResponse>('/quote/list', {
        params,
      }),
    );
  }

  async quote(stock: string, params: IQuoteParams): Promise<IQuoteResponse> {
    const cacheKey = `quote-${stock}`;
    const cachedData = await this.cacheManager.get<IQuoteResponse>(cacheKey);
    const now = new Date();

    if (cachedData) {
      const cacheAge = (now.getTime() - new Date(cachedData.requestedAt).getTime()) / 1000;

      if (cacheAge < 120) {
        return cachedData;
      } else {
        const newData = await this.fetchAndUpdateCache(stock, params, cachedData);
        return newData;
      }
    } else {
      const newData = await this.fetchAndUpdateCache(stock, params);
      return newData;
    }
  }

  private async fetchAndUpdateCache(
    stock: string,
    params: IQuoteParams,
    cachedData?: IQuoteResponse,
  ): Promise<IQuoteResponse> {
    const cacheKey = `quote-${stock}`;
    const newData = await promisifyHttpService<IQuoteResponse>(
      this.httpService.get<IQuoteResponse>(`/quote/${stock}`, { params }),
    );

    if (cachedData) {
      newData.results = this.mergeData(cachedData.results, newData.results);
    }

    newData.requestedAt = new Date();
    await this.cacheManager.set(cacheKey, newData);

    return newData;
  }

  private mergeData(oldData: IQuote[], newData: IQuote[]): IQuote[] {
    const mergedData = [...oldData];

    newData.forEach((newQuote) => {
      const index = mergedData.findIndex((quote) => quote.symbol === newQuote.symbol);
      if (index !== -1) {
        mergedData[index] = { ...mergedData[index], ...newQuote };
      } else {
        mergedData.push(newQuote);
      }
    });

    return mergedData;
  }
}
