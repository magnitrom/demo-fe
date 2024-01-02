import { Pipe, PipeTransform } from '@angular/core';
import { Cajainstitucional } from '../models/TiposCajaInstitucional/Cajainstitucional.interface';
import { Institucion } from '../models/Institucion.interface';

@Pipe({
  name: 'institucionFilterCaja'
})
export class InstitucionFilterCajaPipe implements PipeTransform {

  transform(listaDeDatos: Cajainstitucional[], idBusqueda:Institucion) {

    if (!listaDeDatos ||  !idBusqueda || idBusqueda.id === -1) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => Number(item.institucionId) === Number(idBusqueda.id))

  }

}
