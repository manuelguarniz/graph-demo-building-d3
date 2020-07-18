import { Component, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { NewChartComponent } from './components/new-chart/new-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  // @ViewChild('chartLine', { static: true }) chart: ChartLineComponent;
  @ViewChild('chart', { static: true }) chart: NewChartComponent;

  title = 'demo-d3';
  private refreshInterval: any;

  public data = [];

  ngAfterContentInit(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.generateData();
    this.chart.data = [...this.data];
    // this.chart.data = this.data;
    this.refreshInterval = setInterval(() => {
      // if (document.hasFocus()) {
        this.generateData();
        this.chart.data = [...this.data];
      // }
    }, 2000);
  }


  ngAfterViewInit(): void {
    // if (this.refreshInterval) {
    //   clearInterval(this.refreshInterval);
    // }

    // this.chart.data = [...this.data];
    // // this.chart.data = this.data;
    // this.refreshInterval = setInterval(() => {
    //   this.generateData();
    //   // this.chart.data = this.data;
    //   this.chart.data = [...this.data];
    // }, 1000);
  }

  generateData() {
    this.data = [
      { date: '1-May-12', close: 58.13 },
      { date: '30-Apr-12', close: 53.98 },
      { date: '27-Apr-12', close: 67.0 },
      { date: '26-Apr-12', close: 89.7 },
      { date: '25-Apr-12', close: 99.0 },
      { date: '24-Apr-12', close: 130.28 },
      { date: '23-Apr-12', close: 166.7 },
      { date: '20-Apr-12', close: 234.98 },
      { date: '19-Apr-12', close: 345.44 },
      { date: '18-Apr-12', close: 443.34 },
      { date: '17-Apr-12', close: 543.7 },
      { date: '16-Apr-12', close: 580.13 },
      { date: '13-Apr-12', close: 605.23 },
      { date: '12-Apr-12', close: 622.77 },
      { date: '11-Apr-12', close: 626.2 },
      { date: '10-Apr-12', close: 628.44 },
      { date: '9-Apr-12', close: 636.23 },
      { date: '5-Apr-12', close: 633.68 },
      { date: '4-Apr-12', close: 624.31 },
      { date: '3-Apr-12', close: 629.32 },
      { date: '2-Apr-12', close: 618.63 },
      { date: '30-Mar-12', close: 599.55 },
      { date: '29-Mar-12', close: 609.86 },
      { date: '28-Mar-12', close: 617.62 },
      { date: '27-Mar-12', close: 614.48 },
      { date: '26-Mar-12', close: 606.98 },
    ];
    this.data.forEach(item => {
      item.close = (item.close * Math.random() + 1) * 100;
    });
  }
}
