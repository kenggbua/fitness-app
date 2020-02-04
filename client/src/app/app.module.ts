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
// tslint:disable-next-line:max-line-length
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import {AuswahlComponent} from './auswahl/auswahl.component';
import {AuthGuard} from './service/auth-guard.service';
import { MaxRepComponent } from './max-rep/max-rep.component';
import { RankingComponent } from './ranking/ranking.component';
import { HeaderComponent } from './header/header.component';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScheduleModule,
    RecurrenceEditorModule
  ],
  providers: [
    AuthGuard,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
