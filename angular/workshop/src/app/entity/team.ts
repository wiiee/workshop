import { Entity } from './entity';
import { TeamSetting } from './team-setting';

export class Team implements Entity {
    constructor(
        public id: string = null,
        public name: string = null,
        public ownerIds: string[] = null,
        public userIds: string[] = null,
        public teamSetting: TeamSetting = null) {
    }
}