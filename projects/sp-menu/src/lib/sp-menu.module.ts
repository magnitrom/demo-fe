import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SefinAvatarbarComponent } from './components/sefin-avatarbar/sefin-avatarbar.component';
import { SefinNavbarComponent } from './components/sefin-navbar/sefin-navbar.component';
import { SefinSidenavComponent } from './components/sefin-sidenav/sefin-sidenav.component';
import { SpMenuComponent } from './sp-menu.component';



@NgModule({
  declarations: [
    SpMenuComponent,
    SefinAvatarbarComponent,
    SefinNavbarComponent,
    SefinSidenavComponent
  ],
  imports: [  
    BrowserModule,
    RouterModule
  ],
  exports: [
    SpMenuComponent
  ]
})
export class SpMenuModule { }
