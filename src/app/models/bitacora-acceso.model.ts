export interface BitacoraAcceso {
    usuarioPA: string,
    fechaAcceso: string
}

export interface BitacoraAccesoIns {
    usuarioPI: string,
    institucionId: number | string,
    fechaAcceso: string
}