import { Location } from '@angular/common';
import { TaskService } from './../../services/task.service';
import { Task } from './../../entity/task';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent extends BaseList<Task, TaskService> implements OnInit {
  constructor(
    location: Location,
    taskService: TaskService) {
    super(taskService, ['title', 'description', 'reporterId', 'assigneeId', 'phase', 'teamId'], location);
  }

  ngOnInit() {

  }
}
