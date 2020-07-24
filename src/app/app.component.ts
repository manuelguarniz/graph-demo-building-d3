import {
  Component,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { NewChartComponent } from './components/new-chart/new-chart.component';
import { ChartService } from './components/new-chart/chart.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  // @ViewChild('chart', { static: true }) chart: NewChartComponent;

  name: string;

  title = 'demo-d3';
  private refreshInterval: any;
  step = 0;

  public data: EventEmitter<any[]> = new EventEmitter();
  private persistenceData = [];

  constructor(
    private chartService: ChartService,
    private appService: AppService,
  ) {}

  ngOnInit(): void {
  }

  changeModel(value: string) {
    // this.appService.setName(value);
  }

  ngAfterContentInit(): void {
    // this.runStaticData();
    this.runDynamicData();
    // this.runStepData();
  }

  runDynamicData() {
    // this.chart.data = [];
    this.chartService.liveTrama().subscribe(
      res => {
        if (this.persistenceData.length === (10 * 6)) {
          this.persistenceData = [];
        }
        this.persistenceData.push(...res);

        // console.log(this.persistenceData.map(item => item.date));

        // this.chart.data = res;
        if (document.hasFocus()) {
          this.data.next(this.persistenceData);
        }
        // this.data.next(res);
        // console.log(res);
      }
    );
  }

  // runStepData() {
  //   if (this.refreshInterval) {
  //     clearInterval(this.refreshInterval);
  //   }
  //   this.chart.data = [];
  //   this.refreshInterval = setInterval(() => {
  //     this.chartService.tramasBySteps(this.step).subscribe(
  //       res => {
  //         console.log(res);
  //         this.chart.data = [...res];
  //       }
  //     );
  //     this.step++;
  //     if (this.step > 10) {
  //       this.step = 0;
  //     }
  //   }, 2000);
  // }

  // runStaticData() {
  //   if (this.refreshInterval) {
  //     clearInterval(this.refreshInterval);
  //   }

  //   this.generateData();
  //   this.chart.data = [];
  //   // this.getTramas();
  //   // this.chart.data = this.data;
  //   this.refreshInterval = setInterval(() => {
  //     // if (document.hasFocus()) {
  //     this.generateData();
  //     this.chart.data = [...this.data];
  //     // }
  //   }, 2000);
  // }

  // generateData() {
  //   this.data = [
  //     { date: '1-May-12', close: 58.13 },
  //     { date: '30-Apr-12', close: 53.98 },
  //     { date: '27-Apr-12', close: 67.0 },
  //     { date: '26-Apr-12', close: 89.7 },
  //     { date: '25-Apr-12', close: 99.0 },
  //     { date: '24-Apr-12', close: 130.28 },
  //     { date: '23-Apr-12', close: 166.7 },
  //     { date: '20-Apr-12', close: 234.98 },
  //     { date: '19-Apr-12', close: 345.44 },
  //     { date: '18-Apr-12', close: 443.34 },
  //     { date: '17-Apr-12', close: 543.7 },
  //     { date: '16-Apr-12', close: 580.13 },
  //     { date: '13-Apr-12', close: 605.23 },
  //     { date: '12-Apr-12', close: 622.77 },
  //     { date: '11-Apr-12', close: 626.2 },
  //     { date: '10-Apr-12', close: 628.44 },
  //     { date: '9-Apr-12', close: 636.23 },
  //     { date: '5-Apr-12', close: 633.68 },
  //     { date: '4-Apr-12', close: 624.31 },
  //     { date: '3-Apr-12', close: 629.32 },
  //     { date: '2-Apr-12', close: 618.63 },
  //     { date: '30-Mar-12', close: 599.55 },
  //     { date: '29-Mar-12', close: 609.86 },
  //     { date: '28-Mar-12', close: 617.62 },
  //     { date: '27-Mar-12', close: 614.48 },
  //     { date: '26-Mar-12', close: 606.98 },
  //   ];
  //   this.data.forEach((item) => {
  //     item.close = (item.close * Math.random() + 1) * 100;
  //   });
  // }
}
