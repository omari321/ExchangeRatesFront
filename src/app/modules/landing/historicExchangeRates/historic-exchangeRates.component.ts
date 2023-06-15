import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from '@angular/common';
import {DateTime} from 'luxon';
import {HistoricExchangeRateService} from './historic-exchangeRates.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {NgChartsModule} from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {BankCurrencyInformationDto} from './historic-exchangeRates.models';

@Component({
    selector: 'historic-exchange-rates',
    standalone: true,
    templateUrl: './historic-exchangeRates.component.html',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        CommonModule,
        NgChartsModule
    ]
})
export class HistoricExchangeRatesComponent implements OnInit, OnDestroy {
    selectedCurrency: string = 'USD';
    selectControl = new FormControl<string>('USD');
    selectDaysPeriod = new FormControl<number>(7);
    selectedBank = new FormControl<string>(null);
    availableBanks = new BehaviorSubject<string[]>(null);
    selectedExchange = new FormControl<string>('buy');

    title = 'ng2-charts-demo';

    lineChartData?: ChartConfiguration<'line'>['data'];
    public lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
    };
    public lineChartLegend = true;

    private _data: BankCurrencyInformationDto[];
    private _subscriptions: Subscription[] = [];
    availableExchanges = new BehaviorSubject<Object>({buy: {}, sell: {}});

    constructor(private historicExchangeRatesService: HistoricExchangeRateService) {
    }


    getHistoricData(selectedBankCaller:boolean = false): void {
        this._subscriptions.push(
            this.historicExchangeRatesService
                .getHistoricExchangeRates(this.selectedCurrency, this.selectDaysPeriod.value)
                .subscribe(x => {
                    this._data = x.data;
                    if(!selectedBankCaller){
                        this.selectedBank.setValue(x.data[0].bankRates[0].bankName);
                    }
                    this.availableBanks.next(x.data[0].bankRates.map((value) => {
                        return value.bankName
                    }));
                    this.updateChart();
                })
        );
    }

    updateChart(): void {
        console.log('chart updated');
        this.availableExchanges = new BehaviorSubject<Object>({
            buy: {
                data: this._data.map(x => x.bankRates.filter(y => y.bankName == this.selectedBank.value)[0].buyRate).reverse(),
                label: 'Buy Rate',
                fill: false,
                tension: 0.5,
                borderColor: 'rgba(255,0,0,0.3)',
                backgroundColor: 'black',
                borderWidth: 1,
            },
            sell: {
                data: this._data.map(x => x.bankRates.filter(y => y.bankName == this.selectedBank.value)[0].sellRate).reverse(),
                label: 'Sell Rate',
                fill: false,
                tension: 0.5,
                borderColor: 'rgba(50, 166, 168,0.3)',
                backgroundColor: 'black',
                borderWidth: 1,
            }
        });
        this.lineChartData = {
            labels: this._data.map(x => x.date).reverse(),
            datasets: [
                this.availableExchanges.value[this.selectedExchange.value]
            ],
        };
    }

    ngOnInit(): void {

        // fetch initially
        this.getHistoricData();

        // fetch based on selection
        this._subscriptions.push(
            this.selectControl.valueChanges.subscribe(x => {
                this.selectedCurrency = x;
                this.getHistoricData();
            })
        );
        this._subscriptions.push(
            this.selectDaysPeriod.valueChanges.subscribe(x => {
                this.getHistoricData();
            })
        );

        this._subscriptions.push(
            this.selectedBank.valueChanges.subscribe(x => {
                    this.getHistoricData(true);
                }
            )
        );

        this._subscriptions.push(
            this.selectedExchange.valueChanges.subscribe(x => {
                    this.getHistoricData();
                })
        );
    }

    ngOnDestroy()
        :
        void {
        this._subscriptions.forEach(x => x.unsubscribe());
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
