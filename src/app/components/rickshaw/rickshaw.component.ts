import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-rickshaw',
  templateUrl: './rickshaw.component.html',
  styleUrls: ['./rickshaw.component.scss'],
})
export class RickshawComponent implements OnInit, AfterViewInit {
  // margin = ({top: 20, right: 30, bottom: 34, left: 0});
  margin = { top: 20, right: 20, bottom: 30, left: 30 };
  width = 960 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  // height = 500;
  // yAxis: any;

  // dat: any;

  svg: any;
  curve: any;
  area: any;
  xAxis: any;
  yAxis: any;
  y: any;
  x: any;
  data: any;
  chart: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.chartGraph();
  }

  ngOnInit(): void {
    this.loadData();
    this.init();
  }

  loadData() {
    // Object.assign((d3.csvParse(await FileAttachment("aapl.csv").text(), d3.autoType)).map(({date, close}) => {


    //   return ({date, value: close})
    // }), {y: "$ Close"});
    d3.csv('assets/csv/aapl.csv').then((res) => {
      this.data = Object.assign(res.map(({ date, close }) => {
        return { date, value: close };
      }), {y: '$ Close'});
      console.log(this.data);
    });
  }

  init() {
    this.svg = d3
      .create('svg')
      .attr('viewBox', [0, 0, this.width, this.height]);
    this.svg.append('g')
      .attr('class', 'xAxis');
    this.svg.append('g')
      .attr('class', 'yAxis');

    this.x = d3
      .scaleUtc()
      .domain(d3.extent(() => this.data, (d) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    this.y = d3
      .scaleLinear()
      .domain([0, d3.max(() => this.data, (d) => d.value)])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.xAxis = this.svg.selectAll('.xAxis')
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .call(
          d3
            .axisBottom(this.x)
            .ticks(this.width / 80)
            .tickSizeOuter(0)
        );

    this.yAxis = this.svg.selectAll('.yAxis')
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(d3.axisLeft(this.y))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(() => this.data.y)
        );

    this.curve = d3.curveLinear;

    this.area = d3
      .area()
      .curve(this.curve)
      .x((d) => this.x(d.date))
      .y0(this.y(0))
      .y1((d) => this.y(d.value));

  }

  chartGraph() {
    this.svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'steeple')
      .attr('d', () => this.area);

    // svg.append('g').call(this.xAxis);
    this.svg.selectAll('.xAxis').call(this.xAxis);

    this.svg.selectAll('.yAxis').call(this.yAxis);

    return this.svg.node();
  }
}
