import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';
import { ChartService } from './chart.service';
import { BehaviorSubject } from 'rxjs';

// tslint:disable-next-line: one-variable-per-declaration
const margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.scss'],
})
export class NewChartComponent implements OnInit {
  @Input() data: BehaviorSubject<any> = new BehaviorSubject([]);

  svg: any;
  x: any;
  y: any;
  valueLine: any;
  hostElement: any;
  xAxis: any;
  yAxis: any;
  line: any;
  transition: any;

  constructor(
    private elRef: ElementRef,
  ) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    this.listenerData();
  }


  private createChart() {

    this.removeExistingChartFromParent();

    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.valueLine = d3.line()
      .curve(d3.curveCatmullRom)
      .x((d) => {
        return this.x(d.date);
      })
      .y((d) => {
        return this.y(d.close);
      });

    this.createXAxis();
    this.createYAxis();

  }

  createXAxis() {
  
    // const now = new Date();
    // now.setHours(0);
    // now.setMinutes(0);
    // now.setSeconds(0);

    // const nowEnd = new Date();
    // nowEnd.setHours(23);
    // nowEnd.setMinutes(59);
    // nowEnd.setSeconds(59);
    
    this.x = d3.scaleTime().range([0, width]);
    this.xAxis = d3.axisBottom()
      // .ticks(d3.timeSeconds(now, nowEnd), 1)
      .tickFormat(d3.timeFormat('%H:%M:%S'))
      .scale(this.x);
    this.svg.append('g')
      .attr('class', 'xAxis');
  }

  createYAxis() {
    this.y = d3.scaleLinear()
      .range([height, 0]);
    this.yAxis = d3.axisLeft()
      .tickSize(-width, 0)
      .scale(this.y);
    this.svg.append('g')
      .attr('class', 'yAxis');
  }

  listenerData() {
    this.data.subscribe(
      res => {
        if (!this.svg) {
          this.createChart();
          return;
        }
        this.updateChart(res);
      }
    );
  }

  private updateChart(data) {
    this.x.domain(
      d3.extent(data, (d) => {
        return d.date;
      })
    );

    this.y.domain([
      // 0,
      d3.min(data, (d) => {
        return d.close;
      }),
      d3.max(data, (d) => {
        return d.close;
      }),
    ]);

    this.svg
      .selectAll('.xAxis')
      .attr('transform', 'translate(0,' + (500 - 20 - 30) + ')')
      .transition()
      .duration(1000)
      .call(this.xAxis);
    this.svg
      .selectAll('.yAxis')
      .transition()
      .duration(300)
      .call(this.yAxis);

    this.line = this.svg
      .selectAll('.linePulse')
      // .datum(data);
      .data([data], (d) => {
        return d.close;
      });

    this.line.enter()
      .append('path')
      .attr('class', 'linePulse')
      .merge(this.line)
      .attr('d', this.valueLine)
      .attr('transform', null)
      .transition()
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3.5);

    // carga da datos por transicion
    
    // this.svg
    //   .selectAll('.linePulse')
    //   // .datum([data]);
    //   .data([data], (d) => {
    //     return d.close;
    //   });
    // this.transition = this.svg
    //   .selectAll('.linePulse')
    //   .transition()
    //   .duration(100)
    //   .ease('linear');
  }

  tick() {

  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }
}
