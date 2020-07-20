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

    // Generar SVGS
    d3.select('.contenido-svg')
      .append('svg')
      .attr('width', 500)
      .attr('height', 50)
      .style('background-color', 'green');
  }

  generateDataGraphBars() {
    for (let i = 0; i < 10; i++) {
      const numRandom = Math.round(Math.random() * 30);
      this.datasetBars.push(numRandom);
    }
  }
}
