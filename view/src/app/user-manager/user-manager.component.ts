import { Component, OnInit } from '@angular/core';
import { UserManagerService } from './user-manager.service';
import { ExtendUsersDatasource } from '../core/datasources/extendUsers.datasource';
import { ITableColumns } from '../models/tables/table-columns.interface';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  // dataSource!: UsersDatasource;
  dataSource!: ExtendUsersDatasource;
  constructor(private userService: UserManagerService) {}
  tableColumns: ITableColumns[] = [
    { title: 'email' },
    { title: 'firstname' },
    { title: 'lastname' },
  ];
  ngOnInit(): void {
    this.dataSource = new ExtendUsersDatasource(this.userService);
  }
}
