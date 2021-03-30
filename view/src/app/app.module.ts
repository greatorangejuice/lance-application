import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GreetingModule } from './greeting/greeting.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { TaskManagerModule } from './task-manager/task-manager.module';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { UserManagerModule } from './user-manager/user-manager.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GreetingModule,
    CoreModule,
    TaskManagerModule,
    UserManagerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
