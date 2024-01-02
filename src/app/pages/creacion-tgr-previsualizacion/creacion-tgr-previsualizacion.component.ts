import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPdfComprobanteService } from 'src/app/services/api-pdf-comprobante.service';

@Component({
  selector: 'app-creacion-tgr-previsualizacion',
  templateUrl: './creacion-tgr-previsualizacion.component.html',
  styleUrls: ['./creacion-tgr-previsualizacion.component.scss']
})
export class CreacionTgrPrevisualizacionComponent implements OnInit {

  pdfTGR: string = '';
  numeroTGR: any = '';
  documento: any = '';
  estado: any = '';

  constructor(private router: Router,
    private activateRoute: ActivatedRoute,
    private apiPdfComprobante: ApiPdfComprobanteService
  ) {
    this.numeroTGR = this.activateRoute.snapshot.paramMap.get('numeroTgr');
    this.documento = this.activateRoute.snapshot.paramMap.get('documento');
    this.estado = this.activateRoute.snapshot.paramMap.get('estado');

    this.obtenerPdfComprobante(this.numeroTGR);


  }


  ngOnInit(): void {
    //inicializador
  }

  visualizarPantallaPagoTGR() {
    localStorage.setItem('numero-comprobante', this.numeroTGR);
    this.router.navigate(['/pago-comprobante']);
  }

  visualizarPantallaCreacionTGR() {
    this.router.navigate(['/creacion-tgr']);
  }

  obtenerPdfComprobante(numeroTgr: any) {
    let bodyPdf = { 'numeroTgr': numeroTgr };
    this.apiPdfComprobante.getPdf(bodyPdf).subscribe((response) => {
      this.pdfTGR = 'data:application/pdf;base64,' + response.data[0];
    });

  }

}
