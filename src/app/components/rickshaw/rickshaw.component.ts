import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

interface DataCsv {
  date: Date;
  value: number;
}

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

  loadingData = false;
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
  data: { date: Date, value: number }[] = [];
  chart: any;
  valueline: any;

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    d3.csv('assets/csv/trama.csv').then((res) => {
      this.data = Object.assign(res.map(({ date, close }) => {
        const nowStr = `${moment(new Date()).format('YYYY-MM-DD')} ${date}`;
        // const newDate = moment(date, 'YYYY-MM-DD').toDate().getTime();

        return { date: moment(nowStr, 'YYYY-MM-DD HH:mm:ss.SSSSSS').toDate(), value: +close };
      }), { y: '$ Close' });

      this.init();
      this.chartGraph();
    });
  }

  init() {
    this.svg = d3
      .select('.container')
      .append('svg')
      .attr('viewBox', [0, 0, this.width, this.height]);
    this.svg.append('g')
      .attr('class', 'xAxis');
    this.svg.append('g')
      .attr('class', 'yAxis');

    this.x = d3
      // .scaleUtc()
      .scaleTime()
      .domain(d3.extent(this.data, (d) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    this.y = d3
      .scaleLinear()
      // .domain([0, d3.max(this.data, (d) => d.value)])
      .domain([this.getMinValue(), this.getMaxValue()])
      // .domain([0, 1000])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    // this.xAxis = this.svg.selectAll('.xAxis')
    this.xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(
        d3
          .axisBottom(this.x)
          .ticks(this.width / 80)
          .tickSizeOuter(0)
      );

    // this.yAxis = this.svg.selectAll('.yAxis')
    this.yAxis = g => g
      // .attr("class", "grid")
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.y))
    // .call((g) => g.select('.domain').remove())
    // .call((g) =>
    //   g
    //     .select('.tick:last-of-type text')
    //     .clone()
    //     .attr('x', 3)
    //     .attr('text-anchor', 'start')
    //     .attr('font-weight', 'bold')
    //     .text(this.data.y)
    // );

    this.curve = d3.curveLinear;

    this.area = d3
      .area()
      .curve(this.curve)
      .x((d) => this.x(d.date))
      .y0(this.y(0))
      .y1((d) => this.y(d.value));

    this.valueline = d3.line()
      .x((d) => this.x(d.date))
      .y((d) => this.y(d.value));

  }

  chartGraph() {
    this.svg.append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      // .attr('x1', 0).attr('y1', this.y(this.getMinValue()))
      .attr('x1', 0).attr('y1', this.y(0))
      .attr('x2', 0).attr('y2', this.y(this.getMaxValue()))
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(255, 255, 0, 0)' },
        { offset: '15%', color: 'rgba(255, 255, 0, .1)' },
        { offset: '30%', color: 'rgba(255, 255, 0, .25)' },
        { offset: '45%', color: 'rgba(255, 255, 0, .3)' },
        { offset: '55%', color: 'rgba(255, 255, 0, .4)' },
        { offset: '60%', color: 'rgba(255, 255, 0, .5)' },
        { offset: '100%', color: 'rgba(255, 255, 0, .6)' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    this.svg
      .append('path')
      .datum(this.data)
      // .attr('fill', 'steeple')
      .attr('class', 'area-custom-color')
      .attr('d', this.area);

    this.svg
      .append('path')
      .data([this.data])
      .attr('class', 'line')
      .attr('d', this.valueline);

    // svg.append('g').call(this.xAxis);
    this.svg.selectAll('.xAxis').call(this.xAxis);

    this.svg.selectAll('.yAxis').call(this.yAxis);

    return this.svg.node();
  }

  getMaxValue(): number {
    let maxValue = 100;
    if (this.data && this.data.length > 0) {
      let lstValues = Array.from(new Set(this.data.map(item => item.value)));
      lstValues = lstValues.sort((value1, value2) => value2 - value1);
      if (lstValues && lstValues.length > 0) {
        maxValue = lstValues[0];
      }
    }
    return maxValue;
  }

  getMinValue(): number {
    let minValue = 0;
    if (this.data && this.data.length > 0) {
      let lstValues = Array.from(new Set(this.data.map(item => item.value)));
      lstValues = lstValues.sort((value1, value2) => value1 - value2);
      if (lstValues && lstValues.length > 0) {
        minValue = lstValues[0] > 0 ? 0 : lstValues[0];
      }
    }
    return minValue;
  }
}
