import { finalize, map, tap } from 'rxjs/operators';
import { GeneralDatasource } from './general.datasource';
import { UserManagerService } from '../../user-manager/user-manager.service';
import { User } from '../../models/users/user';
import { GetUserOptionsDto } from '../../user-manager/dto/get-user-options.dto';

export class ExtendUsersDatasource extends GeneralDatasource<User> {
  constructor(private dataService: UserManagerService) {
    super();
  }
  loadDataFromService(options: GetUserOptionsDto) {
    this.loadingSubject.next(true);
    this.isErrored.next(false);
    this.dataService
      .getAllUsers(options)
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
