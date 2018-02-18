import { Entity } from './entity';

export class EntityWrapper<T1 extends Entity, T2> {
    entity: T1;
    tag: T2;
}