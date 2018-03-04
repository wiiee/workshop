import { Entity } from './entity';

export class Sprint implements Entity {
    constructor(
        public id: string = null,
        public name: string = null,
        public taskIds: string[] = null
    ) { }
}