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
import {AuswahlComponent} from './auswahl/auswahl.component';
import {AuthGuard} from './service/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'startseite', component: StartseiteComponent, canActivate: [AuthGuard]},
  {path: 'trainingsansicht', component: TrainingsansichtComponent, canActivate: [AuthGuard]},
  {path: 'terminplaner', component: TerminplanerComponent, canActivate: [AuthGuard]},
  {path: 'andere-user', component: AndereUserComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'einstellungen', component: EinstellungenComponent, canActivate: [AuthGuard]},
  {path: 'trainingszusammenfassung', component: TrainingszusammenfassungComponent, canActivate: [AuthGuard]},
  {path: 'registrieren', component: RegistrierenComponent},
  {path: 'auswahl', component: AuswahlComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
