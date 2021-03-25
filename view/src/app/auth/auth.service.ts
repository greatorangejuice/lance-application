import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/users/user';
import { environment } from '../../environments/environment';
import { ILoginData } from '../models/login/login-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      // @ts-ignore
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(loginData: ILoginData): Observable<any> {
    const { email, password } = loginData;
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
