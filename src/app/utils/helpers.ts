

/* se recibe un string:
 'A la Venta de Timbres de Contratacion:452:1',
 esta funcion separa por dos puntos donde:
 primer campo es el nombre
 el segundo es el valor
 y el tercero es el codigo del servicio

*/
export function serviciosStringParse(input: string): { nombre: string, valor: number, id: number }[] {
  const registros = input.split(', ');
  const result = [];

  for (const registro of registros) {
    const [nombre, valor, id] = registro.split(':');
    result.push({ nombre, valor: Number(valor), id: Number(id) });
  }

  return result;
}

  export function sumarValoresServicios(servicios: { nombre: string, valor: number, id: number }[]): number {
    return servicios.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0);
  }