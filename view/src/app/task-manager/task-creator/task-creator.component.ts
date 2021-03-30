import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TaskManagerService } from '../task-mananager.service';
import { Subject } from '../../models/subjects/subject';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreatorComponent implements OnInit {
  constructor(private taskService: TaskManagerService) {}
  subjects$!: Observable<Subject[]>;
  descriptionForm!: FormGroup;
  specialForm!: FormGroup;
  screenWidth!: number;
  minWidth = environment.minWidth;
  minDate = new Date();
  Object = Object;
  contactWays = [
    { name: 'vk.com', field: 'VK ID', enabled: false },
    { name: 'telegram', field: 'Telegram @username', enabled: false },
    { name: 'email', field: 'email address', enabled: true },
  ];

  contacts = {
    vk: {
      field: 'VK ID',
      enabled: false,
    },
    telegram: {
      field: 'Telegram @username',
      enabled: false,
    },
    email: {
      field: 'email address',
      enabled: true,
    },
  };

  triggerWay(contactWay: string) {
    this.contactWays.find((contact) => {
      return contact.name === contactWay;
    });
  }

  ngOnInit() {
    this.subjects$ = this.taskService.getAllSubjects();
    this.minDate.setDate(this.minDate.getDate() + 2);
    this.descriptionForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.specialForm = new FormGroup({
      dueDate: new FormControl('', [Validators.required]),
      isAuthorFromUniversity: new FormControl(false, [Validators.required]),
      contact: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    console.log(this.descriptionForm.value);
    console.log(this.specialForm.value);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    this.screenWidth = window.innerWidth;
  }
}

export class DatepickerFilterExample {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    console.log(day);
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
