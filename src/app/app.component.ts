import { Component } from '@angular/core';
import { ApidataService } from './apidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'currency-converter-app';
  // for copyright
  year = (new Date()).getFullYear();


  currencyJson: any = [];
  // for UAH USD EUR live rates
  usdToUah = this.convertUSD();
  eurToUah = this.convertEUR();

  // for currency convert
  country1 = 'USD';
  country2 = 'USD';
  result1: any;
  result2: any;
  proportionTo1 = 0;
  currentValue1 = 0;
  currentValue2 = 0;

  constructor(private currencyData: ApidataService) {}

  // for UAH USD EUR live rates
  convertUSD() {
    this.currencyData.getCurrencyData('USD').subscribe((data) => {
      this.currencyJson = JSON.parse(JSON.stringify(data));
      this.usdToUah = this.currencyJson.rates.UAH.toFixed(2);
      return this.usdToUah;
    });
  }

  convertEUR() {
    this.currencyData.getCurrencyData('EUR').subscribe((data) => {
      this.currencyJson = JSON.parse(JSON.stringify(data));
      this.eurToUah = this.currencyJson.rates.UAH.toFixed(2);
      return this.eurToUah;
    });
  }

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
