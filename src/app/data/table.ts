/* Una constante que es un objeto que tiene un tipo de TableModel. */
export const TableDatos: TableModel = {
    titulo: "Titulo", 
    subTitulo: "subTitulo", 
    class: "sefin-tabla-responsiva", 
    paginacion:5,
    header: [
        { campo: 'id', titulo: 'Id' },
        { campo: 'name', titulo: 'Nombre' },
        { campo: 'username', titulo: 'Usuario' },
        { campo: 'email', titulo: 'Correo' },
        { campo: 'website', titulo: 'Sitio' },
    ],
    datos:{},
    botonesInternos: [
        { accionId: 'edit', texto: '', icono: 'edit', class: 'sefin-btn-simple-icono' },
        { accionId: 'ver', texto: '', icono: 'preview', class: 'sefin-btn-simple-icono' },
        { accionId: 'delete', texto: '', icono: 'close', class: 'sefin-btn-simple-icono' },
    ],
    botonesExternos: [
        { accionId: 'all', texto: 'seleccionar', icono: 'edit', class: 'sefin-btn-simple-icono' },
        { accionId: 'delete', texto: 'borrar', icono: 'delete', class: 'sefin-btn-simple-icono' },
    ]
}
/* Una constante que es un objeto que tiene un tipo de TableModel. */

export const TableDatosError: TableModel = {
    titulo: "Titulo", 
    subTitulo: "subTitulo", 
    class:"sefin-tabla-rayada",
    paginacion:5,
    header: [
        { campo: 'errorMessage', titulo: 'Mensaje de Error' },
        { campo: 'timestamp', titulo: 'Fecha/Hora de Ocurrencia' }
    ],
    datos:{},
    botonesInternos: [],
    botonesExternos: []
}
/* Una constante que es un objeto que tiene un tipo de TableModel. */
export interface TableModel {
    titulo: string, 
    subTitulo: string, 
    class:string,
    paginacion:number,
    header: HeaderModel[],
    datos: any,
    botonesInternos: BotonesModel[],
    botonesExternos: BotonesModel[]

  }


/* Definición del tipo de objeto que se está pasando. */
export interface BotonesModel {
    accionId?: string, 
    texto?: string, 
    icono?: string, 
    class?: string
}

/* Definición del tipo de objeto que se está pasando. */
export interface HeaderModel {
    campo?: string, 
    titulo?: string, 
    icono?: string, 
    class?: string
}
