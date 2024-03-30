import { Component, OnInit } from '@angular/core';
import { CurrencyService } from "../service/currency.service";

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.css']
})
export class CurrencyExchangeComponent implements OnInit {
  amount: number | null = null;
  fromCurrency: string = '';
  toCurrency: string = '';
  result: number | null = null;
  currencyOptions: string[] = ['USD', 'EUR', 'GBP', 'RUB'];
  currencySymbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'RUB': '₽'
  };

  constructor (private currencyService: CurrencyService) {
  }

  ngOnInit (): void {
    this.updateResult();
  }

  updateResult(): void {
    if (this.amount! > 0 && this.fromCurrency && this.toCurrency) {
      if (this.toCurrency === 'USD') {
        this.currencyService.getExchangeRate(this.fromCurrency).subscribe(fromRate => {
          if (fromRate !== undefined) {
            this.result = this.amount! / fromRate;
          }
        });
      } else if (this.fromCurrency === 'USD') {
        this.currencyService.getExchangeRate(this.toCurrency).subscribe(toRate => {
          if (toRate !== undefined) {
            this.result = this.amount! * toRate;
          }
        });
      } else {
        this.currencyService.getExchangeRate(this.fromCurrency).subscribe(fromRate => {
          if (fromRate !== undefined) {
            this.currencyService.getExchangeRate(this.toCurrency).subscribe(toRate => {
              if (toRate !== undefined) {
                const amountInUSD = this.amount! / fromRate;
                this.result = amountInUSD * toRate;
              }
            });
          }
        });
      }
    }
  }

  updateAmount(): void {
    if (this.result! > 0 && this.fromCurrency && this.toCurrency) {
      if (this.toCurrency === 'USD') {
        this.currencyService.getExchangeRate(this.fromCurrency).subscribe(fromRate => {
          if (fromRate !== undefined) {
            this.amount = this.result! * fromRate;
          }
        });
      } else if (this.fromCurrency === 'USD') {
        this.currencyService.getExchangeRate(this.toCurrency).subscribe(toRate => {
          if (toRate !== undefined) {
            this.amount = this.result! / toRate;
          }
        });
      } else {
        this.currencyService.getExchangeRate(this.fromCurrency).subscribe(fromRate => {
          if (fromRate !== undefined) {
            this.currencyService.getExchangeRate(this.toCurrency).subscribe(toRate => {
              if (toRate !== undefined) {
                const resultInUSD = this.result! / toRate;
                this.amount = resultInUSD * fromRate;
              }
            });
          }
        });
      }
    }
  }


  switchCurrencies(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.updateResult();
  }

}
