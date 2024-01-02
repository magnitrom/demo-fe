/**
 * Tipo: PIPE 
 * Descripción: Para realizar filtro de registros de cualquier array
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(listaDeDatos: any[], textoBusqueda: string) {

    if (!listaDeDatos || !textoBusqueda) {
      return listaDeDatos;
    }
    return listaDeDatos.filter(item => JSON.stringify(item).toLowerCase().indexOf(textoBusqueda.toLowerCase()) !== -1)

  }

}