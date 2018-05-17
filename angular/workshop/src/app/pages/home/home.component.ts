import { JiraService } from './../../services/jira.service';
import { Pair } from './../../entity/pair';
import { TeamService } from './../../services/team.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Api } from './../../services/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teamPairs: Pair<string, string>[] = [];

  constructor(
    private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getTeamPairs().subscribe(res => this.teamPairs = res);
  }
}

