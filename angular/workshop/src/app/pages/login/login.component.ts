import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ServiceResult } from '../../entity/service-result';
import { User } from '../../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  hide: boolean = true;
  errorMsg: string;
  constructor(private userService: UserService) {
    this.user = {};
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.userService.logIn(this.user).subscribe(res => {
    }, err => {
      let serviceResult: ServiceResult<User> = err.error as ServiceResult<User>;
      this.errorMsg = serviceResult.errorMsg;;
      serviceResult.errorCode === 100 ? this.user.id = null : this.user.password = null;
    });
  }
}
