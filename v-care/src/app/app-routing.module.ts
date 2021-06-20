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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/admin', component: AdminComponent },
  { path: 'dashboard/admin/add-nurse', component: NurseFormComponent },
  { path: 'dashboard/admin/add-ayudante', component: AyudanteFormComponent },
  { path: 'dashboard/admin/add-pacient', component: PacientFormComponent },
  { path: 'dashboard/doc', component: DocComponent },
  { path: 'dashboard/nurse', component: NurseComponent },
  { path: 'dashboard/nurse/add-pacient', component: PacientFormComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registro', component: RegistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
