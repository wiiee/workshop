import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
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
  errorMsg: string;
  constructor(private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.authService.logIn(this.user).subscribe(res => {
    }, err => {
      let serviceResult: ServiceResult<User> = err.error as ServiceResult<User>;
      this.errorMsg = serviceResult.errorMsg;

      if (serviceResult.errorCode === 100) {
        this.user.id = null;
      }
      else if (serviceResult.errorCode = 101) {
        this.user.password = null;
      }
    });
  }
}
