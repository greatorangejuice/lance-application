import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommonLayoutComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule],
  exports: [CommonLayoutComponent],
})
export class CoreModule {}
