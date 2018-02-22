import { Location } from '@angular/common';
import { EnumService } from './../../services/enum.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { Constant } from '../../entity/constant';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  hide: boolean = true;
  user: User;
  oriUser: any = {};

  genders: any;
  roles: any;

  signUpForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  isUpdate: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private enumService: EnumService) {
    this.user = new User();
  }

  ngOnInit() {
    this.enumService.getOptions("com.workshop.domain.constant.Gender").subscribe(res => this.genders = res);
    this.enumService.getOptions("com.workshop.domain.constant.Role").subscribe(res => this.roles = res);
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.route.queryParamMap.subscribe(params => {
      this.successMsg = params.get("successMsg");
    });

    if (id !== Constant.INVALID_ID) {
      this.isUpdate = true;
      this.userService.getUser(id).subscribe(res => {
        console.log(res);
        this.user = res.data;
        this.oriUser = Object.assign({}, this.user);
        console.log("oriUser: " + this.oriUser);
      });
    }
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));

    if (this.isUpdate) {
      this.userService.updateUser(this.user).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.successMsg = "Update user " + this.user.id + " successfully!";
        }
      });
    }
    else {
      this.userService.addUser(this.user).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.refresh("Create user " + this.user.id + " successfully!");
        }
      });
    }
  }

  refresh(successMsg: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'successMsg': successMsg }
    };

    // Navigate to the login page with extras
    this.router.navigate(['/user/', this.user.id], navigationExtras);
  }

  resetForm(): void {
    this.user = Object.assign({}, this.oriUser);
    console.log(JSON.stringify(this.user));
  }

  goBack(): void {
    this.location.back();
  }
}
