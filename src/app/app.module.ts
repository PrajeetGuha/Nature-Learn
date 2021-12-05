import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './CustomComponent/navbar/navbar.component';
import { MainbodyComponent } from './CustomComponent/mainbody/mainbody.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainbodyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
