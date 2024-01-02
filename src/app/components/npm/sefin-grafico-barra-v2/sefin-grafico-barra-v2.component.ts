import { Component, Input, OnInit } from '@angular/core';
import { Vertical2EjeXModel, VerticalSeriesModel } from 'src/app/models/charts.model';

/* Un decorador. Es una función que agrega metadatos a una clase, sus miembros o los argumentos de su método. */
@Component({
  selector: 'app-sefin-grafico-barra-v2',
  templateUrl: './sefin-grafico-barra-v2.component.html',
  styleUrls: ['./sefin-grafico-barra-v2.component.scss']
})
/* Es un componente que recibe una entrada y establece las opciones de un gráfico de barras. */

export class SefinGraficoBarraV2Component implements OnInit {
  @Input() id?: string;
  @Input() color?: string[];
  @Input() xSeries?: Vertical2EjeXModel;
  @Input() data?: VerticalSeriesModel;

  options:any = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [],
  };


  constructor() { /* constructor */ }


  ngOnInit(): void {
    this.options.yAxis.data = this.xSeries;
    this.options.series = this.data;
    if(this.color && this.color.length > 0){
      this.options.color = this.color;
    }
  }

}
