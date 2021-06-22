import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistComponent } from './regist/regist.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { AdminComponent } from './dashboard/a/admin/admin.component';
import { DocComponent } from './dashboard/d/doc/doc.component';
import { NurseComponent } from './dashboard/n/nurse/nurse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NurseFormComponent } from './nurse-form/nurse-form.component';
import { AyudanteFormComponent } from './ayudante-form/ayudante-form.component';
import { PacientFormComponent } from './pacient-form/pacient-form.component';
import { RecetaComponent } from './dashboard/n/nurse/receta/receta.component';
import { CrudNurseComponent } from './crud-nurse/crud-nurse.component';
import { CrudPatientComponent } from './crud-patient/crud-patient.component';
import { CrudDoctorComponent } from './crud-doctor/crud-doctor.component';
import { CrudAyudanteComponent } from './crud-ayudante/crud-ayudante.component';
import { GivheadInterceptor } from './givhead.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsultFormComponent } from './consult-form/consult-form.component';
import { WaitingConsComponent } from './consulta-form/waiting/waiting-cons/waiting-cons.component';
import { ViewPeticionesComponent } from './view-peticiones/view-peticiones.component';
import { ViewHistConsComponent } from './view-hist-cons/view-hist-cons.component';
import { DocConsultaComponent } from './doc-consulta/doc-consulta.component';
import { InfoConsultaComponent } from './info-consulta/info-consulta.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistComponent,
    LoginComponent,
    RecordsComponent,
    AdminComponent,
    DocComponent,
    NurseComponent,
    DashboardComponent,
    NurseFormComponent,
    AyudanteFormComponent,
    PacientFormComponent,
    RecetaComponent,
    CrudNurseComponent,
    CrudPatientComponent,
    CrudDoctorComponent,
    CrudAyudanteComponent,
    NavbarComponent,
    ConsultFormComponent,
    WaitingConsComponent,
    ViewPeticionesComponent,
    ViewHistConsComponent,
    DocConsultaComponent,
    InfoConsultaComponent,
    DiagnosticoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GivheadInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
