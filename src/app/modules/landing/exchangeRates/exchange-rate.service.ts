import { EnvironmentInjector, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ApplicationResult, ExchangeRates } from './exchangeRates.component.models';
import { ConfigService } from 'app/core/config';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    ) { }

    getExchangeRates(currency: string): Observable<ApplicationResult<ExchangeRates>> {
        return this._httpClient.get<ApplicationResult<ExchangeRates>>(`${this._configService.Config.API_URL}/BankExchangeRate?Currencies=${currency}`);
    }
}
