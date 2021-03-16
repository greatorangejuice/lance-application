import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { RouterModule } from '@angular/router';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';

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
  ],
})
export class TaskManagerModule {}
