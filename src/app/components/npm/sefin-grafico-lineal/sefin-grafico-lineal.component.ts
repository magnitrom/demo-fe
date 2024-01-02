import { Component, Input, OnInit } from '@angular/core';


/* Funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-sefin-grafico-lineal',
  templateUrl: './sefin-grafico-lineal.component.html',
  styleUrls: ['./sefin-grafico-lineal.component.scss']
})

/* Es un componente que recibe un id, un título, una matriz de valores del eje x y una matriz de valores del eje y
valores, y luego crea un gráfico de líneas con esos valores. */

export class SefinGraficoLinealComponent implements OnInit {
  @Input() id?: string;
  @Input() title?: string;
  @Input() xSeries?: any[];
  @Input() data?: any[];

  chartLine:any = {
    title: {
      text: ''
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ]
  };

  constructor() { /* constructor */ }

 /**
  
* La función se llama cuando se inicializa el componente. Establece el título, los datos del eje x y
  * datos de serie del gráfico.
  */
  ngOnInit(): void {
    this.chartLine.title.text = this.title;
    this.chartLine.xAxis.data = this.xSeries;
    this.chartLine.series[0].data = this.data;
  }

}
