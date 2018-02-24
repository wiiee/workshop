import { Entity } from './entity';

export class Team implements Entity {
    constructor(public id: string = null, public name: string = null, 
        public ownerIds: string[] = null, public userIds: string[] = null){}
}