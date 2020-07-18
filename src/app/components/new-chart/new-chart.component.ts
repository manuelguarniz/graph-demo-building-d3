import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';

// tslint:disable-next-line: one-variable-per-declaration
const margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.scss'],
})
export class NewChartComponent implements OnInit, OnChanges {
  @Input() data: any;

  svg: any;
  x: any;
  y: any;
  valueLine: any;
  hostElement: any;
  xAxis: any;
  yAxis: any;
  line: any;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void { }

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
      .x((d) => {
        return this.x(d.date);
      })
      .y((d) => {
        return this.y(d.close);
      });

    // this.xAxis = d3.axisBottom(this.x).ticks(5);
    // this.yAxis = d3.axisLeft(this.y).ticks(5);
    this.x = d3.scaleTime().range([0, width]);
    this.xAxis = d3.axisBottom().scale(this.x);
    this.svg.append('g')
      .attr('class', 'xAxis');

    this.y = d3.scaleLinear().range([height, 0]);
    this.yAxis = d3.axisLeft().scale(this.y);
    this.svg.append('g')
      .attr('class', 'yAxis');

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (!this.svg) {
        this.createChart();
        return;
      }
      this.updateChart(changes.data.currentValue);
    }
  }

  private updateChart(data) {
    const parseTime = d3.timeParse('%d-%b-%y');

    data.forEach((d) => {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

    this.x.domain(
      d3.extent(data, (d) => {
        return d.date;
      })
    );
    this.y.domain([
      0,
      d3.max(data, (d) => {
        return d.close;
      }),
    ]);

    this.svg
      .selectAll('.xAxis')
      .attr('transform', 'translate(0,' + (500 - 20 - 30) + ')')
      // .call(d3.axisBottom(this.x));
      .transition()
      .duration(1000)
      .call(this.xAxis);
    this.svg
      .selectAll('.yAxis')
      // .call(d3.axisLeft(this.y));
      .transition()
      .duration(1000)
      .call(this.yAxis);

    this.line = this.svg
      .selectAll('.linePulse')
      .data([data], (d) => {
        return d.close;
      });

    this.line.enter()
      .append('path')
      .attr('class', 'linePulse')
      .merge(this.line)
      .transition()
      .duration(1000)
      .attr('d', this.valueLine)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2.5);

    // this.svg.append('path')
    //   .data([data])
    //   .attr('class', 'line')
    //   .attr('d', this.valueLine);

  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }
}
