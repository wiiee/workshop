import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-message',
  templateUrl: './header-message.component.html',
  styleUrls: ['./header-message.component.css']
})
export class HeaderMessageComponent implements OnInit {
  successMsg: string;
  errorMsg: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.successMsg = params.get("successMsg");
      this.errorMsg = params.get("errorMsg");
    });
  }
}
