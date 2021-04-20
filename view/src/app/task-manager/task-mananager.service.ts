import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaskApi } from '../models/tasks/task-api.interface';
import { Pagination } from '../models/get-all-request.interface';
import { Subject } from '../models/subjects/subject';
import { map, tap } from 'rxjs/operators';
import { ITask } from '../models/tasks/ITask';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor(private httpClient: HttpClient) {}

  getAllTasks(): Observable<TaskApi> {
    return this.httpClient.get<TaskApi>(
      `${environment.apiUrl}/tasks/available`
    );
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpClient
      .get<Pagination<Subject>>(`${environment.apiUrl}/subjects`)
      .pipe(
        map((data) => {
          return data.results;
        })
      );
  }

  getTaskById(taskIdFromRoute: string): Observable<ITask> {
    return this.httpClient
      .get<ITask>(`${environment.apiUrl}/tasks/byId/${taskIdFromRoute}`)
      .pipe(
        tap((data) => {
          console.log(data);
        })
      );
  }

  assignTaskByExecutor(taskId: string): Observable<any> {
    return this.httpClient
      .patch<any>(`${environment.apiUrl}/tasks/assign-task/`, { taskId })
      .pipe(
        tap((data) => {
          console.log('ASSIGN TASK');
          console.log(data);
        })
      );
  }
}
