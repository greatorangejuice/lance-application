import { BehaviorSubject } from 'rxjs';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abstract',
  template: '',
})
export abstract class AbstractTaskComponent implements OnInit {
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected isErrored = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public isErrored$ = this.isErrored.asObservable();

  ngOnInit(): void {}
}
