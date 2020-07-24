import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ChartEmptyComponent } from './components/chart-empty/chart-empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { NewChartComponent } from './components/new-chart/new-chart.component';
import { ChartService } from './components/new-chart/chart.service';
import { HttpClientModule } from '@angular/common/http';
import { LeartD3Component } from './components/leart-d3/leart-d3.component';
import { RickshawComponent } from './components/rickshaw/rickshaw.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChartEmptyComponent,
    ChartLineComponent,
    NewChartComponent,
    LeartD3Component,
    RickshawComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [
    ChartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
