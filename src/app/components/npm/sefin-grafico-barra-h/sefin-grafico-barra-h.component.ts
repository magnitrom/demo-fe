import { Component, Input, OnInit } from '@angular/core';

/* Una función decoradora que usa el objeto de metadatos, donde definimos el selector, templateUrl y
Propiedades styleUrls. */
@Component({
  selector: 'app-sefin-grafico-barra-h',
  templateUrl: './sefin-grafico-barra-h.component.html',
  styleUrls: ['./sefin-grafico-barra-h.component.scss']
})

/* Es un componente que recibe algunos datos y muestra un gráfico de barras */
export class SefinGraficoBarraHComponent implements OnInit {
  @Input() id?: string;
  @Input() title?: string;
  @Input() color?: string[];
  @Input() ySeries?: any[];
  @Input() data?: any[];

  options:any = {
    title: {
      text: ''
    },
    color: ['#3398DB','#052c69'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: []
  };

  constructor() { /* constructor */ }

  /**
   *
La función ngOnInit() se llama cuando se inicializa el componente. Establece el título, eje y
   * datos y datos de serie para el gráfico.
   */
  ngOnInit(): void {
    this.options.title.text = this.title;
    this.options.yAxis.data = this.ySeries;

    this.data?.forEach(e => e.type = 'bar');
    this.options.series = this.data;
    if(this.color && this.color.length > 0){
      this.options.color = this.color;
    }
  }

}
