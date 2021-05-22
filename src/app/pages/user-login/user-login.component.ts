import { Component, OnInit } from '@angular/core';

// 以下追加したもの
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.auth.user.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['userinfo']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password)
      .then(() => {
        this.router.navigate(['/table/difficult']);
      });
  }

  googleLogin() {
    this.auth.googleLogin()
      .then(() => {
        this.router.navigate(['userinfo']);
      });
  }
}