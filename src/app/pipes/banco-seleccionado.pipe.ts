import { Pipe, PipeTransform } from '@angular/core';
import { CierreDiarioBancario } from '../models/cierre-diario-bancario.model';

@Pipe({
  name: 'banco'
})
export class BancoPipe implements PipeTransform {

  transform(listaDeDatos: CierreDiarioBancario[], bancoSeleccionado: number): CierreDiarioBancario[] {
    if (!listaDeDatos ||  !bancoSeleccionado || bancoSeleccionado === -1) return listaDeDatos;
    return listaDeDatos.filter(item => +item.banco.split(' - ')[0] === bancoSeleccionado);
  }

}