import { Pipe, PipeTransform } from '@angular/core';
import { ConsolidadoOrigenPago } from '../models/ConsolidadoOrigenPago.interface';

@Pipe({
  name: 'canalPago'
})
export class CanalPagoPipe implements PipeTransform {

  transform(listaDeDatos: ConsolidadoOrigenPago[], canalPago:string ){

    if (!listaDeDatos ||  !canalPago || canalPago == 'Ninguno' || canalPago == undefined) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => JSON.stringify(item).toLowerCase().indexOf(canalPago.toLowerCase()) !== -1)
   

  }

}
