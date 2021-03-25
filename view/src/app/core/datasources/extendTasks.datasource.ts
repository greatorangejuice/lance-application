import { finalize, map, tap } from 'rxjs/operators';
import { GeneralDatasource } from './general.datasource';
import { TaskManagerService } from '../../task-manager/task-mananager.service';
import { Task } from '../../models/tasks/task';

export class ExtendTasksDatasource extends GeneralDatasource<Task> {
  constructor(private dataService: TaskManagerService) {
    super();
  }
  loadDataFromService(options: any) {
    this.loadingSubject.next(true);
    this.isErrored.next(false);
    this.dataService
      .getAllTasks()
      .pipe(
        tap((data) => {
          this.paginatorSubject.next(data.total);
        }),
        map((data) => {
          return data.results;
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        (data) => this.dataSubject.next(data),
        () => {
          this.isErrored.next(true);
        }
      );
  }
}
