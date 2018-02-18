import { Entity } from './entity';

export class Team implements Entity {
    constructor(public id: string, public name: string, public ownerIds: string[], public userIds: string[]){}
}