import { Location } from '@angular/common';
import { User } from './../../entity/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseList<User, UserService> implements OnInit {
  constructor(
    userService: UserService,
    location: Location) {
    super(userService, ['id', 'name', 'nickName', 'jiraUserName', 'mobileNo', 'level', 'role'], location);
  }

  ngOnInit() {
  }
}