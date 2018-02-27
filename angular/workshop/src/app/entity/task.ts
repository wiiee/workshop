import { Entity } from './entity';

export class Task implements Entity {
    constructor(
        public id: string = null,
        public title: string = null,
        public description: string = null,
        public reporterId: string = null,
        public assigneeId: string = null,
        public value: number = null,
        public teamId: string = null,
        public isReviewed: boolean = null
    ) { }
}