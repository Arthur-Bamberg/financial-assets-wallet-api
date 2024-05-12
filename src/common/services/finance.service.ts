import { Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class FinanceService {
  async getStockValue(shortName: string): Promise<number | undefined> {
    return (
      await yahooFinance.quoteSummary(shortName + '.SA', {
        modules: ['price'],
      })
    ).price?.regularMarketPrice;
  }
}
