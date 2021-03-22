import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILoginData } from '../../models/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form!: FormGroup;
  submitted = false;
  message = '';
  username = '';
  hide = true;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): Subscription {
    const loginData: ILoginData = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    return this.authService.login(loginData).subscribe(
      (data) => {
        console.log(data);
        this.submitted = false;
        this.router.navigate(['/tasks']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
