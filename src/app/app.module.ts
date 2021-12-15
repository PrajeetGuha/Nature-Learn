import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './CustomComponent/navbar/navbar.component';
import { MainbodyComponent } from './CustomComponent/mainbody/mainbody.component';
import { PrototypeComponent } from './CustomComponent/prototype/prototype.component';
import { FormComponent } from './CustomComponent/form/form.component';
import { ModalModule } from './CustomComponent/_modal';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainbodyComponent,
    PrototypeComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
