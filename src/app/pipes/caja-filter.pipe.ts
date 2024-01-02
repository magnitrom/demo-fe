import { Pipe, PipeTransform } from '@angular/core';
import { Cajainstitucional } from '../models/TiposCajaInstitucional/Cajainstitucional.interface';

@Pipe({
  name: 'cajaFilter'
})
export class CajaFilterPipe implements PipeTransform {

  transform(listaDeDatos: Cajainstitucional[], idBusqueda:string) {

    if (!listaDeDatos ||  !idBusqueda || idBusqueda === 'Ninguno' || idBusqueda == undefined) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => String((item.nombreCaja).replace(/\s/g, "")) === String(idBusqueda))

  }

}
