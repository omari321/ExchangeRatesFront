import {ExchangeRate} from "./ExchangeRate";

export interface ExchangeRates {
    currencyName: string;
    officialRate: number;
    diff: number;
    bankCurrencyInformationDto: ExchangeRate[];
}
