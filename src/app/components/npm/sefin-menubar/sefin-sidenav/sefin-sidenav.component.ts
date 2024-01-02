import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sefin-sidenav',
  templateUrl: './sefin-sidenav.component.html',
  styleUrls: ['./sefin-sidenav.component.scss']
})
export class SefinSidenavComponent implements OnInit {
  @Input()  menu !: any;
  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
