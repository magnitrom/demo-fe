import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.scss']
})
export class RelojComponent  implements OnInit, OnDestroy {
  currentDateTime: string = '';
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      const now = moment();
      this.currentDateTime = now.locale('es').format('dddd, D [de] MMMM [de] YYYY, hh:mm:ss A');
    }, 1000); // Actualiza la fecha y hora cada segundo
  }

  ngOnDestroy() {
    clearInterval(this.timer); // Limpia el intervalo cuando el componente se destruye
  }
}
