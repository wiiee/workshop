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
  constructor(taskService: TaskService) {
    super(taskService, ['id', 'title', 'description', 'reporterId']);
  }

  ngOnInit() {
  }
}
