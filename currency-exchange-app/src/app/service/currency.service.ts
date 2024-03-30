import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  getExchangeRate(targetCurrency: string): Observable<number | undefined> {
    switch (targetCurrency) {
      case 'EUR':
        return of(0.926914);
      case 'GBP':
        return of(0.792884);
      case 'RUB':
        return of(92.261826);
      default:
        return of(undefined);
    }
  }
}
