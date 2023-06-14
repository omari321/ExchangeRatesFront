import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ConfigService } from 'app/core/config';
import { Observable } from 'rxjs';
import { ApplicationResult } from '../exchangeRates/exchangeRates.component.models';
import { stringify } from "qs";
import { BankCurrencyInformationDto } from "./historic-exchangeRates.models";

@Injectable({
  providedIn: 'root'
})
export class HistoricExchangeRateService {

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    ) { }
    getHistoricExchangeRates(currency: string, daysCount: number ): Observable<ApplicationResult<BankCurrencyInformationDto[]>> {
        var model={ DaysCount : daysCount, currencies: currency}
        return this._httpClient.get<ApplicationResult<BankCurrencyInformationDto[]>>(`${this._configService.Config.API_URL}/BankExchangeRate/historical-data?${stringify(model, {
            skipNulls: true,
            allowDots: true,
            arrayFormat: 'repeat'
        })}`,
        );
    }
}
