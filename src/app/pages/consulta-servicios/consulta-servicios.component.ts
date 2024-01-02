import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.interface';
import { ApiInteroperabilidadService } from 'src/app/services/api-interoperabilidad.service';
import { ApiServicio } from 'src/app/services/api-servicios.service';
import { ClasificadoresInteroperabilidadService } from 'src/app/services/clasificadores-interoperabilidad.service';
import { MttoParametrosService } from 'src/app/services/mtto-parametros.service';

@Component({
  selector: 'app-consulta-servicios',
  templateUrl: './consulta-servicios.component.html',
  styleUrls: ['./consulta-servicios.component.scss']
})
/* Es una clase que tiene un método que realiza una llamada a una API y luego envía la respuesta a una matriz. */
export class ConsultaServiciosComponent implements OnInit {

  arrayServicios: Servicio[] = [];
  arrayInstituciones: any[] = [];
  arrayServiciosInicial: Servicio[] = [];
  ultimaFechaCarga: any;
  pagina = 1;

  constructor(
    private readonly apiClasificadores: ClasificadoresInteroperabilidadService,
    private readonly apiServicios: ApiServicio,
    private readonly apiInteroperabilidad: ApiInteroperabilidadService,
    private readonly apiParametros: MttoParametrosService
  ) { }

  ngOnInit(): void {
    this.obtenerInstituciones();
  }

  obtenerInstituciones(): void {
    this.apiParametros.obtenerValorParametro('GESTION').subscribe((res) => {
      this.apiInteroperabilidad.obtenerClasificador('INSTITUCIONES', res.data[0]?.valorParametro).subscribe((res) => {
        this.arrayInstituciones = res.data?.sort((a: any, b: any) => +a.INSTITUCION - +b.INSTITUCION);
        this.selectHTML();
        this.cargarServicios();
      });
    });
  }

  selectHTML() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  /**
   * Obtiene datos de una API y los inserta en una matriz.
   *
   */
  obtenerRegistroClasificadorServicios() {
    let camposClasificador: any = ["COD_SERVICIO", "DESCRIPCION", "TIPO_COSTO_ID", "INSTITUCION", "RUBRO", "VIGENTE", "COSTO"];

    let bodyServicios: any = {
      clasificador: 'SERVICIOS_INSTITUCION',
      campos: camposClasificador
    }

    this.apiClasificadores.obtenerRegistros(bodyServicios).subscribe((response) => {
      this.ultimaFechaCarga = '26/06/2022 23:58:15'
      for (let servicio of response.data) {
        this.arrayServicios.push(JSON.parse(servicio.registroClasificador));
      } //end for

    });

  }

  cargarServicios(): void {
    this.apiServicios.getServicios().subscribe((res) => {
      this.arrayServicios = res.data;
      this.arrayServiciosInicial = res.data;
    })
  }

  obtenerNombreEstado(estado: string): string {
    return estado === 'A' ? 'ACTIVO' : 'INACTIVO';
  }

  obtenerNombreAprobado(aprobado: string): string {
    switch (aprobado) {
      case 'A':
        return 'APROBADO';
      case 'P':
        return 'PENDIENTE';
      default:
        return 'RECHAZADO';
    }
  }

  obtenerNombreRubro(id: string): string {

    let servicio: any = this.arrayServicios.find((elemento) => elemento.rubroId == id);

    if (servicio) {
      return servicio.nombreRubro;
    } else {
      return '';
    }
  }



  onChangeInstitucion(event: Event): void {
    const institucionId = (event.target as HTMLSelectElement)?.value || '';
    this.arrayServicios = +institucionId === -1 ?
      this.arrayServiciosInicial :
      this.arrayServiciosInicial.filter((serv) => +serv.institucionId === +institucionId);
    this.pagina = 1;
  }

  obtenerNombreInstitucion(institucionId: string): string {
    return this.arrayInstituciones.find((inst) => +inst.INSTITUCION === +institucionId)?.DESC_INSTITUCION || '';
  }
}
