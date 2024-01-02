export interface CierreDiarioBancario {
    nombreArchivo: string,
    banco: string,
    cantidadTgrs: number,
    recaudacion: number | string,
    comisionDiaria: number | string,
    estado: string,
    fecha: string
}