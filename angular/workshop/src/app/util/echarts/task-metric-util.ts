import { Section } from './../../entity/echarts/section';
import { Point } from './../../entity/echarts/point';
import { Line } from './../../entity/echarts/line';
import { Pair } from './../../entity/pair';
import { TaskMetricPoint } from './../../entity/task-metric-point';

import * as _ from "lodash";
import { Pie } from '../../entity/echarts/pie';

export abstract class TaskMetricUtil {
    private static readonly ONE_DAY_MILLI_SECONDS: number = 86400000;
    public static readonly INTERVALS: Pair<string, string>[] = [
        { key: "All", value: "all" },
        { key: "Daily", value: "day" },
        { key: "Weekly", value: "week" },
        { key: "Monthly", value: "month" },
        { key: "Yearly", value: "year" }
    ];

    static getRange(points: TaskMetricPoint[], startDate: Date, endDate: Date): TaskMetricPoint[] {
        return points.filter(o => this.isInRange(new Date(o.dateTime), startDate, endDate));
    }

    private static isInRange(date: Date, startDate: Date, endDate: Date): boolean {
        if (startDate && endDate)
            return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime() + this.ONE_DAY_MILLI_SECONDS;

        if (startDate) {
            return date.getTime() >= startDate.getTime();
        }

        if (endDate) {
            return date.getTime() <= endDate.getTime() + this.ONE_DAY_MILLI_SECONDS;
        }

        return true;
    }

    static getValueLine(points: TaskMetricPoint[], title: string): Line {
        return new Line(title, points.map(o => new Point(o.dateTime, o.value)));
    }

    static getPhasesPie(points: TaskMetricPoint[], title: string, name: string): Pie {
        let phases = points.map(o => o.phases).reduce((prev, current) => prev.concat(current));
        let groups = _.groupBy(phases, "key");

        let sections: Section[] = [];

        for (let key in groups) {
            sections.push(new Section(key, groups[key].map(o => o.value).reduce((p, c) => p + c)));
        }

        return new Pie(title, name, sections);
    }

    //获取各阶段耗费时间
    static getPhasesLine(points: TaskMetricPoint[], phasePairs: Pair<string, boolean>[], title: string): Line {
        return new Line(title, points.map(o => new Point(o.dateTime, this.getDuration(o, phasePairs))));
    }

    static getPointsByInterval(points: TaskMetricPoint[], interval: string): TaskMetricPoint[] {
        if (interval === "all") {
            return points;
        }

        let groups = _.groupBy(points, interval);
        let result: TaskMetricPoint[] = [];

        for (let key in groups) {
            let items = <TaskMetricPoint[]>groups[key];
            result.push(new TaskMetricPoint(null, key,
                items.map(o => o.value).reduce((prev, current) => prev + current),
                items.map(o => o.duration).reduce((prev, current) => prev + current),
                null, null, null, null,
                this.combinePhases(items.map(o => o.phases))
            ));
        }

        return result;
    }

    //组合phases
    private static combinePhases(data: Array<Pair<string, number>[]>): Pair<string, number>[] {
        let phases = data.reduce((prev, current) => prev.concat(current));
        let groups = _.groupBy(phases, 'key');
        let result = [];

        for (let key in groups) {
            let total = groups[key].map(o => o.value).reduce((prev, current) => prev + current);
            result.push({
                key: key,
                value: Math.round(total / data.length)
            })
        }

        return result;
    }

    private static getDuration(point: TaskMetricPoint, phasePairs: Pair<string, boolean>[]): number {
        let phases = {};
        point.phases.forEach(o => phases[o.key] = o.value);

        let result: number = 0;
        phasePairs.forEach(o => {
            if (o.value) {
                result += phases[o.key];
            }
        });

        return result;
    }
}