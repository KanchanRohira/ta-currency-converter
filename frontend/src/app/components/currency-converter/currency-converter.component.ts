import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface ConversionRecord {
  timestamp: Date;
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  date?: string;
}

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CurrencyConverterComponent implements OnInit {

  currencies: string[] = [];
  base = 'USD';
  target = 'EUR';
  amount: number = 1;
  result: number | null = null;

  isLoading = false;
  useHistorical = false;
  selectedDate: Date | null = null;
  history: ConversionRecord[] = [];

  constructor(
    private service: CurrencyService,
    private snackBar: MatSnackBar
  ) {}

ngOnInit() {
  this.loadCurrencies();
  this.loadHistory();
}

loadCurrencies() {
  this.isLoading = true;
  this.service.getLatestRates('USD').subscribe({
    next: (res: any) => {
      if (res && res.data) {
        this.currencies = Object.keys(res.data);
      } else if (res && res.rates) {
        this.currencies = Object.keys(res.rates);
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading currencies:', error);
      this.snackBar.open('Failed to load currencies. Please check backend.', 'Close', { duration: 3000 });
      this.isLoading = false;
    }
  });
}

  convert() {
    if (!this.amount || this.amount <= 0) {
      this.snackBar.open('Please enter a valid amount', 'Close', { duration: 2000 });
      return;
    }

    this.isLoading = true;
    this.result = null;

    let request;
    if (this.useHistorical && this.selectedDate) {
      const formattedDate = this.formatDate(this.selectedDate);
      request = this.service.getHistoricalRates(this.base, formattedDate);
    } else {
      request = this.service.getLatestRates(this.base);
    }

    request.subscribe({
      next: (res: any) => {
        let rates = res.data || res.rates;
        
        if (this.useHistorical && this.selectedDate) {
          const formattedDate = this.formatDate(this.selectedDate);
          rates = rates[formattedDate] || rates;
        }
        
        const rate = rates[this.target];
        
        if (rate) {
          this.result = +(this.amount * rate).toFixed(4);
          this.saveHistory(rate);
        } else {
          this.snackBar.open('Conversion rate not available', 'Close', { duration: 2000 });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Conversion error:', error);
        this.snackBar.open('Conversion failed. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveHistory(rate: number) {
    const record: ConversionRecord = {
      timestamp: new Date(),
      from: this.base,
      to: this.target,
      amount: this.amount,
      result: this.result!,
      rate: rate,
      date: this.useHistorical && this.selectedDate ? this.formatDate(this.selectedDate) : undefined
    };

    this.history.unshift(record);
    if (this.history.length > 20) {
      this.history = this.history.slice(0, 20);
    }
    localStorage.setItem('conversion_history', JSON.stringify(this.history));
  }

  loadHistory() {
    const data = localStorage.getItem('conversion_history');
    if (data) {
      try {
        this.history = JSON.parse(data);
      } catch (e) {
        console.error('Error parsing history:', e);
        this.history = [];
      }
    }
  }

 swap() {
  [this.base, this.target] = [this.target, this.base];
}

  clearHistory() {
    this.history = [];
    localStorage.removeItem('conversion_history');
    this.snackBar.open('History cleared successfully', 'Close', { duration: 2000 });
  }
}