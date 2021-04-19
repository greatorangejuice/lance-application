import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../models/tasks/ITask';
import { TaskManagerService } from '../task-mananager.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AbstractComponent } from '../../core/components/abstract.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent extends AbstractComponent {
  buttonState = 'Взять задание';
  isButtonActive = true;
  task!: ITask;
  task$!: Observable<ITask>;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskManagerService
  ) {
    super();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = String(routeParams.get('taskId'));
    this.task$ = this.taskService.getTaskById(taskIdFromRoute);
  }

  assignTaskByExecutor(taskId: string): void {
    this.loadingSubject.next(true);
    this.isErrored.next(false);
    this.taskService
      .assignTaskByExecutor(taskId)
      .pipe(
        finalize(() => {
          this.loadingSubject.next(false);
        })
      )
      .subscribe(
        () => {
          this.buttonState = 'Задание взято';
          this.isButtonActive = false;
        },
        () => {
          this.isErrored.next(true);
        }
      );
  }
}
