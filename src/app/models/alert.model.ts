/* Una interfaz TypeScript. Es una manera de definir un tipo. */
export interface AlertModel{
    estado:boolean;
    mensaje?:string;
    titulo:string;
    data?:any;
    metodoOK?:any;
    metodoCancelar?:any;
}