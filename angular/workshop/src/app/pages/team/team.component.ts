import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../entity/team';
import { BaseList } from '../shared/base.list';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent extends BaseList<Team, TeamService> implements OnInit {
  constructor(teamService: TeamService) {
    super(teamService, ['name', 'ownerIds', 'userIds']);
  }

  ngOnInit() {
  }
}
