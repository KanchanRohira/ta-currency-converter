import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      status: 'success',
      message: 'Currency Converter API is running',
      version: '1.0.0',
      endpoints: {
        currencies: '/api/currencies',
        latest: '/api/latest?base=USD',
        convert: '/api/convert?from=USD&to=INR&amount=100',
        historical: '/api/historical?base=USD&date=2024-01-01',
        health: '/health'
      },
      documentation: 'https://github.com/KanchanRohira/ta-currency-converter',
      timestamp: new Date().toISOString()
    };
  }

  getHealth() {
    return {
      status: 'healthy',
      service: 'currency-converter-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  }
}