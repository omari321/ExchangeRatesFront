import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from '@angular/common';

@Component({
    selector: 'historic-exchange-rates',
    standalone: true,
    templateUrl: './historic-exchangeRates.component.html',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class HistoricExchangeRatesComponent implements OnInit {


    constructor() {
    }

    ngOnInit(): void {

    }


    mapCurrencyCodeToName(selectedCurrency: string): string {
        switch (selectedCurrency) {
            case 'USD':
                return 'United States Dollar';
            case 'EUR':
                return 'Euro';
            case 'GBP':
                return 'British Pound';
            case 'CHF':
                return 'Swiss Franc';
            case 'RUB':
                return 'Russian Ruble';
            case 'TRY':
                return 'Turkish Lira';
        }
    }

    mapCurrencyCodeToFlagURL(selectedCurrency: string): string {
        switch (selectedCurrency) {
            case 'USD':
                return "https://flagsapi.com/US/flat/32.png";
            case 'EUR':
                return "https://flagcdn.com/w40/eu.png"
            case 'GBP':
                return "https://flagsapi.com/GB/flat/32.png";
            case 'CHF':
                return "https://flagsapi.com/CH/flat/32.png";
            case 'RUB':
                return "https://flagsapi.com/RU/flat/32.png";
            case 'TRY':
                return "https://flagsapi.com/TR/flat/32.png";
        }
    }
}
