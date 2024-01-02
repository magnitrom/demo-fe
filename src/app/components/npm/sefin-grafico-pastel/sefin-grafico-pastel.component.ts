import { Component, Input, OnInit } from '@angular/core';
import { PastelSeriesModel } from 'src/app/models/charts.model';


/* Una función de decorador que especifica los metadatos de Angular para el componente. */
@Component({
  selector: 'app-sefin-grafico-pastel',
  templateUrl: './sefin-grafico-pastel.component.html',
  styleUrls: ['./sefin-grafico-pastel.component.scss']
})

/* Esta clase es un componente que recibe datos del componente principal y los muestra en un gráfico circular
cuadro. */
export class SefinGraficoPastelComponent implements OnInit {
  @Input() id?: string;
  @Input() color?: string[];
  @Input() data?: PastelSeriesModel;

  options:any = {

    color: ['#3398DB','#052c69' , '#8d7435', '#545454', "#dcd2a3"],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  };


  constructor() { /* constructor */ }

 
  ngOnInit(): void {
    this.options.series[0].data = this.data;
    if(this.color && this.color.length > 0){
      this.options.color = this.color;
    }
  }

}
