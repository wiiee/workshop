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
  tasksGroup: Array<Task>[];
  phases: string[];

  //所有的tasks
  taskPairs: Pair<string, string>[];
  //当前sprint的tasks
  tasks: Task[];

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    sprintService: SprintService,
    private taskService: TaskService) {
    super(route, router, location, matDialog, sprintService, "/sprint", new Sprint());
  }

  ngOnInit() {
    this.taskService.getTaskPairs(null).subscribe(res => this.taskPairs = res);

    this.phases = EnumUtil.getNames(Phase);
    this.tasksGroup = [];

    this.seq.subscribe(res => {
      this.taskService.getByIds(res.data.taskIds).subscribe(result => {
        this.tasks = result.datum;
        this.phases.forEach(phase => {
          console.log("phase: " + phase);
          // let items = this.tasks.filter(o => o.phase.toString() === phase);
          this.tasksGroup.push(this.tasks);
        });
      });
    });
  }

  drop($event: any, group: Task[]) {
    console.log($event);
    let data: any = $event.dragData;

    group.push(data);
  }

  drag(i: number, group: Task[]) {
    console.log(i);
    group.splice(i, 1);
  }

  allow(group: Task[]) {
    return (dragData: any) => true;
    // return (dragData: any) => !group.includes(dragData);
  }
}
