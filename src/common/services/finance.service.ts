import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ENV } from '../env.config';

@Injectable()
export class FinanceService {
  async getStockValue(shortName: string): Promise<number | undefined> {
    return (
      await axios.get<{ results: [{ regularMarketPrice: number }] }>(
        `https://brapi.dev/api/quote/${shortName}?token=${ENV.FINANCE_API_TOKEN}`,
      )
    ).data.results[0].regularMarketPrice;
  }
}
