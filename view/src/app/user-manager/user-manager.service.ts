import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetUserOptionsDto } from './dto/get-user-options.dto';
import { Observable } from 'rxjs';
import { UserApi } from '../models/users/user-api.interface';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(private http: HttpClient) {}

  getAllUsers(options: GetUserOptionsDto): Observable<UserApi> {
    let httpParams = new HttpParams();

    Object.keys(options).forEach((k) => {
      // @ts-ignore
      httpParams = httpParams.set(k, options[k]);
    });

    return this.http.get<UserApi>(
      `${environment.apiUrl}/users/search?${httpParams.toString()}`
    );
  }
}
