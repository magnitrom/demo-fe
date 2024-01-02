import { Pipe, PipeTransform } from '@angular/core';
import { ConsolidadoOrigenPago } from '../models/ConsolidadoOrigenPago.interface';

@Pipe({
  name: 'origenPago'
})
export class OrigenPagoPipe implements PipeTransform {

  transform(listaDeDatos: ConsolidadoOrigenPago[], origenPago:string | undefined) {

    if (!listaDeDatos ||  !origenPago || origenPago === 'Ninguno' || origenPago == undefined) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => item.origenPago === origenPago)

  }

}
