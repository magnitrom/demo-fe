/**
 * Tipo: PIPE 
 * Descripción: Para realizar filtro de registros de cualquier array
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCampo',
  pure:false
})
export class FiltroPorCampoPipe implements PipeTransform {

  transform(listaDeDatos: any[], campo: string, valor: string) {

    if (!listaDeDatos.length || !campo.trim() || !valor.trim() || +valor === -1) {
      return listaDeDatos;
    }
    return listaDeDatos.filter((item) => item[campo] == valor);

  }

}