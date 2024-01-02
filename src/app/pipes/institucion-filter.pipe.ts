import { Pipe, PipeTransform } from '@angular/core';
import { ConsolidadoInstitucion } from '../models/consolidadoInstitucion.interface';
import { Institucion } from '../models/Institucion.interface';

@Pipe({
  name: 'institucionFilter'
})
export class InstitucionFilterPipe implements PipeTransform {

  transform(listaDeDatos: ConsolidadoInstitucion[], idBusqueda:Institucion) {

    if (!listaDeDatos ||  !idBusqueda || idBusqueda.id === -1) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => Number(item.institucionId) === Number(idBusqueda.id))

  }

}
