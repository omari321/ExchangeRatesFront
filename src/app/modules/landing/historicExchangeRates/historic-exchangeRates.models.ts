export interface BankCurrencyInformationDto
{
    date: Date;
    bankRates: Bankrates[]
}

export interface Bankrates
{
    bankName: string;
    buyRate: number;
    sellRate: number;
}
