import { SprintService } from './../../services/sprint.service';
import { Sprint } from './../../entity/sprint';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent extends BaseList<Sprint, SprintService> implements OnInit {
  containerId: string;

  constructor(sprintService: SprintService, private authService: AuthService) {
    super(sprintService, ['name', 'taskIds']);
  }

  ngOnInit() {
    this.authService.reloadTeam().subscribe(team => this.containerId = team.id);
  }
}