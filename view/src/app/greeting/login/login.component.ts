import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit(): void {
    this.authService.login('admin@email.com', 'admin').subscribe();
  }

  submitS(): void {
    console.log('Start test');
    this.authService.test().subscribe();
  }
}
