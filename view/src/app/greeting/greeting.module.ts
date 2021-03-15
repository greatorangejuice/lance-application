import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { GreetingComponent } from './greeting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent, GreetingComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class GreetingModule {}
