import { Phase } from './../../../entity/phase';
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
import { MatTableDataSource, MatPaginator, MatSort, MatRadioChange } from '@angular/material';
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

  dataSource: MatTableDataSource<Task>;
  entities: Task[];
  displayedColumns: string[];

  @ViewChild(MatSort) sort: MatSort;
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

    this.entities = [];
    this.displayedColumns = ["id", "value", "startDate", "endDate"];
    this.tasks = [];
    this.teamId = this.route.snapshot.paramMap.get('id');

    this.interval = "week";
    this.intervals = TaskMetricUtil.INTERVALS.filter(
      o => o.key === "Weekly" || o.key === "Monthly" || o.key === "Yearly");

    this.phasePairs = [];
  }

  ngOnInit() {
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
      this.metricService.getByTeamId(this.teamId).subscribe(res => {
        this.source = res;
        this.rebuildData();
        
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
    this.buildUserTable(this.selectedId);
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
  }

  reloadPhases(): void {
    this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
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

  getDuration(points: TaskMetricPoint[]): number {
    return points.map(o => o.duration).reduce((p, c) => p + c);
  }

  getBlock(points: TaskMetricPoint[]): number {
    let phases = points.map(o => o.phases);
    let result = 0;
    phases.forEach(o => {
      if(o && o["Blocked"]){
        result += o["Blocked"];
      }
    });
    return result;
  }


  radioChange(event: MatRadioChange): void {
    this.buildUserTable(event.value);
  }

  buildUserTable(value: string): void {
    let points: TaskMetricPoint[] = this.data.get(value);

    this.entities = [];

    if(points){
      points.map(o => o.id).join(",").split(",").filter(o => o).forEach(o => {
        this.entities.push(this.tasks.find(p => p.id === o));
      });
  
      this.dataSource = new MatTableDataSource(this.entities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}