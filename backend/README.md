# Currency Converter Backend - TA Solutions

This is the backend API for the Currency Converter project built with NestJS.

## Features
- Fetch latest currency rates from FreeCurrencyAPI
- Fetch historical currency rates
- List all supported currencies
- API key is secured in the backend

## Endpoints
- `GET /currency/latest?base=USD` - Latest rates for the given base currency
- `GET /currency/historical?base=USD&date=YYYY-MM-DD` - Historical rates
- `GET /currency/currencies` - List all supported currencies

## Installation
```bash
git clone <repo-url>
cd backend
npm install
npm run start:dev
