import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() data: any;
  hostElement: any;
  margin: any;
  width: any;
  height: any;
  parseDate: any;
  x: any;
  y: any;
  xAxis: any;
  yAxis: any;
  valueLine: any;
  svg: any;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (!this.svg) {
        this.initGraph();
        // return;
      }
      this.buildGraph(changes.data.currentValue);
    }
  }

  initGraph() {

    this.removeExistingChartFromParent();

    this.margin = { top: 30, right: 20, bottom: 30, left: 50 };
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.parseDate = d3.timeParse('%d-%b-%y');

    this.x = d3.scaleTime().range(() => [0, this.width]);
    this.y = d3.scaleLinear().range(() => [this.height, 0]);

    this.xAxis = d3.axisBottom(() => this.x).ticks(5);
    this.yAxis = d3.axisLeft(() => this.y).ticks(5);

    this.valueLine = d3
      .line()
      .x((d) => {
        // return () => this.x(d.date1);
        console.log(d.date1, 'x');
        return this.x(d.date1);
      }) //  <= Change to date1
      .y((d) => {
        console.log(d.close, 'y');
        // return () => this.y(d.close);
        return this.y(d.close);
      });

    this.svg = d3
      .select(this.hostElement)
      .append('svg')
      .attr('width', () => this.width + this.margin.left + this.margin.right)
      .attr('height', () => this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        () => `translate(${this.margin.left},${this.margin.top})`
      );
  }

  buildGraph(dataIn) {
    dataIn.forEach((d) => {
      d.date1 = this.parseDate(d.date); //  <= Change to date1
      d.close = +d.close;
    });

    this.x.domain(
      d3.extent(
        dataIn,
        (d) => {
          return d.date1;
        }
      )
    );
    this.y.domain([
      0,
      d3.max(
        dataIn,
        (d) => {
          return d.close;
        }
      ),
    ]);

    this.svg
      .append('path')
      .data([dataIn])
      // .data(() => {
      //   console.log(this.data);
      //   return [this.data];
      //   // return this.data;
      // })
      // .enter()
      .attr('class', 'line')
      // .attr('d', d3
      //             .line()
      //             .x((d) => () => this.x(d.date1))
      //             .y((d) => () => this.y(d.close)));
      // .transition()
      // .duration(1000)
      .attr('d', () => this.valueLine());
      // .attr('d', () => {
      //   return this.valueLine();
      // });

    this.svg
      .append('g')
      // .attr('class', 'x axis')
      .attr('transform', () => `translate(0,${this.height})`)
      // .call(() => this.xAxis);
      .call(d3.axisBottom(() => this.x));

    // Add the Y Axis
    this.svg
      .append('g')
      // .attr('class', 'y axis')
      // .call(() => this.yAxis);
      .call(d3.axisLeft(() => this.y));
  }

  initialize() {
    this.margin = { top: 30, right: 20, bottom: 30, left: 50 };
    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 270 - this.margin.top - this.margin.bottom;
    this.parseDate = d3.timeParse('%d-%b-%y');
  }

  createChart() {
    this.initialize();

    this.createXAxis();
    this.createYAxis();

    // this.valueLine = d3.svg
    this.valueLine = d3
      .line()
      .x((d) => {
        return this.x(d.date1);
      }) //  <= Change to date1
      .y((d) => {
        return this.y(d.close);
      });

    this.setChartDimension();
  }

  updateData() {
    const dataIn = this.data;
    this.removeExistingChartFromParent();

    dataIn.forEach((d) => {
      d.date1 = this.parseDate(d.date); //  <= Change to date1
      d.close = +d.close;
    });

    this.x.domain(
      d3.extent(
        dataIn,
        (d) => {
          return d.date1;
        }
      )
    );
    this.y.domain([
      0,
      d3.max(
        dataIn,
        (d) => {
          return d.close;
        }
      ),
    ]);

    this.svg
      .append('path')
      .data([dataIn])
      .enter()
      .attr('class', 'line')
      .attr('d', () => this.valueLine());

    this.svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', () => `translate(0,${this.height})`)
      .call(() => this.xAxis);

    // Add the Y Axis
    this.svg
      .append('g')
      .attr('class', 'y axis')
      .call(() => this.yAxis);
  }

  setChartDimension() {
    this.svg = d3
      // .select('body')
      .select(this.hostElement)
      .append('svg')
      .attr('width', () => this.width + this.margin.left + this.margin.right)
      .attr('height', () => this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        () => `translate(${this.margin.left},${this.margin.top})`
      );
  }

  createXAxis() {
    // this.x = d3.time.scale().range(() => [0, this.width]);
    this.x = d3.scaleTime().range(() => [0, this.width]);

    // this.xAxis = d3.svg.axis().scale(() => this.x).orient('bottom').ticks(5);
    this.xAxis = d3.axisBottom(() => this.x).ticks(5);
    // .tickSize(5);
    // .tickFormat('' as any);
  }

  createYAxis() {
    this.y = d3.scaleLinear().range(() => [this.height, 0]);

    // this.yAxis = d3.svg.axis().scale(() => this.y).orient('left').ticks(5);
    this.yAxis = d3.axisLeft(() => this.y).ticks(5);
    // .tickSize(5);
    // .tickFormat('' as any);
  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }
}
