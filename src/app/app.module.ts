import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
export function tokenGetter() {
  return !localStorage.getItem('accessToken')
    ? ''
    : `Bearer ${JSON.parse(localStorage.getItem('accessToken')).token.token}`;
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from '@containers/layout/layout.module';
import { LayoutComponent } from '@containers/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErroInterceptor } from './core/security/interceptors/erro-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationsModule } from './shared/components/notifications/notificacions.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotificationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    NgxLoadingModule.forRoot({
      backdropBorderRadius: '3px',
      backdropBackgroundColour: 'rgb(255 255 255 / 15%)',
      primaryColour: '#20a8d8',
      secondaryColour: '#20a8d8',
      tertiaryColour: '#20a8d8',
    }),    
    ToastrModule.forRoot({
      //timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      newestOnTop: true,
      closeButton: true,
      maxOpened: 1,
    }),
    LayoutModule.forRoot({}),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    Ng2IziToastModule,
    ModalModule.forRoot(),
    NgbModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
