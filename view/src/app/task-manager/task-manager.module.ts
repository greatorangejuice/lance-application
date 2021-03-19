import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { RouterModule } from '@angular/router';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [TaskManagerComponent, TaskViewerComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TaskManagerComponent,
        children: [
          {
            path: '',
            component: TaskViewerComponent,
          },
        ],
      },
    ]),
    CommonModule,
    CoreModule,
  ],
})
export class TaskManagerModule {}
