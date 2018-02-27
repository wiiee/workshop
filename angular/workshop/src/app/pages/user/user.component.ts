import { User } from './../../entity/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  extends BaseList<User, UserService> implements OnInit {
  constructor(userService: UserService) {
    super(userService, ['id', 'name', 'nickName', 'mobileNo', 'level', 'role']);
  }

  ngOnInit() {
  }
}