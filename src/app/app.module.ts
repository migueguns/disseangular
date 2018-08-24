import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CampaniaComponent } from './campania/campania.component';
import { CrecimientoComponent } from './crecimiento/crecimiento.component';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { LoginComponent } from './core/login/login.component';
import { CoreComponent } from './core/core.component';
import { MenuComponent } from './core/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { AlertModule } from 'ngx-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AppRoutingModule } from './/app-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule } from "@angular/forms";
import {InterceptorModule} from './interceptor.module';
import { FacebookModule } from 'ngx-facebook';
import { AppConstant } from './app.constant';
import { HeaderComponent } from './core/header/header.component';
import { LoginService } from './core/login/login.service';
import { AssociatepageService } from './associatepage/associatepage.service';
import { AssociatepageComponent } from './associatepage/associatepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrecimientoDialog } from './crecimiento/crecimiento.component';
import { MatExpansionModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    CampaniaComponent,
    CrecimientoComponent,
    SuscriptoresComponent,
    ConfiguracionComponent,
    CoreComponent,
    MenuComponent,
    LoginComponent,
    HeaderComponent,
    AssociatepageComponent,
    CrecimientoDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    Ng2TableModule,
    NgbModule,
    NgbModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FacebookModule.forRoot(),
    Angular2FontawesomeModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [AppConstant,LoginService,AssociatepageService],
  bootstrap: [AppComponent],
  entryComponents: [CrecimientoDialog],
})
export class AppModule { }
