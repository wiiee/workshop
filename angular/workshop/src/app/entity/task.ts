import { Entity } from './entity';
import { Phase } from './phase';
import { PhaseItem } from './phase-item';

export class Task implements Entity {
    constructor(
        public id: string = null,
        public title: string = null,
        public description: string = null,
        public reporterId: string = null,
        public assigneeId: string = null,
        public value: number = null,
        public teamId: string = null,
        public phaseItems: PhaseItem[] = null,
        public isReviewed: boolean = null
    ) { }

    getPhase(): Phase {
        return this.phaseItems ? this.phaseItems[this.phaseItems.length - 1].phase : null;
    }
}