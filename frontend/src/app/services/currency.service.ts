/* frontend */  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private apiUrl = 'https://ta-currency-converter-mzdc.vercel.app/currency';

  constructor(private http: HttpClient) {}

  getLatestRates(base: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest?base=${base}`);
  }

  getHistoricalRates(base: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/historical?base=${base}&date=${date}`);
  }
}