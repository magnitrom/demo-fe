import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';

/* Una función de decorador que toma un objeto de metadatos cuyas propiedades describen el componente. lo mas
propiedades importantes son:

selector— el selector de elementos CSS de los componentes
templateUrl: la ubicación del archivo de plantilla del componente.
styleUrls: la ubicación de los estilos CSS privados del componente. */
@Component({
  selector: 'app-sefin-datatable',
  templateUrl: './sefin-datatable.component.html',
  styleUrls: ['./sefin-datatable.component.scss']
})
/* Es un componente que muestra una tabla */
export class SefinDatatableComponent implements OnInit {

  @Output() mas50 = new EventEmitter();
  @Output() lineaSeleccionada = new EventEmitter();
  @Output() lineaSeleccionarExterno = new EventEmitter();

  @Input() icono!: any[];
  @Input() titulo!: string;
  @Input() subTitulo!: string;
  @Input() tableClass!: string;
  @Input() botones!: any[];
  @Input() botonesExternos!: any[];
  @Input() checkbox: boolean = false;
  @Input() filtrarColumnas!: boolean ;
  @Input() headerTable!: any[];
  @Input() bodyTable!: any[];
  @Input() rowPerPage!: number;
  @Input() offset !: number;
  filtroTitulo = false;
  dataPaginate: any[] = [];

  listPagination: any[] = [];

  paginateActive = 1;

  listaHeaders!: any;

  constructor() { /* constructor */ }

  /**

* Toma una matriz de objetos y devuelve una matriz de las claves de los objetos.
   */
  ngOnInit(): void {
    if (this.headerTable) {
      this.listaHeaders = this.headerTable;
    }
    else {
      this.listaHeaders = this.obtenerCampoValorDeUnJSON(this.bodyTable[0]);
    }

    if(this.botonesExternos && this.botonesExternos.length > 0) {
      this.bodyTable.forEach(e => e.selected = false);
    }

    this.convertir();
  }

 /**
  * Toma una matriz de objetos y devuelve un objeto con claves que son el número de página y los valores.
  * que son matrices de objetos.
  */
  convertir() {
    this.dataPaginate = this.bodyTable.reduce((acc, elem, index) => {
      let rowNum = Math.floor(index / this.rowPerPage) + 1
      acc[`${rowNum}`] = acc[`${rowNum}`] || []
      acc[`${rowNum}`].push(elem)
      return acc
    }, {});

    let i = 0;
    for (let _ of Object.keys(this.dataPaginate)) {
      i++;
      this.listPagination.push(i);
    }

  }
/**
 * * Emite un evento que será capturado por el componente principal, que luego actualizará el desplazamiento
 * variable
 */

  llamar50Mas() {
    this.mas50.emit(this.offset + 50);
  }

/* Tomando una matriz y devolviendo una matriz de las claves de los objetos. */
  obtenerKeysDeUnArray = (array: any) => {
    return Object.keys(array);
  }

  obtenerCampoValorDeUnJSON = (json: any) => {

    let lista: any[] = [];
    for (let d of Object.keys(json)) {

      if (typeof json[d] == 'object') {
        /** lo que pasaría en caso de que fuera objeto */
      }
      else {
        lista.push({ campo: d, titulo: d });
      }

    }


    return lista;
  }

/**
* La función se llama cuando un usuario hace clic en una fila de la tabla. La función luego emite un evento para
 * el componente principal con la identificación de la fila y los datos de la fila.
 * @param {cadena} id - cadena, datos: any
 * @param {any} dato - any
 */
  seleccionado(id: string, data: any) {
    this.lineaSeleccionada.emit({ accion: id, data: data });
  }
 
/**
   * Toma una identificación y una matriz de objetos, y devuelve un objeto con la identificación y la matriz de
   * objetos.
   * @param {cadena} id - cadena - esta es la identificación del botón en el que se hizo clic
   */
  seleccionadoExterno(id: string) {
    const selected = this.bodyTable.filter( (x) => (x.selected === true) );
    this.lineaSeleccionarExterno.emit({ accion: id, data: selected });
  }

  /**
  
* Toma un valor, luego muestra la tabla filtrada.
   * @param {Event} event - Event, campoNombre: any
   * @param {any} campoNombre - es el nombre de la columna a filtrar
   */
  applyFilter(event : Event, campoNombre : any){
    this.listPagination = [];
    const filterValue = (event.target as HTMLInputElement).value;


    let filteredData  = this.bodyTable;
    if (filterValue.length > 0) {
      filteredData = this.bodyTable.filter( (x) => (isNaN(x[campoNombre])?x[campoNombre].toUpperCase().match(filterValue.toUpperCase()):x[campoNombre] == Number(filterValue)) );
    }

    this.dataPaginate = filteredData.reduce((acc, elem, index) => {
      let rowNum = Math.floor(index / this.rowPerPage) + 1
      acc[`${rowNum}`] = acc[`${rowNum}`] || []
      acc[`${rowNum}`].push(elem)
      return acc
    }, {});

    let i = 0;
    for (let _ of Object.keys(this.dataPaginate)) {
      i++;
      this.listPagination.push(i);
    }
  }

  /**
   Toma el evento y los datos de la casilla de verificación y encuentra el índice del objeto en la matriz que
   * coincide con la identificación de los datos. Si el índice no es -1, establece la propiedad seleccionada del objeto en
   * la matriz al valor de la casilla de verificación.
   * @param {cualquiera} evento - cualquiera - el evento que se activa cuando se hace clic en la casilla de verificación
   * @param {any} data - any - estos son los datos que se pasan a la función.
   */
  checkCheckBoxvalue(event: any, data: any){
    const index = this.bodyTable.findIndex(object => {
      return object.id === data.id;
    });

    if (index !== -1) {
      this.bodyTable[index].selected = event.target.checked;
    }
  }

  /**
   * Recorre la matriz bodyTable y establece la propiedad seleccionada de cada elemento en el valor
   * de la casilla de verificación.
   * @param {any} event - any - este es el evento que se activa cuando se hace clic en la casilla de verificación.
   */
  checkUncheckAll(event: any){

    this.bodyTable.forEach((el) => el.selected = event.target.checked );
  }
}
