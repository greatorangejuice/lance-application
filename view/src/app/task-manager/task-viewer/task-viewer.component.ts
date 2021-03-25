import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../task-mananager.service';
import { ExtendTasksDatasource } from '../../core/datasources/extendTasks.datasource';
import { ITableColumns } from '../../models/tables/table-columns.interface';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrls: ['./task-viewer.component.scss'],
})
export class TaskViewerComponent implements OnInit {
  dataSource!: ExtendTasksDatasource;
  constructor(private taskService: TaskManagerService) {}
  tableColumns: ITableColumns[] = [
    { title: 'title' },
    { title: 'description' },
    { title: 'dueDate' },
  ];
  ngOnInit(): void {
    this.dataSource = new ExtendTasksDatasource(this.taskService);
  }
}
