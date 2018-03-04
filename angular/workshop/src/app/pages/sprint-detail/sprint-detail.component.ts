import { TeamService } from './../../services/team.service';
import { TaskService } from './../../services/task.service';
import { Pair } from './../../entity/pair';
import { Task } from './../../entity/task';
import { Sprint } from './../../entity/sprint';
import { SprintService } from './../../services/sprint.service';
import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../shared/base.form';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { EnumUtil } from '../../util/enum-util';
import { Phase } from '../../entity/phase';

// import { groupBy } from 'lodash/groupBy';
import * as _ from "lodash";

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.css']
})
export class SprintDetailComponent extends BaseForm<Sprint, SprintService> implements OnInit {
  tasksGroup: Array<string>[];

  todos: string[];
  analysis: string[];
  pendings: string[];
  ongoings: string[];
  dones: string[];

  phases: string[];

  taskPairs: Pair<string, string>[];

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    sprintService: SprintService,
    private taskService: TaskService) {
    super(route, router, location, matDialog, sprintService, "/sprint");

    if (!this.entity) {
      this.entity = new Sprint();
    }
  }

  ngOnInit() {
    this.taskService.getTaskPairs(null).subscribe(res => this.taskPairs = res);

    this.phases = EnumUtil.getNames(Phase);
    this.tasksGroup = [];

    this.phases.forEach(element => {
      console.log("phase: " + element);
      this.tasksGroup.push([]);
    });

    // _.groupBy(this.entity.taskIds, 'getPhase()');

    this.todos = ["t1", "t2"];
    this.analysis = ["a1", "a2"];
    this.pendings = ["p1", "p2", "p3"];
    this.ongoings = ["o1", "o2", "o3"];
    this.dones = ["d1", "d2", "d3"];
  }

  drop($event: any, source: string[]) {
    console.log($event);
    let data: any = $event.dragData;

    source.push(data);
  }

  drag(i: number, source: string[]) {
    console.log(i);
    source.splice(i, 1);
  }

  allow(source: string[]) {
    return (dragData: any) => !source.includes(dragData);
  }
}
