import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sefin-navbar',
  templateUrl: './sefin-navbar.component.html',
  styleUrls: ['./sefin-navbar.component.scss']
})
export class SefinNavbarComponent implements OnInit {
  @Input()  menu !: any;
  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
