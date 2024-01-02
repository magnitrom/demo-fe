import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MenuFaqs } from 'src/app/data/faqs';
declare let $: any;

/*  funcion que se utiliza para definir los metadatos del componente. */
@Component({
  selector: 'app-sefin-faqs',
  templateUrl: './sefin-faqs.component.html',
  styleUrls: ['./sefin-faqs.component.scss']
})


/* Es un componente que muestra una lista de preguntas frecuentes. */
export class SefinFaqsComponent implements OnInit, AfterViewInit {

  @Input() modelFaqs!: MenuFaqs;
  currPage = 1;
  search: string = '';

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });
  }

}
