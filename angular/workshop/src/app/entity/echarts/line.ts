export class Line {
    constructor(
        public title: string,
        //x坐标
        public x: string[],
        //y坐标
        public y: Map<string, number[]>
    ){}
}