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
    { name: 'vk', field: 'VK ID', isEnabled: true },
    { name: 'telegram', field: 'Telegram @username', isEnabled: true },
    { name: 'email', field: 'email address', isEnabled: true },
  ];

  triggerWay(contactWay: string): void {
    const way = this.contactWays.find((contact) => {
      return contact.name === contactWay;
    });

    if (way) {
      console.log(this.specialForm.get(way.name));
      const formControl = this.specialForm.get(way.name);
      console.log(formControl);
      console.log(formControl?.value);
      formControl?.enabled
        ? this.specialForm.disable()
        : this.specialForm.enable();
    }
  }

  ngOnInit() {
    this.subjects$ = this.taskService.getAllSubjects();
    console.log(this.subjects$);
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
    this.contactWays.forEach((item) => {
      this.specialForm.addControl(
        item.name,
        new FormControl({ value: '', disabled: !item.isEnabled })
      );
    });
  }

  submit() {
    console.log({ ...this.descriptionForm.value, ...this.specialForm.value });
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
