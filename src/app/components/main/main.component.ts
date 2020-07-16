import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { ChartEmptyComponent } from '../chart-empty/chart-empty.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('areaChart', { static: true }) chart: ChartEmptyComponent;

  public chartData = [];

  refreshInterval;

  constructor() {}

  ngAfterContentInit(): void {
    this.initialize();
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  initialize() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.chart.data = [...this.chartData];

    this.refreshInterval = setInterval(() => {
      if (document.hasFocus()) {
        this.chart.data = [...this.chartData];
      }
    }, 1000);
  }

  ngOnInit(): void {
    const data = [8, 4, 10, 8, 8, 4, 100, 6, 8, 4, 70, 6, 10, 11, 8, 4, 6, 10, 4, 6, 9, 8, 50, 8, 8, 7, 9, 8, 7, 9, 3, 8, 4, 8, 1, 12, 11, 7, 9, 6, 10, 11, 10, 12, 7, 7, 8];

    const d1 = [
      -9.797174393178826e-15,
      6.27672765822755,
      12.514757203218458,
      18.675629108472457,
      24.721359549995817,
      30.614674589207173,
      36.31923997916377,
      41.799885177275954,
      47.02282018339787,
      51.95584386641471,
      56.56854249492384,
      60.83247724800253,
      64.72135954999584,
      68.21121314832739,
      71.28052193506946,
      73.91036260090297,
      76.0845213036123,
      77.78959363181413,
      79.01506724761103,
      79.75338669865025,
      80.0,
      79.75338669865023,
      79.015067247611,
      77.78959363181409,
      76.08452130361225,
      73.9103626009029,
      71.28052193506937,
      68.21121314832729,
      64.72135954999571,
      60.83247724800242,
      56.56854249492372,
      51.95584386641457,
      47.02282018339769,
      41.79988517727577,
      36.31923997916357,
      30.61467458920697,
      24.72135954999561,
      18.67562910847228,
      12.514757203218279,
      6.276727658227367,
      -0.0,
      -6.2573786016092345,
      -12.360679774997896,
      -18.159619989581874,
      -23.511410091698927,
      -28.2842712474619,
      -32.3606797749979,
      -35.640260967534715,
      -38.04226065180614,
      -39.507533623805514,
      -40.0,
      -39.50753362380551,
      -38.04226065180614,
      -35.640260967534715,
      -32.3606797749979,
      -28.284271247461902,
      -23.51141009169893,
      -18.15961998958186,
      -12.3606797749979,
      -6.257378601609239
  ];

    this.chartData.push(d1);
    setInterval(() => {
      if (document.hasFocus()) {
        this.chart.data = [...this.chartData];
      }
    }, 1000);
  }
}
