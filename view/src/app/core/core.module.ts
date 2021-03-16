import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/page-not-found/not-found.component';

@NgModule({
  declarations: [CommonLayoutComponent, NotFoundComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule],
  exports: [CommonLayoutComponent, NotFoundComponent],
})
export class CoreModule {}
