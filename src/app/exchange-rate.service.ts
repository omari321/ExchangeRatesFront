import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExchangeRates} from "./ExchangeRates";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private _httpClient: HttpClient) { }

    getExchangeRates(currency: string): Observable<ExchangeRates> {
        return this._httpClient.get<ExchangeRates>(`http://localhost:5212/api/BankExchangeRate?Currencies=${currency}`);
    }
}
