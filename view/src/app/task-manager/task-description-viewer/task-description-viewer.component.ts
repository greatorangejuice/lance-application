import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/tasks/task';
import { TaskManagerService } from '../task-mananager.service';

@Component({
  selector: 'app-task-description-viewer',
  templateUrl: './task-description-viewer.component.html',
  styleUrls: ['./task-description-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDescriptionViewerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskManagerService
  ) {}
  task!: Task;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = String(routeParams.get('taskId'));
    // TODO add async pipe
    this.taskService.getTaskById(taskIdFromRoute).subscribe();
  }
}
