import { AuthService } from './../../services/auth.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Constant } from '../../entity/constant';
import { User } from '../../entity/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn
      && this.localStorageService.getItem(Constant.USER)
      && this.localStorageService.getItem(Constant.AUTHORIZATION_TOKEN)) {
      this.authService.isLoggedIn = true;
      this.authService.user = <User>JSON.parse(this.localStorageService.getItem(Constant.USER));
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
