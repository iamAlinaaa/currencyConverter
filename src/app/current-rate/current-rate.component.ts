import { Component } from '@angular/core';
import { ApidataService } from '../services/apidata.service';

@Component({
  selector: 'app-current-rate',
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.css']
})
export class CurrentRateComponent {

  currencyJson: any = [];
  // for UAH USD EUR live rates
  usdToUah = this.convertUSD();
  eurToUah = this.convertEUR();

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

}
