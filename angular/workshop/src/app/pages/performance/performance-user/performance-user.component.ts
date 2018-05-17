import { TeamService } from './../../../services/team.service';
import { UserService } from './../../../services/user.service';
import { Location } from '@angular/common';
import { Pair } from './../../../entity/pair';
import { TaskMetricPoint } from './../../../entity/task-metric-point';
import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MetricService } from './../../../services/metric.service';
import { Component, OnInit } from '@angular/core';
import { TaskMetricUtil } from '../../../util/echarts/task-metric-util';
import { EChartsUtil } from '../../../util/echarts/echarts-util';
import { BasePage } from '../../shared/base.page';

@Component({
  selector: 'app-performance-user',
  templateUrl: './performance-user.component.html',
  styleUrls: ['./performance-user.component.css']
})
export class PerformanceUserComponent extends BasePage implements OnInit {
  option1: any;
  option2: any;
  option3: any;

  intervals: any;
  interval: string;

  startDate: Date;
  endDate: Date;

  source: TaskMetricPoint[];
  //日期过滤后的数据
  range: TaskMetricPoint[];
  //interval后的数据
  data: TaskMetricPoint[];

  phasePairs: Pair<string, boolean>[];
  isPhaseAll: boolean;

  userName: string;

  userId: string;

  constructor(
    private route: ActivatedRoute,
    private metricService: MetricService,
    private authService: AuthService,
    private userService: UserService,
    private teamService: TeamService,
    location: Location) {
    super(location);
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.interval = "all";
    this.intervals = TaskMetricUtil.INTERVALS;

    this.phasePairs = [];

    this.teamService.getTeamByUserId(this.userId).subscribe(res => 
      res.teamSetting.phases.forEach(o => {
        this.phasePairs.push({
          key: o,
          value: true
        });

        this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
      })
    );

    this.route.queryParamMap.subscribe(params => {
      this.userName = this.userService.getDisplayNameByUserId(this.userId);
      this.metricService.getByUserId(this.userId).subscribe(res => {
        this.source = res;
        this.rebuildData();
      });
    });
  }

  calculate(): void {
    this.rebuildData();
  }

  private rebuildData(): void {
    this.range = TaskMetricUtil.getRange(this.source, this.startDate, this.endDate);
    this.data = TaskMetricUtil.getPointsByInterval(this.range, this.interval);
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
    let total = this.range.map(o => o.value).reduce((p, v) => p + v);
    let length = this.data.length;
    let average = length === 0 ? 0 : Math.round(total / length);

    let title = 'Story Point -> Number: ' + length
      + ' | Total: ' + total
      + ' | Average: ' + average;

    this.option1 = EChartsUtil.buildLine(TaskMetricUtil.getValueLine(this.data, title));
  }

  private setOption2(): void {
    let title = 'Phase(Hours)';
    let name = 'Phase';

    let pie = TaskMetricUtil.getPhasesPie(this.data, title, name);
    pie.points.forEach(o => o.value = Math.round(o.value / 60));
    this.option2 = EChartsUtil.buildPie(pie);
  }

  private setOption3(): void {
    if (this.range.length > 0) {
      let line = TaskMetricUtil.getPhasesLine(this.data, this.phasePairs, null);

      let total = 0;
      line.y.forEach((v, k) => total += v.reduce((p, c) => p + c));

      let average = Math.round(total / this.range.length);

      line.title = 'Elapsed Hours -> Cards Number: ' + this.range.length
        + ' | Total: ' + total
        + ' | Average: ' + average;

      this.option3 = EChartsUtil.buildLine(line);
    }
  }

  reloadPhases(): void {
    //this.phase = event.value;
    this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
    console.log('all: ' + this.isPhaseAll);
    this.setOption3();
  }

  switchAll(): void {
    //this.isPhaseAll = !this.isPhaseAll;
    this.phasePairs.forEach(o => o.value = this.isPhaseAll);
    this.setOption3();
  }
}
