import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { GeneralDatasource } from '../../datasources/general.datasource';
import { ITableColumns } from '../../../models/tables/table-columns.interface';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit, AfterViewInit {
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  @Input('dataSource') dataSource!: GeneralDatasource<any>;
  @Input('tableColumns') tableColumns!: ITableColumns[];
  @Output() open: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource.loadDataFromService({ page: 0, limit: 10 });
    this.displayedColumns = this.tableColumns.map((column) => column.title);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadData()))
      .subscribe();
  }

  loadData() {
    const options = {
      page: this.paginator.pageIndex,
      limit: this.paginator.pageSize,
    };
    this.dataSource.loadDataFromService(options);
  }
  clickMouse(data: any) {
    this.open.emit(data);
  }
}
