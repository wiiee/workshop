import { Component, OnInit } from '@angular/core';
import { EnumService } from '../../services/enum.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  user: any;
  genders: any;
  constructor(private enumService: EnumService) {
    this.user = {
      id: "",
      name: "",
      nickName: "",
      moblieNo: "",
      gender: "male",
      password: ""
    };

    enumService.getOptions("com.workshop.domain.constant.Gender").subscribe((res: any) => {
      this.genders = res;
      console.log(res);
    }, err => {
      console.error("ERROR", err)
    });
   }

  ngOnInit() {
  }

}
