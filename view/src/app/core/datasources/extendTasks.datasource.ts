import { finalize, map, tap } from 'rxjs/operators';
import { GeneralDatasource } from './general.datasource';
import { TaskManagerService } from '../../task-manager/task-mananager.service';
import { ITask } from '../../models/tasks/ITask';

export class ExtendTasksDatasource extends GeneralDatasource<ITask> {
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
          const newData = data.results.map((item) => {
            return { ...item, subject: item.subject.title };
          });
          return newData;
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        // @ts-ignore
        (data) => this.dataSubject.next(data),
        () => {
          this.isErrored.next(true);
        }
      );
  }
}
