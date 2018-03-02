import { Task } from './../../entity/task';
import { Sprint } from './../../entity/sprint';
import { SprintService } from './../../services/sprint.service';
import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../shared/base.form';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

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

  constructor(
    route: ActivatedRoute,
    router: Router,
    location: Location,
    matDialog: MatDialog,
    sprintService: SprintService) {
    super(route, router, location, matDialog, sprintService, "/sprint");

    if (!this.entity) {
      this.entity = new Sprint();
    }
  }

  ngOnInit() {
    this.tasksGroup = [];

    

    this.todos = ["t1", "t2"];
    this.analysis = ["a1", "a2"];
    this.pendings = ["p1", "p2", "p3"];
    this.ongoings = ["o1", "o2", "o3"];
    this.dones = ["d1", "d2", "d3"];

    this.tasksGroup.push(this.todos);
    this.tasksGroup.push(this.analysis);
    this.tasksGroup.push(this.pendings);
    this.tasksGroup.push(this.ongoings);
    this.tasksGroup.push(this.dones);
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
