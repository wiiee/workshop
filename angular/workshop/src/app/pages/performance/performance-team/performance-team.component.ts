import { TaskService } from './../../../services/task.service';
import { TeamService } from './../../../services/team.service';
import { Location } from '@angular/common';
import { TaskMetricPoint } from './../../../entity/task-metric-point';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { Pair } from './../../../entity/pair';
import { ActivatedRoute } from '@angular/router';
import { MetricService } from './../../../services/metric.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseMetric } from '../../shared/base.metric';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TaskMetricUtil } from '../../../util/echarts/task-metric-util';
import { EChartsUtil } from '../../../util/echarts/echarts-util';
import { BasePage } from '../../shared/base.page';
import { Task } from '../../../entity/task';

@Component({
  selector: 'app-performance-team',
  templateUrl: './performance-team.component.html',
  styleUrls: ['./performance-team.component.css']
})
export class PerformanceTeamComponent extends BasePage implements OnInit {
  userPairs: Pair<string, string>[] = [];

  dataSource: MatTableDataSource<Performance>;

  option1: any;
  option2: any;
  option3: any;

  intervals: any;
  interval: string;

  startDate: Date;
  endDate: Date;

  source: TaskMetricPoint[];
  range: TaskMetricPoint[];
  cardsNumber: number;
  data: Map<string, TaskMetricPoint[]>;

  phasePairs: Pair<string, boolean>[];
  isPhaseAll: boolean;

  teamId: string;

  tasks: Task[];

  selectedId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    location: Location,
    private metricService: MetricService,
    private authService: AuthService,
    private teamService: TeamService,
    public taskService: TaskService,
    public userService: UserService) {
    super(location);
  }

  ngOnInit() {
    this.tasks = [];
    this.teamId = this.route.snapshot.paramMap.get('id');

    this.interval = "week";
    this.intervals = TaskMetricUtil.INTERVALS.filter(
      o => o.key === "Weekly" || o.key === "Monthly" || o.key === "Yearly");

    this.phasePairs = [];

    this.teamService.getOne(this.teamId).subscribe(res =>
      res.data.teamSetting.phases.forEach(o => {
        this.phasePairs.push({
          key: o,
          value: true
        });

        this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
      })
    );

    this.route.queryParamMap.subscribe(params => {
      console.log("params: " + params);
      this.metricService.getByTeamId(this.teamId).subscribe(res => {
        this.source = res;
        this.rebuildData();
        console.log(res);
        
        this.buildTasks();
      });

      this.userService.getUserPairsByTeamId(this.teamId).subscribe(res => this.userPairs = res);
    });
  }

  private buildTasks(): void {
    let taskIds = this.source.map(o => o.id);
    this.taskService.getByIds(taskIds).subscribe(res => this.tasks = res.datum);
  }

  calculate(): void {
    this.rebuildData();
  }

  private rebuildData(): void {
    this.range = TaskMetricUtil.getRange(this.source, this.startDate, this.endDate);
    this.cardsNumber = this.range.length;
    this.data = TaskMetricUtil.getUserPointsByInterval(this.range, this.interval);
    this.setOptions();
  }

  private setOptions(): void {
    if (this.range.length > 0) {
      this.setOption1();
      this.setOption2();
      this.setOption3();
    }
  }

  private setOption1(): void {
    let total: number = 0;
    let length: number = 0;
    let average: number = 0;

    this.data.forEach((value, key) => {
      total += value.map(o => o.value).reduce((p, v) => p + v);
      length = value.length;
    });

    average = length === 0 ? 0 : Math.round(total / length);

    let title = 'Story Point -> Number: ' + length
      + ' | Total: ' + total
      + ' | Average: ' + average;

    let bar = TaskMetricUtil.getValueBar(this.data, title);

    this.option1 = EChartsUtil.buildBarWithLine(bar);
  }

  private setOption2(): void {
    let title = 'Phase(Hours)';
    let name = 'Phase';

    let pie = TaskMetricUtil.getPhasesPie(this.range, title, name);
    pie.points.forEach(o => o.value = Math.round(o.value / 60));
    this.option2 = EChartsUtil.buildPie(pie);
  }

  private setOption3(): void {
    if (this.range.length > 0) {
      let bar = TaskMetricUtil.getPhasesBar(this.data, this.phasePairs, null);

      let total = 0;
      bar.y.forEach((v, k) => total += v.reduce((p, c) => p + c));

      let average = Math.round(total / this.cardsNumber);

      bar.title = 'Elapsed Hours -> Cards Number: ' + this.cardsNumber
        + ' | Total: ' + total
        + ' | Average: ' + average;

      this.option3 = EChartsUtil.buildBarWithLine(bar);
    }

    // console.log(this.phasePairs.map(o => o.key + "/" + o.value).join(","));

    // let title = 'Phases';
    // this.option3 = EChartsUtil.buildBarWithLine(TaskMetricUtil.getPhasesBar(this.data, this.phasePairs, title));
  }

  reloadPhases(): void {
    this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
    console.log("all: " + this.isPhaseAll);
    this.setOption3();
  }

  switchAll(): void {
    this.phasePairs.forEach(o => o.value = this.isPhaseAll);
    this.setOption3();
  }

  getUserMetricPairs(): Array<Pair<string, TaskMetricPoint[]>> {
    let result: Array<Pair<string, TaskMetricPoint[]>> = [];
    this.data.forEach((v, k) => result.push({
      key: k,
      value: v
    }));

    return result;
  }

  getStoryPoint(points: TaskMetricPoint[]): number {
    return points.map(o => o.value).reduce((p, c) => p + c);
  }

  getNumber(points: TaskMetricPoint[]): number {
    return points.map(o => o.size).reduce((p, c) => p + c);
  }

  getIds(points: TaskMetricPoint[]): string[] {
    let jiraIds = points.map(o => o.id).join(",");
    return jiraIds.split(",").filter(o => o);
  }

  getDuration(points: TaskMetricPoint[]): number {
    return points.map(o => o.duration).reduce((p, c) => p + c);
  }

  getTask(id: string): Task {
    let task = this.tasks.find(o => o.id === id);

    if(!task){
      task = new Task();
    }

    return task;
  }
}