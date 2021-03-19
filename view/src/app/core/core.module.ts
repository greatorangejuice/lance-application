import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/page-not-found/not-found.component';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CommonLayoutComponent, NotFoundComponent, MatTableComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CommonLayoutComponent, NotFoundComponent, MatTableComponent],
})
export class CoreModule {}
