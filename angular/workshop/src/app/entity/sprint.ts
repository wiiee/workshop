import { Entity } from './entity';
import { Task } from './task';

export class Sprint implements Entity {
    constructor(
        public id: string = null,
        public name: string = null,
        public tasks: Task[] = null
    ) { }
}