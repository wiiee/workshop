import { Location } from '@angular/common';
import { TaskService } from './../../services/task.service';
import { Task } from './../../entity/task';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent extends BaseList<Task, TaskService> implements OnInit {
  isList: boolean = true;

  constructor(
    location: Location,
    taskService: TaskService,
    public userService: UserService) {
    super(taskService, ['title', 'assigneeId', 'startDate', 'endDate', 'phase'], location);
  }

  ngOnInit() {

  }
}
