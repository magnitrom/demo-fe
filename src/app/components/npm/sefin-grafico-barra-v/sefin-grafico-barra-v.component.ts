import { Component, Input, OnInit } from '@angular/core';
import { VerticalEjeYModel, VerticalSeriesModel } from 'src/app/models/charts.model';


/* Una función que especifica los metadatos de Angular para el componente. */
@Component({
  selector: 'app-sefin-grafico-barra-v',
  templateUrl: './sefin-grafico-barra-v.component.html',
  styleUrls: ['./sefin-grafico-barra-v.component.scss']
})
/* Un componente que se utiliza para mostrar un gráfico de barras. */
export class SefinGraficoBarraVComponent implements OnInit {
  @Input() id?: string;
  @Input() color?: string[];
  @Input() ySeries?: VerticalEjeYModel;
  @Input() data?: VerticalSeriesModel;

  options:any = {
    color: ['#3398DB','#052c69'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#052c69'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: 'Temperature',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: []
  };

  constructor() { /* constructor */ }

 /**
* La función se llama cuando se inicializa el componente. Establece las etiquetas del eje y y los datos para
  * se mostrará en el gráfico. También establece el color del gráfico si se establece el atributo de color.
  */
  ngOnInit(): void {
    this.options.yAxis.data = this.ySeries;
    this.options.series = this.data;
    if(this.color && this.color.length > 0){
      this.options.color = this.color;
    }
  }

}
