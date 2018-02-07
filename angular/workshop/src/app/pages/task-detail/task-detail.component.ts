import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService) { }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id === -1) {
      this.task = {};
    }
    else {
      this.taskService.getTask(id)
        .subscribe(task => this.task = task);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
