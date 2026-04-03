import { Component } from '@angular/core';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter';
}