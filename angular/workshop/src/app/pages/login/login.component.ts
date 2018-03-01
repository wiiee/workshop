import { HeaderMessageComponent } from './../header-message/header-message.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceResult } from '../../entity/service-result';
import { User } from '../../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  hide: boolean = true;

  @ViewChild('msg')
  msg: HeaderMessageComponent;

  constructor(private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.msg.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.authService.logIn(this.user).subscribe(res => { }, err => {
      let serviceResult: ServiceResult<User> = err.error as ServiceResult<User>;
      this.msg.errorMsg = serviceResult.errorMsg;

      if (serviceResult.errorCode === 1021) {
        this.user.id = null;
      }
      else if (serviceResult.errorCode = 1022) {
        this.user.password = null;
      }
    });
  }
}
