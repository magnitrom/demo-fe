export interface TgrBanco {
    numeroTgr: string;
    institucionId: string;
    tipoDocumentoId: string;
    numeroDocumento: string;
    nombreCiudadano: string;
    monto: string;
    fechaCreacion: string;
    fechaVencimiento: string;
    servicios: string;
    estadoTgr: string;
    origenCreacion: string;
    canalPago: string;
    nombreBanco: string;
    cajaId: string | null;
    nombreCaja: string | null;
  }