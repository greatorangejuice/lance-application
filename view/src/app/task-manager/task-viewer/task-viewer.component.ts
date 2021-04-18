import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../task-mananager.service';
import { ExtendTasksDatasource } from '../../core/datasources/extendTasks.datasource';
import { ITableColumns } from '../../models/tables/table-columns.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-viewer',
  templateUrl: './task-viewer.component.html',
  styleUrls: ['./task-viewer.component.scss'],
})
export class TaskViewerComponent implements OnInit {
  dataSource!: ExtendTasksDatasource;
  constructor(
    private taskService: TaskManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  tableColumns: ITableColumns[] = [
    { title: 'title' },
    { title: 'description' },
    { title: 'dueDate' },
  ];
  ngOnInit(): void {
    this.dataSource = new ExtendTasksDatasource(this.taskService);
  }

  openTaskDescription(data: any) {
    this.router.navigate([`${data}`], { relativeTo: this.route });
    console.log(data);
  }
}
