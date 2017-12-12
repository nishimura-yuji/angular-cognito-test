import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './service/pet.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PetlistComponent } from './petlist/petlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// add service
import { CognitoService } from './service/cognito.service';
import { PetService } from './service/pet.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PetlistComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true,
  },
  CognitoService, PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
