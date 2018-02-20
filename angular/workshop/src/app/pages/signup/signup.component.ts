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
      console.error("error: ", JSON.stringify(err.error));
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.userService.signUp(this.user).subscribe(res => {
      if (!res.body.isSuccessful) {
        this.errorMsg = res.body.errorMsg;
      }
    });
  }
}
