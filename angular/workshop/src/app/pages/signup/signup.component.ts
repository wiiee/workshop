import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  user: any;
  constructor() {
    this.user = {
      id: "",
      name: "",
      nickName: "",
      moblieNo: "",
      gender: "male",
      password: ""
    };
   }

  ngOnInit() {
  }

}
