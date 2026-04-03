import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('latest')
  async getLatest(@Query('base') base: string) {
    return this.currencyService.getLatestRates(base);
  }

  @Get('historical')
  async getHistorical(@Query('base') base: string, @Query('date') date: string) {
    return this.currencyService.getHistoricalRates(base, date);
  }

  @Get('currencies')
  async getAllCurrencies() {
    return this.currencyService.getAllCurrencies();
  }
}