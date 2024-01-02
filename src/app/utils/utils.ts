import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

/**
 * Metodo para sacar totales de campos de array
 * @param array lista de datos
 * @param campo nombre del campo del array a sumar
 * @returns suma 
 */
export const obtenerTotalesDeArray = (array: any[], campo: string): number => {
    let suma = 0;
    array.forEach(item => suma += Number( item[campo]));
    return suma;
}

export const parseServicioAString = (servicios: string): string => {
    return servicios.split(', ').map((servicio) => servicio.split(':')[0]).join(', ');
  }

export const parsearCatalogosInteroperabilidad = (data: any): any[] => {
    let json = data;
    let registrosClasificadores: any[] = [];

    // Itera a través del arreglo de objetos JSON y extrae los valores del campo `registroClasificador`
    for (let i of json.data) {
        let registroClasificador = JSON.parse(i.registroClasificador);
        registrosClasificadores.push(registroClasificador);
    }
    return registrosClasificadores;
}

export const cambiaridPorNombre = (array: any, id: any, campoComparar: any, campoRetornar: any): string => {
    const findX = array.find((i: { [x: string]: any; }) => i[campoComparar] == id);
    return findX ? findX[campoRetornar] : '';
}

export function mostrarInfo(options: SweetAlertOptions, opcionesAdicionales?: Partial<SweetAlertOptions>): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: options.title,
      text: options?.text ?? '',
      icon: options.icon,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      ...opcionesAdicionales as SweetAlertOptions ?? {},
    })
  }

  export function generadorWidth(n: number): string[] {
    return new Array(n).fill('auto');
  } 