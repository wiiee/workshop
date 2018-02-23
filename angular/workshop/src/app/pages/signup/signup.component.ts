import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { EnumService } from '../../services/enum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../entity/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  user: User;
  genders: any;
  roles: any;
  signUpForm: FormGroup;
  errorMsg: string;
  constructor(private enumService: EnumService, private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
    this.enumService.getOptions("com.workshop.domain.constant.Gender").subscribe(res => this.genders = res);
    this.enumService.getOptions("com.workshop.domain.constant.Role").subscribe(res => this.roles = res);
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));
    this.authService.signUp(this.user).subscribe(res => {
      if (!res.body.isSuccessful) {
        this.errorMsg = res.body.errorMsg;
      }
    });
  }
}
