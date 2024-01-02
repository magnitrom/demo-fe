
import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import { PageOrientation } from 'pdfmake/interfaces';

import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DetallesCierre, DetallesCierreIns } from '../models/detalles-cierre.model';
import { generadorWidth } from '../utils/utils';
import { CierreDiarioBancario } from '../models/cierre-diario-bancario.model';
import { columnasBitacoraAcceso, columnasBitacoraAccesoIns, columnasCajaInstitucional, columnasCierre, columnasCierreIns, columnasDetalleCierre, columnasDetalleCierreIns, columnasReversion, columnasTgrs, columnasTgrsBanco } from 'src/assets/pdfs/columnas';
import { BitacoraAcceso, BitacoraAccesoIns } from '../models/bitacora-acceso.model';
import { CierreDiarioCaja } from '../models/cierre-diario-caja.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/* Una abreviatura para registrar el servicio en el inyector raíz. */
@Injectable({
  providedIn: 'root'
})
export class GeneradorPdfService {
    
    documentDefinition!: any;

    pdf<T>(tipo: string, lista: T[], titulo: string): void {
        this.reiniciarDefinicion();        
        this.documentDefinition.content.unshift({ text: titulo, style: 'header' });
        if (this.documentDefinition.content[3].table) this.documentDefinition.content[3].table.widths = generadorWidth(Object.keys(lista[0] as unknown as object).length);
        switch (tipo) {
            case 'detalleCierre':
                this.documentDefinition.content[3].table.widths.splice(0, 1);
                this.generadorColumnasBody(columnasDetalleCierre);
                this.generadorFilas<DetallesCierre>(lista as unknown as DetallesCierre[]);
                break; 
            case 'detalleCierreIns':
                this.generadorColumnasBody(columnasDetalleCierreIns);
                this.generadorFilas<DetallesCierreIns>(lista as unknown as DetallesCierreIns[]);
                break; 
            case 'cierreDiarioBancario':
                this.generadorColumnasBody(columnasCierre);
                this.generadorFilas<CierreDiarioBancario>(lista as unknown as CierreDiarioBancario[]);
                break;
            case 'cierreDiarioInstitucional':
                this.generadorColumnasBody(columnasCierreIns);
                this.generadorFilas<CierreDiarioCaja>(lista as unknown as CierreDiarioCaja[]);
                break;
            case 'bitacoraAcceso':
                this.generadorColumnasBody(columnasBitacoraAcceso);
                this.generadorFilas<BitacoraAcceso>(lista as unknown as BitacoraAcceso[]);
                break;
            case 'bitacoraAccesoIns':
                this.generadorColumnasBody(columnasBitacoraAccesoIns);
                this.generadorFilas<BitacoraAccesoIns>(lista as unknown as BitacoraAccesoIns[]);
                break;
            case 'tgrs':            
                this.generadorColumnasBody(columnasTgrs);
                break;
            case 'Banco':
                this.generadorColumnasBody(columnasTgrsBanco);
                break;
            case 'reversion':
                this.generadorColumnasBody(columnasReversion);
                break;
            default:
                this.generadorColumnasBody(columnasCajaInstitucional);
                break;
        }
        if (['tgrs', 'Banco', 'reversion', 'Caja Institucional'].includes(tipo)) this.generadorFilas<T>(lista as unknown as T[]);
        this.generarPdf();
    }

    private reiniciarDefinicion(): void {
        const fechaActual = new Date();
        const fechaConsulta = fechaActual.toLocaleDateString();
        const horaConsulta = fechaActual.toLocaleTimeString();
        this.documentDefinition = {
            pageOrientation:'landscape' as PageOrientation,  
            pageSize: 'LEGAL',
            content: [
                { text: `Fecha y Hora de Consulta: ${fechaConsulta} ${horaConsulta}`, style: 'subheader' },
                { text: '\n' }, // Salto de línea antes de la tabla
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto'],
                        body: [ ]
                    },
                },
            ],
            styles: {
                header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10],
                },
                negritaCentrada: {
                
                bold: true,
                alignment: 'center',
                
                },
                subheader: {
                fontSize: 12,
                margin: [0, 0, 0, 5],
                }
                
            },
        };
    
    }

    private generadorColumnasBody(listaColumnas: string[]): void {
        if (this.documentDefinition.content[3].table?.body) {
            this.documentDefinition.content[3].table.body.push(listaColumnas.map((columna) => ({ text: columna, style: 'negritaCentrada' })));  
        }
    }

    private generadorFilas<T>(listaValores: T[]): void {
        if (this.documentDefinition.content[3].table?.body) {
            listaValores.forEach((valor: T) => {
                this.documentDefinition.content[3].table.body.push(Object.values(valor as unknown as object));
            })            
        }
    }

    private generarPdf(): void {
        pdfMake.createPdf(this.documentDefinition).print();
    }
}