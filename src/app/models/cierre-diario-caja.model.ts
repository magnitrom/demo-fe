export interface CierreDiarioCaja {
    nombreArchivo: string,
    codigoCaja: number,
    nombreCaja: string,
    institucionId: number | string,
    cantidadTgrs: number,
    recaudacion: number | string,
    fecha: string
}

export interface DetalleArchivoCierreCajas {
    nombreArchivo: string,
    numeroTgr: string,
    montoTgr: number,
    estadoTgr: string,
    fechaPago: string,
    institucionId: number
}