import { Pair } from './pair';

export class TaskMetricPoint {
    // private phasePairs: Pair<string, number>[];

    constructor(
        public id: string,
        public userId: string,
        public dateTime: string,
        //价值
        public value: number,
        //持续时间，以分钟为单位
        public duration: number,
        public day: string,
        public week: string,
        public month: string,
        public year: string,
        public phases: any,
        public size: number
    ) {

    }

    // getPhasePairs(): Pair<string, number>[] {
    //     if (!this.phasePairs) {

    //         this.phasePairs = [];
    //         Object.keys(this.phases).forEach(k => 
    //             this.phasePairs.push({
    //                 key: k,
    //                 value: this.phases[k]
    //             })
    //         );
    //     }

    //     return this.phasePairs;
    // }

    // private parseDate(dateTime: string): void {
    //     this.date = new Date(dateTime);
    //     this.day = this.date.getFullYear + "." + (this.date.getMonth() + 1) + "." + this.date.getDate();
    //     this.week = this.date.getFullYear + "." + this.getWeek();
    //     this.month = this.date.getFullYear + "." + (this.date.getMonth() + 1);
    //     this.year = this.date.getFullYear.toString();
    // }

    // private getWeek(): number {
    //     let firstDate = new Date(this.date.getFullYear(), 0, 1);
    //     let lastDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

    //     let days = (lastDate.getTime() - firstDate.getTime()) / 86400000;

    //     //第一个星期的天数，以星期天为开始
    //     let firstWeekDays = 7 - firstDate.getDay();

    //     if (days <= firstWeekDays) {
    //         return 1;
    //     }

    //     let weeks = (days - firstWeekDays) / 7;

    //     return (days - firstWeekDays) % 7 === 0 ? weeks : weeks + 1;
    // }
}