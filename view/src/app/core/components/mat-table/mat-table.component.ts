import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TaskManagerService } from '../../../task-manager/task-mananager.service';
import { UserManagerService } from '../../../user-manager/user-manager.service';
import { User } from '../../../models/user';
import { UsersDatasource } from '../../services/users.datasource';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'firstname', 'lastname'];
  dataSource!: UsersDatasource;
  isNotDownload = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private tasksService: TaskManagerService,
    private usersService: UserManagerService
  ) {}

  ngOnInit() {
    this.dataSource = new UsersDatasource(this.usersService);
    this.dataSource.loadUsers({ page: 0, limit: 10 });
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUsersPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  loadUsersPage() {
    const options = {
      page: this.paginator.pageIndex,
      limit: this.paginator.pageSize,
    };
    if (this.input.nativeElement.value) {
      // @ts-ignore
      options.email = this.input.nativeElement.value;
    }

    this.dataSource.loadUsers(options);
  }
}

export interface UserApi {
  results: User[];
  page_total: number;
  total: number;
}
