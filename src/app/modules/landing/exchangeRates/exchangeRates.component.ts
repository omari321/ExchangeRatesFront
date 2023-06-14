import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {async, BehaviorSubject, Subscription} from 'rxjs';
import {switchMap, startWith} from 'rxjs/operators';
import {ExchangeRateService} from "./exchange-rate.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from '@angular/common';

@Component({
    selector: 'exchange-rates',
    standalone: true,
    templateUrl: './exchangeRates.component.html',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class ExchangeRatesComponent implements OnInit , OnDestroy {
    selectControl = new FormControl('USD');
    exchangeRates$ = new BehaviorSubject<any[]>([]);
    displayedColumns: string[] = ['bankName', 'buyRate', 'sellRate'];
    selectedCurrency: string = 'USD';
    private _subscriptions: Subscription[]=[];

    constructor(private exchangeRateService: ExchangeRateService) {
    }


    ngOnInit(): void {
        // get exchange rates for selected currency
        this._subscriptions.push(
            this.selectControl.valueChanges.pipe(
            startWith(this.selectControl.value),
            switchMap((value) => this.exchangeRateService.getExchangeRates(value))
        ).subscribe(x => this.exchangeRates$.next(x.data.bankCurrencyInformationDto))
        );
        // store selected currency
        this._subscriptions.push(
            this.selectControl.valueChanges
            .subscribe(value => {
                this.selectedCurrency = value;
            }));
    }
    ngOnDestroy(): void {
        this._subscriptions.forEach(x=>x.unsubscribe);
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
