import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

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
    this.userService.logIn(this.user).subscribe((res: any) => {

    }, err => {
      err.error.errorCode === 100 ? this.user.id = null : this.user.password = null;
      this.errorMsg = err.error.errorMsg;
    });
  }
}
