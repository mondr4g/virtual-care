import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { RecetaComponent } from './dashboard/a/receipt/receta/receta.component';



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
    RecetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
