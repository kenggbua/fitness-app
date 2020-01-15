import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { TrainingsansichtComponent } from './trainingsansicht/trainingsansicht.component';
import { TerminplanerComponent } from './terminplaner/terminplaner.component';
import { AndereUserComponent } from './andere-user/andere-user.component';
import { ProfilComponent } from './profil/profil.component';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { TrainingszusammenfassungComponent } from './trainingszusammenfassung/trainingszusammenfassung.component';
import { RegistrierenComponent } from './registrieren/registrieren.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'startseite', component: StartseiteComponent},
  {path: 'trainingsansicht', component: TrainingsansichtComponent},
  {path: 'terminplaner', component: TerminplanerComponent},
  {path: 'andere-user', component: AndereUserComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'einstellungen', component: EinstellungenComponent},
  {path: 'trainingszusammenfassung', component: TrainingszusammenfassungComponent},
  {path: 'registrieren', component: RegistrierenComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
