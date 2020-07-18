import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ChartEmptyComponent } from './components/chart-empty/chart-empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { NewChartComponent } from './components/new-chart/new-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChartEmptyComponent,
    ChartLineComponent,
    NewChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
