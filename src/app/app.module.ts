import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { CurrentRateComponent } from './current-rate/current-rate.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CurrentRateComponent,
    FooterComponent,
     
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
