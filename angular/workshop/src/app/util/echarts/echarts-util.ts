import { Pie } from "../../entity/echarts/pie";
import { Line } from "../../entity/echarts/line";

export abstract class EChartsUtil {
    static buildLine(line: Line) {
        let option = {
            title: {
                left: 'center',
                text: line.title
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: line.points.map(o => o.x)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: line.points.map(o => o.y),
                type: 'line',
                smooth: true
            }]
        };

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