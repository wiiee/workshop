import { TaskMetricPoint } from './../../entity/task-metric-point';
import { AuthService } from './../../services/auth.service';
import { Pair } from './../../entity/pair';
import { MatRadioChange } from '@angular/material';
import { TaskMetricUtil } from '../../util/echarts/task-metric-util';
import { EChartsUtil } from '../../util/echarts/echarts-util';

export abstract class BaseMetric {
    option1: any;
    option2: any;
    option3: any;

    intervals: any;
    interval: string;

    startDate: Date;
    endDate: Date;

    source: TaskMetricPoint[];
    data: TaskMetricPoint[];

    phasePairs: Pair<string, boolean>[];
    isPhaseAll: boolean;

    constructor(public authService: AuthService) {
        this.interval = "all";
        this.intervals = TaskMetricUtil.INTERVALS;

        this.phasePairs = [];
        this.authService.reloadTeam().subscribe(res => {
            res.teamSetting.phases.forEach(o => {
                this.phasePairs.push({
                    key: o,
                    value: true
                })
            });

            this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
        });
    }

    initData(res: TaskMetricPoint[]): void {
        this.source = res;
        this.rebuildData();
        console.log(res);
    }

    calculate(): void {
        this.rebuildData();
    }

    private rebuildData(): void {
        this.data = TaskMetricUtil.getRange(this.source, this.startDate, this.endDate);
        this.data = TaskMetricUtil.getPointsByInterval(this.data, this.interval);
        this.setOptions();
    }

    private setOptions(): void {
        this.setOption1();
        this.setOption2();
        this.setOption3();
    }

    private setOption1(): void {
        let total = this.data.map(o => o.value).reduce((p, v) => p + v);
        let length = this.data.length;
        let average = length === 0 ? 0 : Math.round(total / length);

        let title = 'Workload -> Length: ' + length
            + ' | Total: ' + total
            + ' | Average: ' + average;
        this.option1 = EChartsUtil.buildLine(TaskMetricUtil.getValueLine(this.data, title));
    }

    private setOption2(): void {
        let title = 'Phase';
        let name = 'Phase';

        this.option2 = EChartsUtil.buildPie(TaskMetricUtil.getPhasesPie(this.data, title, name));
    }

    private setOption3(): void {
        console.log(this.phasePairs.map(o => o.key + "/" + o.value).join(","));

        let title = 'Phases';
        this.option3 = EChartsUtil.buildLine(TaskMetricUtil.getPhasesLine(this.data, this.phasePairs, title));
    }

    reloadPhases(): void {
        //this.phase = event.value;
        this.isPhaseAll = this.phasePairs.map(o => o.value).reduce((p, c) => p && c);
        console.log("all: " + this.isPhaseAll);
        this.setOption3();
    }

    switchAll(): void {
        //this.isPhaseAll = !this.isPhaseAll;
        this.phasePairs.forEach(o => o.value = this.isPhaseAll);
        this.setOption3();
    }
}