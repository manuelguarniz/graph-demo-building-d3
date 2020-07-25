import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { StrucData } from './chart-item.interface';

@Component({
  selector: 'app-chart-live',
  templateUrl: './chart-live.component.html',
  styleUrls: ['./chart-live.component.scss']
})
export class ChartLiveComponent implements OnInit {
  margin = { top: 20, right: 20, bottom: 50, left: 50 };
  width = 550 - this.margin.left - this.margin.right;
  height = 550 - this.margin.top - this.margin.bottom;

  indexOriginData = 0;
  originData: StrucData[] = [];
  data = [
  ];
  // width = 500;
  // height = 500;
  globalX = 0;
  duration = 500; // frecuencia
  // max = 500;
  max = this.height - this.margin.bottom;
  step = 10;
  svg: any;
  x: any;
  y: any;
  line: any;
  smoothLine: any;
  lineArea: any;
  xAxis: any;
  axisX: any;
  axisY: any;
  path: any;
  areaPath: any;

  yAxis: any;

  constructor() { }

  ngOnInit(): void {
    // this.readJsonFile();
    this.initialize();
  }

  readJsonFile() {
    d3.json('assets/csv/trama-2.json').then(
      res => {
        this.originData = res.t.map((value, index) => {
          return {
            x: value,
            y: res.Flujo[index]
          };
        });

        console.log(this.originData);

      }
    );
  }

  initialize() {
    this.x = d3.scaleLinear()
      .domain([0, 500])
      // .domain([0, this.width - this.margin.left - this.margin.right])
      .range([0, this.width - this.margin.left]);
      // .range([0, 500]);
    this.y = d3.scaleLinear()
      // .domain([0, 500])
      // .range([500, 0]);
      // .domain([0, this.height - this.margin.bottom])
      .domain([this.getMinValue(), this.getMaxValue()])
      .range([this.width - this.margin.left, this.margin.right]);

    this.svg = d3.selectAll('.container')
      .append('svg')
      .attr('viewBox', [0, 0, this.width, this.height]);
    // .attr('width', this.width + 50)
    // .attr('height', this.height + 50);

    // this.svg.append('g')
    //   .attr('class', 'xAxis');
    // this.svg.append('g')
    //   .attr('class', 'yAxis');

    this.line = d3.line()
      .x((d) => this.x(d.x))
      .y((d) => this.y(d.y));

    this.smoothLine = d3.line().curve(d3.curveCardinal)
      .x((d) => this.x(d.x))
      .y((d) => this.y(d.y));

    this.lineArea = d3.area()
      .x((d) => this.x(d.x))
      .y0(this.y(0))
      .y1((d) => this.y(d.y))
      .curve(d3.curveCardinal);

    this.createXAxis();
    this.createYAxis();

    // this.chart.append('path').datum([{ x: 0, y: 150 }, { x: 500, y: 150 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);
    // this.chart.append('path').datum([{ x: 0, y: 300 }, { x: 500, y: 300 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);
    // this.chart.append('path').datum([{ x: 0, y: 450 }, { x: 500, y: 450 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);
    // this.chart.append('path').datum([{ x: 50, y: 0 }, { x: 50, y: 500 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);
    // this.chart.append('path').datum([{ x: 250, y: 0 }, { x: 250, y: 500 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);
    // this.chart.append('path').datum([{ x: 450, y: 0 }, { x: 450, y: 500 }])
    //   .attr('class', 'grid')
    //   .attr('d', this.line);

    this.path = this.svg.append('path');
    this.areaPath = this.svg.append('path');

    this.tick();
  }
  tick() {
    const point = {
      x: this.globalX,
      y: ((Math.random() * (this.height - this.margin.bottom)) >> 0)
    };
    console.log(point);
    this.data.push(point);
    this.globalX += this.step;

    // if (this.indexOriginData >= 60) {
    //   this.indexOriginData = 0;
    // }

    // const currentData = this.originData[this.indexOriginData];

    // this.data.push(currentData);

    this.indexOriginData++;

    this.path.datum(this.data)
      .attr('class', 'smoothline')
      .attr('d', this.smoothLine);
    this.areaPath.datum(this.data)
      .attr('class', 'area')
      .attr('d', this.lineArea);

    // Update X
    this.x.domain([this.globalX - (this.max - this.step), this.globalX]);
    this.axisX.transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .call(this.xAxis);

    // Update Y
    this.y.domain([this.getMinValue(), this.getMaxValue()]);
    this.axisY.transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .call(this.yAxis);

    this.path.attr('transform', null)
      .transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + this.x(this.globalX - this.max) + ')');

    this.areaPath.attr('transform', null)
      .transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + this.x(this.globalX - this.max) + ')')
      .on('end', () => this.tick());

    if (this.data.length > 50) {
      this.data.shift();
    }
  }

  createXAxis() {
    this.xAxis = d3.axisBottom().scale(this.x);
    // this.axisX = this.svg.append('g').attr('class', 'x axis')
    //   .attr('transform', 'translate(0, 500)')
    //   .call(this.xAxis);

    this.axisX = this.svg.append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(${this.margin.left},${this.height - this.margin.bottom})`)
      .call(this.xAxis);
  }


  createYAxis() {
    this.y = d3
      .scaleLinear()
      .domain([this.getMinValue(), this.getMaxValue()])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.yAxis = g => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.y));

    this.axisY = this.svg.append('g')
      .attr('class', 'yAxis')
      .call(this.yAxis);
  }

  getMaxValue(): number {
    let maxValue = 1000;
    if (this.data && this.data.length > 0) {
      let lstValues = Array.from(new Set(this.data.map(item => item.y)));
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
      let lstValues = Array.from(new Set(this.data.map(item => item.y)));
      lstValues = lstValues.sort((value1, value2) => value1 - value2);
      if (lstValues && lstValues.length > 0) {
        minValue = lstValues[0] > 0 ? 0 : lstValues[0];
      }
    }
    return minValue;
  }
}
