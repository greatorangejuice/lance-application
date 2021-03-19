import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetUserOptionsDto } from './dto/get-user-options.dto';
import { Observable, pipe } from 'rxjs';
import { User } from '../models/user';
import { delay, map, tap } from 'rxjs/operators';
import { UserApi } from '../core/components/mat-table/mat-table.component';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(private http: HttpClient) {}

  // @ts-ignore
  getAllUsers(options: GetUserOptionsDto): Observable<UserApi> {
    return this.http.get<UserApi>(`${environment.apiUrl}/users`, {
      params: new HttpParams()
        .set('page', options.page.toString())
        .set('limit', options.limit.toString()),
      // .set('email', options.email),
    });
  }
}
