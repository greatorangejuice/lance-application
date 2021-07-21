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
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      // @ts-ignore
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
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
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout(params: any = {}): void {
    console.log(params);
    this.router.navigate(['/greeting'], params);
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
