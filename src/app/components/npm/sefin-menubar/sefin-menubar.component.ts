import { Component, Input, OnInit } from '@angular/core';
import {  Perfil } from 'src/app/data/barra-nevegacion';
declare let $: any;
@Component({
  selector: 'app-sefin-menubar',
  templateUrl: './sefin-menubar.component.html',
  styleUrls: ['./sefin-menubar.component.scss']
})
export class SefinMenubarComponent implements OnInit {

  @Input() menuModel!: Perfil;
  constructor() { /* constructor */ }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.collapsible').collapsible();
      $('.dropdown-trigger').dropdown();
      $('select').formSelect();
    });
  }

}
