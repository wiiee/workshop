import { JiraService } from './../../services/jira.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {

  constructor(private jiraService: JiraService) { }

  ngOnInit() {
  }

  export() {
    this.jiraService.export().subscribe();
  }
}
