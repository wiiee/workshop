import { AuthService } from './../../services/auth.service';
import { Location } from '@angular/common';
import { EnumService } from './../../services/enum.service';
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
  oriUser: User;

  genders: any;
  roles: any;
  levels: any;

  errorMsg: string;
  successMsg: string;

  //是否是新建
  isNew: boolean;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private enumService: EnumService,
    private authService: AuthService) {
    this.user = new User();
    this.isNew = true;
  }

  ngOnInit() {
    this.enumService.getOptions("com.workshop.domain.constant.Gender").subscribe(res => this.genders = res);
    this.enumService.getOptions("com.workshop.domain.constant.Level").subscribe(res => this.levels = res);
    this.enumService.getOptions("com.workshop.domain.constant.Role").subscribe(res => {
      if(this.authService.isLoggedIn && this.authService.user.role === Constant.ADMIN){
        this.roles = res;
      }
      else{
        this.roles = res.filter(o => o.key !== Constant.ADMIN);
      }
    });
    this.getUser();
  }

  getUser(): void {
    this.route.queryParamMap.subscribe(params => {
      this.successMsg = params.get("successMsg");
      const id = this.route.snapshot.paramMap.get('id');

      if (id !== Constant.INVALID_ID) {
        this.isNew = false;
        this.userService.getOne(id).subscribe(res => {
          console.log(res);
          this.user = res.data;
          this.oriUser = Object.assign({}, this.user);
          console.log("oriUser: " + this.oriUser);
        });
      }
    });
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.user));

    if (this.isNew) {
      this.userService.add(this.user).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.refresh("Create user " + this.user.id + " successfully!");
        }
      });
    }
    else {
      this.userService.update(this.user).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.successMsg = "Update user " + this.user.id + " successfully!";
        }
      });
    }
  }

  refresh(successMsg: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'successMsg': successMsg }
    };

    // Navigate to the user detail page with extras
    this.router.navigate(['/user', this.user.id], navigationExtras);
  }

  resetForm(): void {
    this.user = Object.assign({}, this.oriUser);
    console.log(JSON.stringify(this.user));
  }

  goBack(): void {
    this.location.back();
  }
}
