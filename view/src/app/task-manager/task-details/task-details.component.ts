import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../models/tasks/ITask';
import { TaskManagerService } from '../task-mananager.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AbstractTaskComponent } from '../../core/components/abstract-task.component';
import { ICustomerInfo } from '../../models/users/customer';
import { AuthService } from '../../auth';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent
  extends AbstractTaskComponent
  implements OnDestroy {
  buttonState = 'Взять задание';
  isButtonActive = true;
  taskSubject = new BehaviorSubject<ITask | null>(null);
  task$ = this.taskSubject.asObservable();
  customer!: any;
  currentUser!: User;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskManagerService,
    private authService: AuthService
  ) {
    super();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = String(routeParams.get('taskId'));
    this.taskService.getTaskById(taskIdFromRoute).subscribe((task) => {
      this.taskSubject.next(task);
    });
    this.currentUser = this.authService.userValue;
  }

  ngOnDestroy(): void {
    this.taskSubject.complete();
    this.isErrored.complete();
    this.loadingSubject.complete();
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
        (task) => {
          this.buttonState = 'Задание взято';
          this.isButtonActive = false;
          this.taskSubject.next(task);
          this.customer = task.customer;
        },
        () => {
          this.isErrored.next(true);
        }
      );
  }

  // assignTaskByExecutor(taskId: string): void {
  //   this.loadingSubject.next(true);
  //   this.isErrored.next(false);
  //   this.taskService
  //     .assignTaskByExecutor(taskId)
  //     .pipe(
  //       finalize(() => {
  //         this.loadingSubject.next(false);
  //       })
  //     )
  //     .subscribe(
  //       (customer) => {
  //         this.buttonState = 'Задание взято';
  //         this.isButtonActive = false;
  //         this.customer = customer;
  //       },
  //       () => {
  //         this.isErrored.next(true);
  //       }
  //     );
  // }
}
