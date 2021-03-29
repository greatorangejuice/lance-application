import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaskApi } from '../models/tasks/task-api.interface';
import { CommonApi } from '../models/get-all-request.interface';
import { Subject } from '../models/subjects/subject';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor(private httpClient: HttpClient) {}
  getAllTasks(): Observable<TaskApi> {
    return this.httpClient.get<TaskApi>(`${environment.apiUrl}/tasks`);
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.httpClient
      .get<CommonApi<Subject>>(`${environment.apiUrl}/subjects`)
      .pipe(
        tap((data) => {
          console.log(data.results);
        }),
        map((data) => {
          return data.results;
        })
      );
  }
}
