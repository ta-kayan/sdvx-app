import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { SKILL } from '../../lv18s-tables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public checkoutForm;
  skills = SKILL;
  nameControl;
  sdvxIdControl;
  skillControl;
  twitterIdControl;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      this.nameControl = new FormControl(user.name);
      this.sdvxIdControl = new FormControl(user.sdvxId);
      this.skillControl = new FormControl(user.skill);
      this.twitterIdControl = new FormControl(user.twitterId);
      this.checkoutForm = this.formBuilder.group({
        name: this.nameControl,
        sdvxId: this.sdvxIdControl,
        skill: this.skillControl,
        twitterId: this.twitterIdControl
      });
    });
  }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.nameControl = new FormControl(user.name);
      this.sdvxIdControl = new FormControl(user.sdvxId);
      this.skillControl = new FormControl(user.skill);
      this.twitterIdControl = new FormControl(user.twitterId);
      this.checkoutForm = this.formBuilder.group({
        name: this.nameControl || '',
        sdvxId: this.sdvxIdControl,
        skill: this.skillControl,
        twitterId: this.twitterIdControl
      });
    });
  }

  onSubmit(data) {
    console.log('submit');
    console.log(data);
    this.auth.user.subscribe(user => {
      this.auth.putUserData(user, data);
      this.router.navigate(['userinfo']);
    });
  }

}
