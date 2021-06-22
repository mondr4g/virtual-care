import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './dashboard/a/admin/admin.component';
import { DocComponent } from './dashboard/d/doc/doc.component';
import { NurseComponent } from './dashboard/n/nurse/nurse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistComponent } from './regist/regist.component';
import { NurseFormComponent } from './nurse-form/nurse-form.component';
import { AyudanteFormComponent } from './ayudante-form/ayudante-form.component';
import { PacientFormComponent } from './pacient-form/pacient-form.component';
import { CrudNurseComponent } from './crud-nurse/crud-nurse.component';
import { CrudAyudanteComponent } from './crud-ayudante/crud-ayudante.component';
import { RecetaComponent } from './dashboard/n/nurse/receta/receta.component';
import { CrudPatientComponent } from './crud-patient/crud-patient.component';
import { ConsultFormComponent } from './consult-form/consult-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/admin', component: AdminComponent },
  { path: 'dashboard/admin/view-nurse', component: CrudNurseComponent },
  { path: 'dashboard/admin/view-nurse/add-nurse', component: NurseFormComponent },
  { path: 'dashboard/admin/view-ayudante', component: CrudAyudanteComponent },
  { path: 'dashboard/admin/view-ayudante/add-ayudante', component: AyudanteFormComponent },
  { path: 'dashboard/admin/view-patient', component: CrudPatientComponent },
  { path: 'dashboard/admin/view-patient/add-pacient', component: PacientFormComponent },
  { path: 'dashboard/doc', component: DocComponent },
  { path: 'dashboard/nurse', component: NurseComponent },
  { path: 'dashboard/nurse/add-pacient', component: PacientFormComponent },
  { path: 'dashboard/nurse/recetas', component: RecetaComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registro', component: RegistComponent },
  { path: 'registConsulta', component: ConsultFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
