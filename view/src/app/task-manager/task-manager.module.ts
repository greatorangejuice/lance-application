import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { RouterModule } from '@angular/router';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { CoreModule } from '../core/core.module';
import { TaskCreatorComponent } from './task-creator/task-creator.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { TaskDescriptionViewerComponent } from './task-description-viewer/task-description-viewer.component';

@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskViewerComponent,
    TaskCreatorComponent,
    TaskDescriptionViewerComponent,
  ],
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
          {
            path: 'creator',
            component: TaskCreatorComponent,
          },
          {
            path: ':taskId',
            component: TaskDescriptionViewerComponent,
          },
        ],
      },
    ]),
    CommonModule,
    CoreModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatListModule,
  ],
})
export class TaskManagerModule {}
