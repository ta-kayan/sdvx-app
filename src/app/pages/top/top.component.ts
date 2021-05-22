import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.auth.user.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['userinfo']);
      }
      else{
        this.router.navigate(['login']);
      }
    });
  }
}
