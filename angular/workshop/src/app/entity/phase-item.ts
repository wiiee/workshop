import { Phase } from "./phase";

export class PhaseItem {
    constructor(
        public phase: Phase = null,
        public userId: String = null,
        public dateTime: Date = null
    ) {

    }
}