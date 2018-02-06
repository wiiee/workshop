import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  hide: boolean = true;
  errorMsg: string;
  constructor(private authService: AuthService) {
    this.user = {};
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.authService.logIn(this.user).subscribe((res: any) => {
      if (!this.authService.isLoggedIn) {
        this.user = {};
        this.errorMsg = <string>res.message;
      }
    });
  }
}
