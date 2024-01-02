export interface DetallesCierre {
    nombreArchivo: string,
    numeroTgr: string,
    montoTgr: any,
    estadoTgr: string,
    fechaPago: string,
    codigoBanco: any,
    nombreBanco: string,
    agencia: any,
    cajero: any,
    transaccionBancaria: any,
    montoTgrBanco: any,
    diferencia: any,
    estadoConciliacion: any
}

export interface DetallesCierreIns {
    nombreArchivo: string,
    numeroTgr: string,
    montoTgr: number,
    estadoTgr: string,
    fechaPago: string,
    institucionId: number
}