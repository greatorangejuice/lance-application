import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { GreetingComponent } from './greeting.component';



@NgModule({
  declarations: [LoginComponent, GreetingComponent],
  imports: [
    CommonModule
  ]
})
export class GreetingModule { }
