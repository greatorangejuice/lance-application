import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { TaskManagerService } from '../../../task-manager/task-mananager.service';
import { UserManagerService } from '../../../user-manager/user-manager.service';
import { User } from '../../../models/user';
import { UsersDatasource } from '../../services/users.datasource';
import { merge } from 'rxjs';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'firstname', 'lastname'];
  dataSource!: UsersDatasource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private tasksService: TaskManagerService,
    private usersService: UserManagerService
  ) {}

  ngOnInit() {
    this.dataSource = new UsersDatasource(this.usersService);
    this.dataSource.loadUsers({ page: 0, limit: 10 });
  }

  clickMouse(row: any) {
    console.log('Clicked', row);
  }

  ngAfterViewInit() {
    // this.paginator.page.pipe(tap(() => this.loadUsersPage())).subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  loadUsersPage() {
    console.log(this.paginator.pageIndex, this.paginator.pageSize);
    console.log(this.sort.active);
    this.dataSource.loadUsers({
      page: this.paginator.pageIndex,
      limit: this.paginator.pageSize,
    });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }
}

export interface UserApi {
  results: User[];
  page_total: number;
  total: number;
}
