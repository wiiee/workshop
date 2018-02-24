import { MatDialog } from '@angular/material';
import { TeamService } from './../../services/team.service';
import { Team } from './../../entity/team';
import { Component, OnInit } from '@angular/core';
import { Constant } from '../../entity/constant';
import { Location } from '@angular/common';
import { EnumService } from './../../services/enum.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { BaseForm } from '../shared/base.form';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent extends BaseForm<Team, TeamService> implements OnInit {
  ownerPairs: any;
  userPairs: any;

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    teamService: TeamService,
    private userService: UserService) {
    super(route, router, location, matDialog, teamService, "/team");
    this.entity = new Team();
  }

  ngOnInit() {
    this.userService.getOwnerPairs().subscribe(res => {
      this.ownerPairs = res;
    });
    this.userService.getUserPairs().subscribe(res => {
      this.userPairs = res;
    });

    this.getEntity();
  }
}
