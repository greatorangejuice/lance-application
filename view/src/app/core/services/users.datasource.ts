import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { User } from '../../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserManagerService } from '../../user-manager/user-manager.service';
import { GetUserOptionsDto } from '../../user-manager/dto/get-user-options.dto';
import { catchError, finalize, map, tap } from 'rxjs/operators';

export class UsersDatasource implements DataSource<User[]> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private paginatorSubject = new BehaviorSubject<number>(0);
  private isErrored = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public isErrored$ = this.isErrored.asObservable();
  constructor(private userService: UserManagerService) {}

  // @ts-ignore
  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  get length() {
    // @ts-ignore
    return this.paginatorSubject.value;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.paginatorSubject.complete();
    this.isErrored.complete();
  }

  loadUsers(options: GetUserOptionsDto) {
    this.loadingSubject.next(true);
    this.isErrored.next(false);
    this.userService
      .getAllUsers(options)
      .pipe(
        tap((data) => {
          this.paginatorSubject.next(data.total);
        }),
        map((data) => {
          return data.results;
        }),
        // tslint:disable-next-line:no-unused-expression
        // catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        (users) => this.usersSubject.next(users),
        () => {
          this.isErrored.next(true);
        }
      );
  }
}
