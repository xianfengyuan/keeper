import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { CreateComponent, EditComponent, ListComponent, LoginComponent, RegisterComponent } from './components';

import { ConfigService } from './config.service';
import { LoginService } from './_services';
import { AlertComponent, DialogComponent } from './_components';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMaterialTimepickerModule,
    MatMomentDateModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    ConfigService, LoginService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
