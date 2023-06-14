import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ApplicationResult, ExchangeRates } from './exchangeRates.component.models';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private _httpClient: HttpClient) { }

    getExchangeRates(currency: string): Observable<ApplicationResult<ExchangeRates>> {
        return this._httpClient.get<ApplicationResult<ExchangeRates>>(`http://localhost:5212/api/BankExchangeRate?Currencies=${currency}`);
    }
}
