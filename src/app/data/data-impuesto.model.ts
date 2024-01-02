
/* Creando una matriz de objetos. */
export const ListaImpuestos: Impuesto[] = [
  {
    id: 1,
    nombre: 'ISR',
    porcentaje: 10,
  },
  {
    id: 2,
    nombre: 'IVA',
    porcentaje: 13,
  },
  {
    id: 3,
    nombre: 'Importación A',
    porcentaje: 9.1,
  },
];


/* Definición de la interfaz para el objeto. */
export interface Impuesto {
  id: number;
  nombre: string;
  porcentaje: number;
}
