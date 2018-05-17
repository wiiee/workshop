import { Bar } from './../../entity/echarts/bar';
import { Section } from './../../entity/echarts/section';
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

    //获取某个用户的值
    static getValueLine(points: TaskMetricPoint[], title: string): Line {
        let y: Map<string, number[]> = new Map();
        y.set("", points.map(o => o.value));

        return new Line(title, points.map(o => o.dateTime), y);
    }

    //获取整个组的数据
    static getValueBar(users: Map<string, TaskMetricPoint[]>, title: string): Bar {
        let y: Map<string, number[]> = new Map();
        let x: string[];

        users.forEach((value, key) => {
            x = value.map(o => o.dateTime);
            y.set(key, value.map(o => o.value));
        });

        return new Bar(title, x, y);
    }

    static getPhasesPie(points: TaskMetricPoint[], title: string, name: string): Pie {
        let sections: Section[] = [];

        let phases = points.map(o => o.phases).reduce((p, v) => this.mergePhases(p, v));
        Object.keys(phases).forEach(k => sections.push(new Section(k, phases[k])));

        return new Pie(title, name, sections);
    }

    //获取各阶段耗费时间
    static getPhasesLine(points: TaskMetricPoint[], phasePairs: Pair<string, boolean>[], title: string): Line {
        let y: Map<string, number[]> = new Map();
        y.set("", points.map(o => this.getDuration(o, phasePairs)));

        return new Line(title, points.map(o => o.dateTime), y);
    }

    //获取每个人各阶段耗费时间
    static getPhasesBar(users: Map<string, TaskMetricPoint[]>, phasePairs: Pair<string, boolean>[], title: string): Bar {
        let y: Map<string, number[]> = new Map();
        let x: string[];

        users.forEach((value, key) => {
            x = value.map(o => o.dateTime);
            y.set(key, value.map(o => this.getDuration(o, phasePairs)));
        });

        return new Bar(title, x, y);
    }

    static getPointsByInterval(points: TaskMetricPoint[], interval: string): TaskMetricPoint[] {
        if (interval === "all") {
            return points;
        }

        let groups = _.groupBy(points, interval);
        let result: TaskMetricPoint[] = [];

        for (let key in groups) {
            let items = <TaskMetricPoint[]>groups[key];
            result.push(new TaskMetricPoint(items.map(o => o.id).join(','), items.map(o => o.userId).join(','),
                key,
                items.map(o => o.value).reduce((prev, current) => prev + current),
                items.map(o => o.duration).reduce((prev, current) => prev + current),
                null, null, null, null,
                this.combinePhases(items.map(o => o.phases)), 
                items.length
            ));
        }

        return result;
    }

    static getUserPointsByInterval(points: TaskMetricPoint[], interval: string): Map<string, TaskMetricPoint[]> {
        let groups = _.groupBy(points, interval);
        let userIds = _.uniq(points.map(o => o.userId));

        let result: Map<string, TaskMetricPoint[]> = new Map();

        userIds.forEach(o => result.set(o, []));

        for (let key in groups) {
            let items = <TaskMetricPoint[]>groups[key];
            let userGroup = _.groupBy(items, 'userId');

            result.forEach((value, userId) => {
                let item = userGroup[userId];
                if (item) {
                    value.push(new TaskMetricPoint(item.map(o => o.id).join(','), userId,
                        key,
                        item.map(o => o.value).reduce((prev, current) => prev + current),
                        item.map(o => o.duration).reduce((prev, current) => prev + current),
                        null, null, null, null,
                        this.combinePhases(item.map(o => o.phases)), 
                        item.length
                    ));
                }
                else {
                    value.push(new TaskMetricPoint(null, userId,
                        key,
                        0,
                        0,
                        null, null, null, null, null, 
                        0));
                }
            });
        }

        return result;
    }

    //组合phases
    private static combinePhases(data: any[]): any {
        return data.reduce((prev, current) => this.mergePhases(prev, current));
    }

    private static mergePhases(m1: any, m2: any): any {
        let result: any = Object.assign({}, m1);
        Object.keys(m2).forEach(k => result[k] = m1[k] ? m1[k] + m2[k] : m2[k]);
        return result;
    }

    private static getDuration(point: TaskMetricPoint, phasePairs: Pair<string, boolean>[]): number {
        if (!point.phases) {
            return 0;
        }

        let result: number = 0;
        phasePairs.forEach(o => {
            if (o.value && point.phases && point.phases[o.key]) {
                result += point.phases[o.key];
            }
        });

        return Math.round(result / 60);
    }
}