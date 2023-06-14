
export class ApplicationResult<T> {
    success: boolean;
    errors: ApplicationError[];
    data: T;
}
export class ApplicationError {
    code: number;
    message: string;
}

export interface ExchangeRate {
    bankName: string;
    buyRate: number;
    sellRate: number;
}
export interface ExchangeRates {
    currencyName: string;
    officialRate: number;
    diff: number;
    bankCurrencyInformationDto: ExchangeRate[];
}
