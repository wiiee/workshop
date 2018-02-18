import { Component, OnInit } from '@angular/core';
import { EnumService } from '../../services/enum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
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
  constructor(private enumService: EnumService, private userService: UserService, private router: Router) {
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
    this.userService.signUp(this.user).subscribe((res: any) => {
      if (!this.userService.isLoggedIn) {
        this.user = {};
        this.errorMsg = <string>res.message;
      }
    });
  }
}
