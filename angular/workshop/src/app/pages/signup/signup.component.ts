import { Component, OnInit } from '@angular/core';
import { EnumService } from '../../services/enum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  user: any;
  genders: any;
  signUpForm: FormGroup;
  errorMsg: string;
  constructor(private enumService: EnumService, private authService: AuthService, private router: Router) {
    this.user = {
    };

    enumService.getOptions("com.workshop.domain.constant.Gender").subscribe((res: any) => {
      this.genders = res;
    }, err => {
      console.error("ERROR", err)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.authService.signUp(this.user).subscribe((res: any) => {
      if (!this.authService.isLoggedIn) {
        this.user = {};
        this.errorMsg = <string>res.message;
      }
    });
  }
}
