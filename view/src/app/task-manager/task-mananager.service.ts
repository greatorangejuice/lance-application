import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TaskApi } from '../models/tasks/task-api.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor(private httpClient: HttpClient) {}
  getAllTasks(): Observable<TaskApi> {
    return this.httpClient.get<TaskApi>(`${environment.apiUrl}/tasks`);
  }
}
