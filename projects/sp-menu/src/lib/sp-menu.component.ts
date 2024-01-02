import { Component, Input, OnInit } from '@angular/core';
import { Perfil } from './models/models';

declare let $: any;

@Component({
  selector: 'sp-menu',
  templateUrl: './sp-menu.component.html',
  styleUrls: ['./sp-menu.component.scss']
})
export class SpMenuComponent implements OnInit {

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
