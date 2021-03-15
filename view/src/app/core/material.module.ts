import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatInputModule, MatFormField],
  exports: [MatToolbarModule, MatInputModule, MatFormField],
})
export class MaterialModule {}
