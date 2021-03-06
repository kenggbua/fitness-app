import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { TrainingsansichtComponent } from './trainingsansicht/trainingsansicht.component';
import { TerminplanerComponent } from './terminplaner/terminplaner.component';
import { AndereUserComponent } from './andere-user/andere-user.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistrierenComponent } from './registrieren/registrieren.component';
import {AuswahlComponent} from './auswahl/auswahl.component';
import {AuthGuard} from './service/auth-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { MaxRepComponent } from './max-rep/max-rep.component';
import { RankingComponent } from './ranking/ranking.component';
import { HeaderComponent } from './header/header.component';
import { ZusammenfassungComponent } from './zusammenfassung/zusammenfassung.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartseiteComponent,
    TrainingsansichtComponent,
    TerminplanerComponent,
    AndereUserComponent,
    ProfilComponent,
    RegistrierenComponent,
    AuswahlComponent,
    MaxRepComponent,
    RankingComponent,
    HeaderComponent,
    ZusammenfassungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
