import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-leart-d3',
  templateUrl: './leart-d3.component.html',
  styleUrls: ['./leart-d3.component.scss']
})
export class LeartD3Component implements OnInit {
  dataset = [ 5, 10, 15, 20, 25];
  datasetBars = [];

  constructor() { }

  ngOnInit(): void {
    this.graficasEstaticas();
    this.construirCirculos();
    this.graficoBarras();
  }

  graficoBarras() {
    const margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };
    const w = 500 + margin.left + margin.right;
    const h = 100 + margin.top + margin.bottom;
    const wBard = w - margin.left - margin.right;
    const hBar = h - margin.top - margin.bottom;
    const padding = 2;
    let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    // const dataset = [ 5, 10, 15, 20, 25];

    const svg = d3.select('.contenido-bars-svg')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#fff')
      .style('padding', '1px');

    dataset = dataset.map(v => v * 4);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => {
        return i * (wBard / dataset.length) + margin.left;
      })
      .attr('y', (d: number) => {
        return hBar - d + margin.top;
      })
      .attr('width', wBard / dataset.length - padding)
      .attr('height', (d: number) => {
        return d;
      })
      .attr('fill', (d: number) => {
        const value = (d * 2.5);
        return `rgb(0, 0, ${value})`;
      });

    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text((d: number) => d)
      .attr('x', (d: number, i: number) => {
        return i * (wBard / dataset.length) + (wBard / dataset.length - padding) / 2 + margin.left;
      })
      .attr('y', (d: number) => {
        return hBar - d + 15 + margin.top;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white')
      .attr('text-anchor', 'middle');
  }

  construirCirculos() {
    const w = 500;
    const h = 50;
    // Generar SVGS
    const svg = d3.select('.contenido-svg')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#fff');

    const circles = svg
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle');

    circles
      .attr('cx', (d, i) => {
        return (i * 50) + 25;
      })
      .attr('cy', h / 2)
      .attr('r', (d) => {
        return d;
      })
      .attr('fill', 'yellow')
      .attr('stroke', 'orange')
      .attr('stroke-width', (d) => {
          return d / 2;
      });
  }

  graficasEstaticas() {
    // cambiar un texto
    d3.select('p').text('nuevo texto');

    // textos de colores
    d3.select('.contenido')
      .selectAll('p')
      .data(this.dataset)
      .enter()
      .append('p')
      .text((d) => {
        return `New paragraph! -> ${d}`;
      })
      .style('color', (d) => {
        return d > 10 ? 'red' : 'blue';
      });

    // barras
    this.generateDataGraphBars();
    d3.select('.contenido-barras')
      .selectAll('div')
      // .data(this.dataset)
      .data(this.datasetBars)
      .enter()
      .append('div')
      .style('display', 'inline-block')
      .style('width', '20px')
      .style('margin-left', '2px')
      .style('height', (d) => {
        return `${d * 5}px`;
      })
      .style('background-color', 'teal');
  }

  generateDataGraphBars() {
    for (let i = 0; i < 10; i++) {
      const numRandom = Math.round(Math.random() * 30);
      this.datasetBars.push(numRandom);
    }
  }
}
