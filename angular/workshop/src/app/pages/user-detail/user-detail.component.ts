import { AuthService } from './../../services/auth.service';
import { Location } from '@angular/common';
import { EnumService } from './../../services/enum.service';
import { ActivatedRoute, NavigationExtras, Router, UrlTree } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { Constant } from '../../entity/constant';
import { MatDialog } from '@angular/material';
import { BaseForm } from '../shared/base.form';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BaseForm<User, UserService> implements OnInit {
  hide: boolean = true;

  genders: any;
  roles: any;
  levels: any;

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    userService: UserService,
    private enumService: EnumService,
    private authService: AuthService) {
    super(route, router, location, matDialog, userService, "/user");

    if(!this.entity){
      this.entity = new User();
    }
  }

  ngOnInit() {
    this.enumService.getOptions("com.workshop.domain.constant.Gender").subscribe(res => this.genders = res);
    this.enumService.getOptions("com.workshop.domain.constant.Level").subscribe(res => this.levels = res);
    this.enumService.getOptions("com.workshop.domain.constant.Role").subscribe(res => {
      if (this.authService.isLoggedIn && this.authService.user.role === Constant.ADMIN) {
        this.roles = res;
      }
      else {
        this.roles = res.filter(o => o.key !== Constant.ADMIN);
      }
    });
  }
}
