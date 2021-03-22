import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../auth';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  toggleClass() {
    console.log('Change class');
  }
  userIsLogged(): boolean {
    console.log(!!this.authService.userValue);
    return !!this.authService.userValue;
  }
}
