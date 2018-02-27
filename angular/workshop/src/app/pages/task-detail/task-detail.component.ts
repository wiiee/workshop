import { Observable } from 'rxjs/Observable';
import { TeamService } from './../../services/team.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { TaskService } from './../../services/task.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BaseForm } from '../shared/base.form';
import { Task } from '../../entity/task';
import { Pair } from '../../entity/pair';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent extends BaseForm<Task, TaskService> implements OnInit {
  userPairs: Pair<string, string>[];
  teamPairs: Pair<string, string>[];

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    taskService: TaskService,
    private authService: AuthService,
    private userService: UserService,
    private teamService: TeamService) {
    super(route, router, location, matDialog, taskService, "/task");

    if (!this.entity) {
      this.entity = new Task();
      this.entity.reporterId = authService.getUserId();
    }
  }

  ngOnInit() {
    this.userService.getUserPairs().subscribe(res => this.userPairs = res);
    this.teamService.getTeamPairs().subscribe(res => {
      this.isNew ? this.teamPairs = res : this.teamPairs = res.filter(o => o.key !== this.entity.id);
    });
  }
}
