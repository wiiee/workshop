import { Entity } from './entity';

export class Task implements Entity {
    constructor(public id: string, public name: string){}
}
  