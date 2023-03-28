import { Component } from '@angular/core';
// npm install library currencies.json with purpose to use in drop-down menu
import { currencies } from 'currencies.json';
import { ApidataService } from '../services/apidata.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
  allCurrencies = currencies;
  currencyJson: any = [];

  // for currency convert
  country1 = 'USD';
  country2 = 'USD';
  result1: any;
  result2: any;
  proportionTo1 = 0;
  currentValue1 = 0;
  currentValue2 = 0;

  constructor(private currencyData: ApidataService) {}

  // for currency convert
  getCountry1(a: string) {
    this.country1 = a;
    this.countCurrency1(this.currentValue1);
    // this.countCurrency2(this.currentValue2);
  }

  getCountry2(b: string) {
    this.country2 = b;
    this.countCurrency1(this.currentValue1);
    this.countCurrency2(this.currentValue2);
  }

  countCurrency1(currencyAmount1: any) {
    this.currentValue1 = currencyAmount1;

    if (this.currentValue1 === 0 || String(this.currentValue1) === '') {
      this.result1 = '';
    } else if (this.currentValue1 !== 0) {
      if (this.country1 === this.country2) {
        this.result1 = currencyAmount1;
      } else {
        this.currencyData.getCurrencyData(this.country1).subscribe((data) => {
          this.currencyJson = JSON.parse(JSON.stringify(data));

          this.proportionTo1 = this.currencyJson.rates[this.country2];
          this.result1 = Number(
            (currencyAmount1 * this.proportionTo1).toFixed(2)
          );
          console.log(this.result1);
        });
      }
    }
  }

  countCurrency2(currencyAmount2: any) {
    this.currentValue2 = currencyAmount2;

    if (this.currentValue2 === 0 || String(this.currentValue2) === '') {
      this.result2 = '';
    } else if (this.currentValue2 !== 0) {
      if (this.country1 === this.country2) {
        this.result2 = currencyAmount2;
      } else {
        this.currencyData.getCurrencyData(this.country2).subscribe((data) => {
          this.currencyJson = JSON.parse(JSON.stringify(data));

          this.proportionTo1 = this.currencyJson.rates[this.country1];
          this.result2 = Number(
            (currencyAmount2 * this.proportionTo1).toFixed(2)
          );
          console.log(this.result2);
        });
      }
    }
  }
}
