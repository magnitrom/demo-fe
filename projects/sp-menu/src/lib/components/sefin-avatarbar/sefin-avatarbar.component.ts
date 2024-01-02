import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sefin-avatarbar',
  templateUrl: './sefin-avatarbar.component.html',
  styleUrls: ['./sefin-avatarbar.component.scss']
})
export class SefinAvatarbarComponent implements OnInit {
  @Input()  datosUsuario !: any;
  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

}
