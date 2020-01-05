import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { TrainingsansichtComponent } from './trainingsansicht/trainingsansicht.component';
import { TerminplanerComponent } from './terminplaner/terminplaner.component';
import { AndereUserComponent } from './andere-user/andere-user.component';
import { ProfilComponent } from './profil/profil.component';
import { EinstellungenComponent } from './einstellungen/einstellungen.component';
import { TrainingszusammenfassungComponent } from './trainingszusammenfassung/trainingszusammenfassung.component';
import { RegistrierenComponent } from './registrieren/registrieren.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartseiteComponent,
    TrainingsansichtComponent,
    TerminplanerComponent,
    AndereUserComponent,
    ProfilComponent,
    EinstellungenComponent,
    TrainingszusammenfassungComponent,
    RegistrierenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
