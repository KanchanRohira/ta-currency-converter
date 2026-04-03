import { Injectable } from '@nestjs/common';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
@Injectable()
export class CurrencyService {
  private readonly baseUrl = 'https://api.freecurrencyapi.com/v1';

  async getLatestRates(base: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/latest?apikey=${API_KEY}&base_currency=${base}`
      );
      return {
        success: true,
        base: base,
        rates: response.data.data
      };
    } catch (error) {
  console.error('Currency API Error:', error.message);
  throw new Error('Failed to fetch currency data');
}
  }

  async getHistoricalRates(base: string, date: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/historical?apikey=${API_KEY}&base_currency=${base}&date=${date}`
      );
      const rates = response.data.data[date];
      return {
        success: true,
        base: base,
        date: date,
        rates: rates
      };
    } catch (error) {
  console.error('Currency API Error:', error.message);
  throw new Error('Failed to fetch currency data');
}
  }

  async getAllCurrencies() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/currencies?apikey=${API_KEY}`
      );
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
  console.error('Currency API Error:', error.message);
  throw new Error('Failed to fetch currency data');
}
  }
}
