import { Bar } from './../../entity/echarts/bar';
import { Pie } from "../../entity/echarts/pie";
import { Line } from "../../entity/echarts/line";

export abstract class EChartsUtil {
    static buildLine(line: Line) {
        let option = {
            title: {
                left: 'center',
                text: line.title
            },
            legend: {
                data: []
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: line.x
            },
            yAxis: {
                type: 'value'
            },
            series: []
        };

        line.y.forEach((value, key) => {
            option.series.push({
                name: key,
                data: value,
                type: 'line',
                smooth: true
            });
        });

        return option;
    }

    static buildBar(bar: Bar) {
        let option = {
            title: {
                left: 'center',
                text: bar.title
            },
            legend: {
                data: []
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: bar.x
            },
            yAxis: {
                type: 'value'
            },
            series: []
        };

        bar.y.forEach((value, key) => {
            option.series.push({
                name: key,
                data: value,
                type: 'bar'
            });
        });

        return option;
    }

    static buildBarWithLine(bar: Bar) {
        let option = this.buildBar(bar);

        if (option.series.length === 0) {
            return option;
        }

        let item: Array<number[]> = option.series.map(o => o.data);

        let data = [];

        item[0].forEach(o => data.push(0));

        item.forEach(o => o.forEach((p, i) => data[i] += p));

        for (let i = 0; i < data.length; i++) {
            data[i] = Math.round(data[i] / item.length);
        }

        option.series.push({
            name: 'Average',
            data: data,
            type: 'line',
            smooth: true
        });

        return option;
    }

    static buildPie(pie: Pie): any {
        let option = {
            title: {
                text: pie.title,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                x: 'right',
                data: pie.points.map(o => o.name)
            },
            series: [
                {
                    name: pie.name,
                    type: 'pie',
                    label: {
                        normal: {
                            formatter: '{b}: {c} ({d}%)'
                        }
                    },
                    radius: ['50%', '70%'],
                    data: pie.points
                }
            ]
        };

        return option;
    }
}