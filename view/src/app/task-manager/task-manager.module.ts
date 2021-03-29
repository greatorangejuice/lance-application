import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerComponent } from './task-manager.component';
import { RouterModule } from '@angular/router';
import { TaskViewerComponent } from './task-viewer/task-viewer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from '../core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../auth/interceptors/jwt.interceptor';
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

@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskViewerComponent,
    TaskCreatorComponent,
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
  ],
})
export class TaskManagerModule {}
